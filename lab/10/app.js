const app = angular.module("cart", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider.when("/products", {
        template: "<app-product-list></app-product-list>"
    });
    $routeProvider.when("/cart", {
        template: "<app-cart></app-cart>"
    });
    $routeProvider.otherwise({redirectTo: "/products"});
});
