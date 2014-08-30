(function(){
	
	'use strict';

	/**
	 * Dependency Injection Container
	 */
	function container() {
		
		var 
			dependencies = {},
			FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
		    FN_ARG_SPLIT = /,/,
		    FN_ARG = /^\s*(_?)(\S+?)\1\s*$/,
		    STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

		var getDependencies = function(arr) {
			return arr.map(function(value) {
				return dependencies[value];
			});
		}

		return {
			'register' : function(name, dependency) {
				dependencies[name] = this.resolution(dependency);
			},
			'resolution': function(fn) {
				var txt = fn.toString(),
					args = txt.match(FN_ARGS)[1].split(',').map(function(arg) { return arg.trim(); } );
				return fn.apply(fn, getDependencies(args));
			}
		}

	}


	function Module(name) {

		var thisContainer = container();

		this.factory = function(name, factory) {
			thisContainer.register(name, factory);
			return this;
		}

		this.controller = function(name, controller) {
			thisContainer.resolution(controller);
			return this;
		}
	}


	/**
	 * Funhouse app 
	 */
	function Funhouse() {
		this.module = function(name) { return new Module(name); }
	}

	window.funhouse =  new Funhouse();
})();