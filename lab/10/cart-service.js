app.service("cartService", function () {
    this.key = "appIdGoesHere-cart-items";
    this.storage = sessionStorage;

    // init data key if is it null
    if (!this.storage.getItem(this.key)) {
        this.storage.setItem(this.key, JSON.stringify([]));
    }

    this.addItem = (item, quantity = 1) => {
        const items = this.getAllItem();
        const existedItemIndex = items.findIndex(cartItem => cartItem.item.id === item.id);
        if (existedItemIndex >= 0) {
            items[existedItemIndex].quantity += quantity;
        } else {
            items.push({item, quantity});
        }
        this.storage.setItem(this.key, JSON.stringify(items));
    };

    this.removeItem = (item) => {
        const items = this.getAllItem();
        this.storage.setItem(
            this.key,
            JSON.stringify(
                items.filter((cartItem) => cartItem.item.id !== item.id)
            )
        );
    };

    this.getAllItem = () => {
        return JSON.parse(this.storage.getItem(this.key));
    };

    this.clear = () => {
        this.storage.clear();
    };
});
