const app = angular.module("app", ["ngRoute"]);

app.controller("MainCtrl", function ($scope, $http, $element) {
    $scope.data = [];
    $scope.loggedInUser = undefined;
    $scope.loginFailed = false;
    $scope.loginForm = {};

    $scope.login = function () {
        $scope.loggedInUser = $scope.data.find(
            (item) => (
                item.username === $scope.loginForm.username &&
                item.password === $scope.loginForm.password
            )
        );
        if (!$scope.loggedInUser) $scope.loginFailed = true;
    };

    $scope.showDetail = function (student) {
        $scope.studentDetail = student;
        $element.children("#modal-show").modal("show");
    };

    $scope.logout = function () {
        $scope.loggedInUser = undefined;
        $scope.reset();
    };

    $scope.reset = function () {
        angular.copy({}, $scope.loginForm);
        $scope.loginFailed = false;
    };

    $http
        .get("data/students.json")
        .then((res) => $scope.data = res.data);
});

app.component("appNav", {
    templateUrl: "page/nav.html",
    bindings: {
        email: "@"
    }
});

app.filter("studentFilter", function () {
    return function (students, keyword) {
        return students.filter(
            (student) => {
                if (keyword !== "" && keyword != undefined) {
                    return student.name.includes(keyword) ||
                           student.id.toString().includes(keyword) ||
                           student.email.includes(keyword);
                }
                return true;
            }
        )
    }
});

app.config(function ($routeProvider) {
    $routeProvider.when("/home", {
        templateUrl: "page/home.html"
    });

    $routeProvider.otherwise({
        redirectTo: "/home",
    });
});
