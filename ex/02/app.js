const app = angular.module("app", ["ngRoute"]);

app.controller("MainCtrl", function ($scope, $http, $element) {
    $scope.data = [];
    $scope.studentMark = undefined;
    $scope.studentMarkAvg = 0;
    $http
        .get("data/students.json")
        .then((res) => $scope.data = res.data);

    $scope.showDetail = function (student) {
        $scope.studentDetail = student;
        $element.children("#modal-show").modal("show");
    };

    $scope.checkMark = function (code) {
        $scope.studentMark = $scope.data.find((student) => student.code === code);
        if ($scope.studentMark) {
            $scope.studentMarkAvg = ($scope.studentMark.mark_html +
                                     $scope.studentMark.mark_ajs +
                                     $scope.studentMark.mark_dwhcj) / 3;
        } else {
            alert("Sinh viên không tồn tại!");
        }
    };
});

app.config(function ($routeProvider) {
    $routeProvider.when("/home", {
        templateUrl: "page/home.html"
    });

    $routeProvider.otherwise({
        redirectTo: "/home",
    });
});
