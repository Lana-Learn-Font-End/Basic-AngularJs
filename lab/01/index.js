const app = angular.module("demoApp", [])

    .controller("demoController", function ($scope) {
        $scope.myVar = "Fist AngularJS App";
        $scope.name = "My name";
        $scope.email = "myemail@example.com";
        $scope.phone = "091232238";
        $scope.age = "18+";
    });
