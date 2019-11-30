const app = angular.module("app", ["ngRoute"]);

app.component("appModal", {
    templateUrl: "page/modal.html",
    controller: function ModalController($element) {
        const ctrl = this;
        ctrl.$onChanges = function () {
            ctrl.show
            ? $element.children(".modal").modal("show")
            : $element.children(".modal").modal("hide");
        };
    },
    transclude: true,
    bindings: {
        show: "<",
    }
});

app.controller("MainCtrl", function ($scope, $http) {
    $scope.data = [];
    $scope.studentDetail = undefined;
    $scope.studentMark = undefined;
    $scope.studentMarkAvg = 0;
    $http
        .get("data/students.json")
        .then((res) => $scope.data = res.data);

    $scope.closeDetail = function () {
        $scope.studentDetail = undefined;
    };

    $scope.showDetail = function (index) {
        $scope.studentDetail = $scope.data[index];
    };

    $scope.checkMark = function (code) {
        $scope.studentMark = $scope.data.find((student) => student.code === code);
        if ($scope.studentMark)
            $scope.studentMarkAvg = ($scope.studentMark.mark_html +
                                     $scope.studentMark.mark_ajs +
                                     $scope.studentMark.mark_dwhcj) / 3;
        else
            alert("Sinh viên không tồn tại!");
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

