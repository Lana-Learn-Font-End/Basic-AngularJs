const app = angular.module("app", ["ngRoute"]);

app.controller("MainCtrl", function ($scope, $http, $element) {
    $scope.data = [];
    $http.get("data/product.json")
         .then((res) => $scope.data = res.data);

    $scope.showProductDetail = function (product) {
        $scope.productDetail = product;
        $element.children("#modal-show").modal("show");
    };
});

app.component("appNav", {
    templateUrl: "page/nav.html",
    controller: function NavCtrl($scope, $location) {
        $scope.startsWith = function (path) {
            return $location.path().startsWith(path);
        };
    }
});

app.config(function ($routeProvider) {
    $routeProvider.when("/home", {
        templateUrl: "page/home.html"
    });
    $routeProvider.when("/about", {
        templateUrl: "page/about.html"
    });
    $routeProvider.when("/product", {
        templateUrl: "page/product.html"
    });
    $routeProvider.otherwise({
        redirectTo: "/home",
    });
});
