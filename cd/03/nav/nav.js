function NavCtrl($location) {
    const ctrl = this;
    ctrl.loc = $location;
}

app.component("appNav", {
    templateUrl: "nav/nav.html",
    controller: NavCtrl,
});
