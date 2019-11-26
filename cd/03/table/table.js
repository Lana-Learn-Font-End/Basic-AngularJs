function TableCtrl($routeParams, $route) {
    const ctrl = this;
    ctrl.$onInit = () => {
        ctrl.page = Number($routeParams.page) - 1;
        ctrl.pageSize = 10;
        ctrl.lastPage = Math.ceil(ctrl.data.length / ctrl.pageSize);
        ctrl.itemDetail = undefined;
    };

    ctrl.delete = (pageIndex) => {
        const index = ctrl.page * ctrl.pageSize + pageIndex;
        ctrl.data = ctrl.data.filter((_, i) => i !== index);
    };

    ctrl.show = (pageIndex) => {
        const index = ctrl.page * ctrl.pageSize + pageIndex;
        ctrl.itemDetail = ctrl.data[index]
    };

    ctrl.getDataPage = () => {
        const pageStart = ctrl.page * ctrl.pageSize;
        return ctrl.data.slice(pageStart, pageStart + ctrl.pageSize);
    };

    ctrl.nav = {
        next: () => $route.updateParams({page: Number($routeParams.page) + 1}),
        prev: () => $route.updateParams({page: Number($routeParams.page) - 1}),
        isFirst: () => ctrl.page === 0,
        isLast: () => ctrl.page >= ctrl.lastPage - 1
    };
}

app.component("appTable", {
    templateUrl: "table/table.html",
    controller: TableCtrl,
    bindings: {
        cols: "=",
        data: "="
    }
});

