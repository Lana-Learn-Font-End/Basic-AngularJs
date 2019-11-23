const app = angular.module("productApp", ['ngRoute']);
app.controller("ProductCtrl", function ProductCtrl($http) {
    const vm = this;
    vm.data = [];
    $http
        .get("product.json")
        .then(products => vm.data = products.data)
        .catch(err => console.log(err))
});

app.component("appTable", {
    templateUrl: "templates/table.html",
    bindings: {data: "="}
});

app.component("appCardList", {
    templateUrl: "templates/card-list.html",
    bindings: {data: "="}
});

app.component("appNav", {
    templateUrl: "templates/nav.html",
    controller: function NavBarCtrl($location) {
        const vm = this;
        vm.loc = $location;
    }
});

app.config(function ($routeProvider) {
    $routeProvider
        .when("/table", {template: "<app-table data='ctrl.data'></app-table>"})
        .when("/card", {template: "<app-card-list data='ctrl.data'></app-card-list>"})
        .otherwise({redirectTo: "/table"})
});
