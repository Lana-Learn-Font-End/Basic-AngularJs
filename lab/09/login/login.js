function loginCtrl(accountService) {
    const ctrl = this;
    ctrl.loginErrorMessage = "";
    ctrl.account = accountService;
    ctrl.loggedOut = false;

    ctrl.login = (username, password) => {
        ctrl.account
            .login(username, password)
            .then(account => {
                if (!account)
                    ctrl.loginErrorMessage = "Wrong username or password";
            })
            .catch(() => ctrl.loginErrorMessage = "Server error!")
    };
    ctrl.logout = () => {
        accountService.logout();
        ctrl.loggedOut = true;
    }
}

app.component("appLogin", {
    templateUrl: "login/login.html",
    controller: loginCtrl,
});
