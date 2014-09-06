!!! Experimental Javascript Framework ;)
====================================


dependency inject:
```javascript
funhouse.module('app')
	.factory('ApiProvider', function(){
		return { get: function(resource){  do something... }}
	})
	.factory('PersonService', function(ApiProvider){
		return { getAll: function() { ApiProvider.get('pessoas'); } }
	})
	.controller('PersonCtrl', function(PersonService){
		console.log(PersonService.getAll());
	})
```