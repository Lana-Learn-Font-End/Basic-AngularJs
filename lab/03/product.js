const app = angular.module("product", []);

app.controller("productCtrl", function ($filter) {
    const ctrl = this;
    ctrl.products = getProducts(8);
    ctrl.productDetail = ctrl.products[0];
    ctrl.type = "fuzzy";
    ctrl.search = "";
    ctrl.filtered = ctrl.products;

    ctrl.doSearch = () => {
        ctrl.filtered = $filter("filter")(ctrl.products, (() => {
            if (ctrl.type === "fuzzy")
                return ctrl.search;
            else
                return {[ctrl.type]: (ctrl.search)};
        })());
    };

    ctrl.showDetail = (index) => {
        $("#prodDetail").modal("show");
        ctrl.productDetail = ctrl.products[index];
    };

    ctrl.closeDetail = () => {
        $("#prodDetail").modal("hide");
    };
});

function getProducts(number) {
    return [...Array(number)]
        .map(() => {
            return {
                name: `Product Num ${random(10, 200)}`,
                price: random(100, 30000),
                image: "https://websanova.com/img/posts/jquery-plugin-development-boilerplate.png",
                date: `${random(1, 30)}/${random(1, 12)}/2020`
            };
        });
}

function random(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}
