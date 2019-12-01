const app = angular.module("app", ["ngRoute"]);

app.controller("MainCtrl", function ($scope, $http, $element) {
    $scope.data = [];
    $scope.cartData = [];
    $http.get("data/products.json").then((res) => $scope.data = res.data);

    $scope.getTotal = function () {
        return $scope.cartData.reduce((total, current) => total + current.price, 0);
    };

    $scope.addToCart = function (item) {
        $scope.cartData.push(item);
    };

    $scope.showDetail = function (item) {
        $scope.productDetail = item;
        $element.children("#modal-show").modal("show");
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
