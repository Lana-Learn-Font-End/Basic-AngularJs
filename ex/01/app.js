const app = angular.module("app", ["ngRoute"]);

app.component("appHome", {
    templateUrl: "page/home.html",
    controller: function HomeCtrl($scope, $http) {
        $scope.data = [];

        $http
            .get("data/students.json")
            .then((res) => $scope.data = res.data);

        $scope.show = function (index) {
            $scope.studentDetail = $scope.data[index];
        };

        $scope.close = function () {
            $scope.studentDetail = undefined;
        }
    }
});

app.component("appModal", {
    templateUrl: "page/modal.html",
    controller: function ModalController($element) {
        const ctrl = this;
        ctrl.$onChanges = function () {
            ctrl.show ?
                $element.children(".modal").modal("show") :
                $element.children(".modal").modal("hide")
        }
    },
    transclude: true,
    bindings: {
        show: "<",
    }
});

app.config(function ($routeProvider) {
    $routeProvider.when("/home", {
        template: "<app-home></app-home>"
    });

    $routeProvider.otherwise({
        redirectTo: "/home",
    })
});
