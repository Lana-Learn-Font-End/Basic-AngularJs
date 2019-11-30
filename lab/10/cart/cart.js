function AppCartCtrl(cartService) {
    const ctrl = this;
    ctrl.data = cartService.getAllItem();
    ctrl.addItem = (index) => {
        cartService.addItem(ctrl.data[index].item);
        ctrl.data = cartService.getAllItem();
    };
    ctrl.removeItem = (index) => {
        cartService.removeItem(ctrl.data[index].item);
        ctrl.data = cartService.getAllItem();
    };
    ctrl.total = () => (
        ctrl.data.reduce((total, current) => {
            current.item.salePrice > 0 ?
            total += current.item.salePrice * current.quantity :
            total += current.item.price * current.quantity;
            return total;
        }, 0)
    );
}

app.component("appCart", {
    templateUrl: "cart/cart.html",
    controller: AppCartCtrl,
});
