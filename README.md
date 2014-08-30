Experimental Javascript Framework ;)
====================================


dependency inject:
```javascript
funhouse.module('app')
	.factory('Restangular', function(){

	})
	.factory('PersonService', function(ApiProvider){
		return { getAll: function() { ApiProvider.get('pessoas'); } }
	})
	.controller('PersonCtrl', function(PersonService){
		console.log(PersonService.getAll());
	})
```