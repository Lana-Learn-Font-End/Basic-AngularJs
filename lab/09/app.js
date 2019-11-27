const app = angular.module("productApp", ["ngRoute"]);
app.controller("ProductCtrl", function ProductCtrl($http, $filter) {
    const ctrl = this;
    ctrl.$onInit = () => {
        $http
            .get("product.json")
            .then(products => {
                ctrl.data = products.data;
                ctrl.originData = products.data;
            })
            .catch(err => console.log(err))
    };
    ctrl.originData = [];
    ctrl.data = [];
    ctrl.searchByName = (value, by) => {
        ctrl.data = {
            name: $filter("filter")(ctrl.originData, {name: value}),
            fuzzy: $filter("filter")(ctrl.originData, value),
            sale: $filter("filter")(ctrl.originData, {name: value}).filter(item => item.salePrice > 0),
            price: ctrl.originData.filter(item =>
                item.price.toString().includes(value) ||
                item.salePrice.toString().includes(value))
        }[by];
    };
    // pass undefined so modal won't show
    ctrl.itemDetail = undefined;
    ctrl.showModal = index => ctrl.itemDetail = ctrl.data[index];
    ctrl.closeModal = () => ctrl.itemDetail = undefined;
});

app.component("appTable", {
    templateUrl: "templates/table.html",
    bindings: {
        data: "<",
        onShowDetail: "&"
    }
});

app.component("appCardList", {
    templateUrl: "templates/card-list.html",
    bindings: {
        data: "<",
        onShowDetail: "&"
    }
});

app.component("appNav", {
    templateUrl: "templates/nav.html",
    controller: function NavBarCtrl($scope, $location) {
        $scope.$location = $location;
        $scope.by = "name";
        $scope.search = "";
    },
    bindings: {
        onSearch: "&"
    }
});

app.component("appDetail", {
    templateUrl: "templates/detail.html",
    controller: function DetailCtrl() {
        const ctrl = this;
        ctrl.$onChanges = () => {
            if (ctrl.item)
                $("#itemDetail").modal("show");
        };
    },
    bindings: {
        item: "<",
        onClose: "&",
    }
});

app.config(function ($routeProvider) {
    $routeProvider
        .when("/table", {template: "<app-table data='ctrl.data' on-show-detail='ctrl.showModal(index)'></app-table>"})
        .when("/card", {template: "<app-card-list data='ctrl.data' on-show-detail='ctrl.showModal(index)'></app-card-list>"})
        .otherwise({redirectTo: "/table"})
});
