function DetailModalController($element) {
    const ctrl = this;
    ctrl.show = ctrl.show || false;
    ctrl.modal = $element.children(".modal");
    ctrl.modal.on("shown.bs.modal", () => ctrl.onShown());
    ctrl.modal.on("hidden.bs.modal", () => ctrl.onHidden());
    ctrl.$onChanges = () => {
        if (ctrl.show) {
            ctrl.modal.modal("show");
        } else if (!ctrl.show) {
            ctrl.modal.modal("hide");
        }
    };
}

app.component("appDetailModal", {
    templateUrl: "detail/detail.html",
    controller: DetailModalController,
    transclude: true,
    bindings: {
        show: "<",
        onShown: "&",
        onHidden: "&",
    }
});
