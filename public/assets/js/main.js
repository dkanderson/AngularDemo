var model = {
	user: 'John'
};

var app = angular.module('todoApp', ['ui.router']);

app.constant('taskList', 'http://localhost:9000/tasks');

// app.config(function($stateProvider){
// 	$stateProvider.state('todo', {
// 		url: '/',
// 		templateUrl: 'assets/js/templates/tasks.html',
// 		controller: 'todoCtrl'
// 	});
// });

app.controller('todoCtrl', function todoctrl($scope, $http, taskList) {
	$scope.todo = model;
	$scope.tasks = {};

	$http.get(taskList).
		success(function(data){
			$scope.tasks.items = data;
		}).
		error(function(error) {
			$scope.tasks.error = error;
		});

	$scope.incompleteCount = function incompleteCount(){
		var count = 0;

		angular.forEach($scope.tasks.items, function(item){
			if(!item.status){ count += 1; }
		});

		return count;
	};

	$scope.addNew = function addNew(new_task){
		var data = {description:new_task, status:false};
		$scope.tasks.items.push(data);
		$http.post(taskList, data).
			then(function(data){
				alert('db updated');
			},
			function(error){
				alert('epic Fail');
			});
	};
});

app.filter('checkedItems', function() {
	return function(items, showCompleted){
		var resultsArr = [];
		angular.forEach(items, function(item){
			if(item.status === false || showCompleted === true){
				resultsArr.push(item);
			}
		});
		return resultsArr;
	};
});



app.directive('addnew', function(){
	return {
		restrict: 'E',
		scope: {},

	};
});