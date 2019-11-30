function AppTableCtrl($http) {
    const ctrl = this;
    ctrl.itemDetail = undefined;
    ctrl.data = [];

    ctrl.delete = (index) => {
        ctrl.data = ctrl.data.filter((_, i) => i !== index);
    };
    ctrl.showDetail = (index) => {
        ctrl.itemDetail = ctrl.data[index];
    };
    ctrl.hideDetail = () => {
        ctrl.itemDetail = undefined;
    };

    $http
        .get("../product.json")
        .then((res) => ctrl.data = res.data.filter((item) => item != undefined));
}

app.component("appTable", {
    templateUrl: "table/table.html",
    controller: AppTableCtrl,
});
