const app = angular.module("loginProduct", ["ngRoute"]);

app.controller("AppCtrl", function ($route, $location, $rootScope, accountService) {
    const ctrl = this;
    ctrl.loginModalShow = false;

    ctrl.$onInit = () => {
        if (!accountService.isLoggedIn()) {
            $location.path("/account");
        }
    };

    $rootScope.$on("$routeChangeStart", () => {
        if (!accountService.isLoggedIn()) {
            if ($location.path().indexOf("/account") !== 0)
                ctrl.loginModalShow = true;
            $location.path("/account");
        }
    });
});

app.config(function ($routeProvider) {
    $routeProvider.when("/", {
        template: "<app-table></app-table>"
    });
    $routeProvider.when("/account", {
        template: "<app-login></app-login>"
    });
});
