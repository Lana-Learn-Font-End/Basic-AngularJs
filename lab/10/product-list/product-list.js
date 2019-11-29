function ProductListCtrl($http, cartService) {
    const ctrl = this;
    ctrl.data = [];
    ctrl.itemDetail = undefined;
    ctrl.addedItem = undefined;
    ctrl.itemCount = 1;

    $http
        .get("../product.json")
        .then((products) => ctrl.data = products.data)
        .catch((err) => console.error(err));

    ctrl.showItem = (index) => ctrl.itemDetail = ctrl.data[index];
    ctrl.addItem = (index) => {
        cartService.addItem(ctrl.data[index]);
        if (ctrl.addedItem === ctrl.data[index]) {
            ctrl.itemCount++;
        } else {
            ctrl.itemCount = 1;
            ctrl.addedItem = ctrl.data[index];
        }
    };
}

app.component("appProductList", {
    templateUrl: "product-list/product-list.html",
    controller: ProductListCtrl
});
