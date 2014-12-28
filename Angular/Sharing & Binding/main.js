var myApp = angular.module('myApp', []);
myApp.factory('Data', function(){	//Creating a factory service 
	return {message: "I am data from service"}
});

//Passing that data to both
function FirstCtrl($scope, Data){
	$scope.data = Data;   			//Scope is kind of a watcher, which watches over value changes in that scope of the controller
									//This scope is setting the data to Data
}

function SecondCtrl($scope, Data){
	$scope.data = Data;
}


function ThirdCtrl($scope, Data){
	$scope.data = Data;

	$scope.reversedMessage = function(message) {
		return message.split("").reverse().join("");
	}
}