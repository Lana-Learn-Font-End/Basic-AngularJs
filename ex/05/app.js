const app = angular.module("app", ["ngRoute"]);

app.controller("MainCtrl", function ($scope, $http, favorService) {
    $scope.data = [];
    $scope.favData = favorService.getAllItem();
    $http.get("data/movies.json").then((res) => $scope.data = res.data);

    $scope.addToFav = function (item) {
        favorService.addItem(item);
        $scope.favData = favorService.getAllItem();
    };
    $scope.isAlreadyFav = function (item) {
        // The !! parse object into boolean value.
        // This prevent 'Error: [$rootScope:infdig]' when return an array or object value.
        // Note: If you remove that, its still work, but the error log is really annoying.
        return !!favorService.getAllItem().find((favItem) => favItem.id === item.id);
    };
    $scope.deleteAllFav = function () {
        favorService.clear();
        $scope.favData = [];
    };
});

app.service("favorService", function () {
    this.key = "appIdGoesHere-fav-items";
    // easily switch to sessionStorage or whatever that have the same api.
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
    $routeProvider.when("/favorite", {
        templateUrl: "page/favorite.html"
    });
    $routeProvider.otherwise({
        redirectTo: "/home",
    });
});
