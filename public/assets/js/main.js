var app = angular.module('ToDoList', []);

app.controller('todoCtrl', function todoctrl($scope) {
	var todo = this;

	console.log('test');
});

app.directive('todos', function(){
	return {
		scope: {},
		template: '<div>test</div>'
	};
});