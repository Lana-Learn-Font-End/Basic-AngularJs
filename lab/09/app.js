const app = angular.module("loginProduct", ["ngRoute"]);

app.controller("AppCtrl", function ($http) {
    const ctrl = this;
    ctrl.data = [];
    $http
        .get("../product.json")
        .then(res => ctrl.data = res.data.filter(item => item != undefined));

    ctrl.delete = index => ctrl.data = ctrl.data.filter((_, i) => i !== index);
});

app.config(function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "table.html",
        controller: "AppCtrl",
        controllerAs: "$ctrl"
    });
    $routeProvider.when("/login", {
        template: "<app-login></app-login>"
    })
});
