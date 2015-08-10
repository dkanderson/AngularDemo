var model = {
	user: 'John',
	items: [{"_id":"53b06b13d468f12502000002","title":"Dinner","description":"Cook curry chicken","date":"06/29/2014","time":"02:30 PM","location":"kitchen","assignees":["Jane Doe"],"done":"true","status":false},{"_id":"53e3fb18ea77d2621f000001","title":"Fix todo bugs","description":"Complete application","date":"08/07/2014","time":"06:15 PM","location":"Home","assignees":["Jane Doe"],"done":"true","status":false},{"_id":"540e951f051892a315000001","title":"Just a test","description":"Lets see what happens","date":"09/10/2014","time":"03:50 AM","location":"Somewhere out there","assignees":["Jane Doe"],"done":"true","status":false},{"_id":"546a6df21c1bc1ec01000001","title":"Test","description":"something","date":"11/20/2014","time":"05:00 AM","location":"somewhere","assignees":null,"done":"true","status":false}]
};

var app = angular.module('todoApp', ['ui.router']);

// app.config(function($stateProvider){
// 	$stateProvider.state('todo', {
// 		url: '/',
// 		templateUrl: 'assets/js/templates/tasks.html',
// 		controller: 'todoCtrl'
// 	});
// });

app.controller('todoCtrl', function todoctrl($scope) {
	$scope.todo = model;

	$scope.incompleteCount = function incompleteCount(){
		var count = 0;

		angular.forEach($scope.todo.items, function(item){
			if(!item.status){ count += 1; }
		});

		return count;
	};

	$scope.addNew = function addNew(){

	};
});

app.directive('addnew', function(){
	return {
		restrict: 'E',
		scope: {},
		
	};
});