const app = angular.module("app", ["ngRoute"]);

app.controller("MainCtrl", function ($scope, $http, $element, cartService) {
    $scope.data = [];
    $scope.cartData = cartService.getAllItem();
    $scope.totalAmount = $scope.cartData.reduce((total, current) => total + current.price, 0);
    $http.get("data/products.json").then((res) => $scope.data = res.data);

    $scope.showDetail = function (product) {
        $scope.productDetail = product;
        $element.children("#modal-show").modal("show");
    };

    $scope.addToCart = function (product) {
        cartService.addItem(product);
        $scope.cartData = cartService.getAllItem();
        $scope.totalAmount = $scope.cartData.reduce((total, current) => total + current.price, 0);
    };

    $scope.clearCart = function () {
        cartService.clear();
        $scope.cartData = [];
        $scope.totalAmount = 0;
    };
});

app.service("cartService", function () {
    this.key = "appIdGoesHere-cart-items";
    // easily switch to sessionStorage or whatever that have the same api
    this.storage = localStorage;

    // init data key if is it null
    if (!this.storage.getItem(this.key)) {
        this.storage.setItem(this.key, JSON.stringify([]));
    }

    this.addItem = function (item) {
        const items = this.getAllItem();
        items.push(item);
        this.storage.setItem(this.key, JSON.stringify(items));
    };

    this.getAllItem = function () {
        return JSON.parse(this.storage.getItem(this.key));
    };

    this.clear = function () {
        this.storage.setItem(this.key, JSON.stringify([]));
    };
});

app.config(function ($routeProvider) {
    $routeProvider.when("/home", {
        templateUrl: "page/home.html"
    });
    $routeProvider.when("/cart", {
        templateUrl: "page/cart.html"
    });
    $routeProvider.otherwise({
        redirectTo: "/home",
    });
});
