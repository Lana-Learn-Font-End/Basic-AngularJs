const app = angular.module("app", ["ngRoute"]);

app.controller("AppCtrl", function () {
    const ctrl = this;
    ctrl.data = [
        {name: "Product1", price: 2000, date: "10/10/1000", description: "This is good"},
        {name: "Product3", price: 2000, date: "10/10/1000", description: "This is good"},
        {name: "Product2", price: 2000, date: "10/10/1000", description: "This is good"},
        {name: "Product4", price: 2000, date: "10/10/1000", description: "This is good"},
        {name: "Product5", price: 2000, date: "10/10/1000", description: "This is good"},
        {name: "Product6", price: 2000, date: "10/10/1000", description: "This is good"},
        {name: "Product7", price: 2000, date: "10/10/1000", description: "This is good"},
        {name: "Product8", price: 2000, date: "10/10/1000", description: "This is good"},
        {name: "Product9", price: 2000, date: "10/10/1000", description: "This is good"},
        {name: "Product10", price: 2000, date: "10/10/1000", description: "This is good"},
        {name: "Product11", price: 2000, date: "10/10/1000", description: "This is good"},
    ];
    ctrl.fields = Object.keys(ctrl.data[0]);
});

app.config(function ($routeProvider) {
    $routeProvider.when("/products/:page", {
        template: "<app-table data='ctrl.data' cols='ctrl.fields'></app-table>"
    });
    $routeProvider.otherwise({redirectTo: "/home"})
});
