const app = angular.module("loginProduct", ["ngRoute"]);

app.controller("AppCtrl", function ($location, $rootScope, accountService) {
    const ctrl = this;
    ctrl.loginCheckAndRedirect = () => {
        if (!accountService.isLoggedIn()) {
            $location.path("/account");
        }
    };

    ctrl.$onInit = () => {
        ctrl.loginCheckAndRedirect();
    };

    $rootScope.$on("$routeChangeStart", () => {
        ctrl.loginCheckAndRedirect();
    })
});

app.config(function ($routeProvider) {
    $routeProvider.when("/", {
        template: "<app-table></app-table>"
    });
    $routeProvider.when("/login", {
        template: "<app-login></app-login>"
    })
});
