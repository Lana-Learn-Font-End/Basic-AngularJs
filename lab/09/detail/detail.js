function DetailModalController($element) {
    const ctrl = this;
    ctrl.modal = $element.children(".modal");
    ctrl.bool = (val) => !!val;
    ctrl.$onChanges = () => (
        ctrl.bool(ctrl.show) ?
            ctrl.modal.modal("show") :
            ctrl.modal.modal("hide")
    );
}

app.component("appDetailModal", {
    templateUrl: "detail/detail.html",
    controller: DetailModalController,
    transclude: true,
    bindings: {
        show: "<",
    }
});
