function ModalController($element) {
    const ctrl = this;
    ctrl.modal = $element.children(".modal");
    ctrl.bool = (val) => !!val;
    ctrl.$onChanges = () => (
        ctrl.bool(ctrl.show) ?
            ctrl.modal.modal("show") :
            ctrl.modal.modal("hide")
    );
}

app.component("appModal", {
    templateUrl: "modal/modal.html",
    controller: ModalController,
    transclude: true,
    bindings: {
        show: "<",
    }
});
