function TableCtrl() {
    const ctrl = this;
    ctrl.delete = (index) => {
        ctrl.data = ctrl.data.filter((_, i) => i !== index);
    };
    ctrl.show = (index) => {
        ctrl.itemDetail = ctrl.data[index]
    };
    ctrl.itemDetail = undefined;
}

app.component("appTable", {
    templateUrl: "table/table.html",
    controller: TableCtrl,
    bindings: {
        cols: "=",
        data: "="
    }
});

