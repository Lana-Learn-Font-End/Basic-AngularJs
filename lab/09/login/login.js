function loginCtrl(accountService) {
    const ctrl = this;
    this.account = accountService;
}

app.component("appLogin", {
    templateUrl: "login/login.html",
    controller: loginCtrl,
});
