const app = angular.module("app", ["ngRoute"]);

app.controller("MainCtrl", function ($scope, $http) {
    $scope.data = [];
    $scope.loggedInUser = undefined;
    $scope.loginFailed = false;
    $scope.loginForm = {};

    $scope.login = function () {
        $scope.loggedInUser = $scope.data.find((item) =>
            item.username === $scope.loginForm.username
            && item.password === $scope.loginForm.password
        );
        if (!$scope.loggedInUser) $scope.loginFailed = true;
    };

    $scope.logout = function () {
        $scope.loggedInUser = undefined;
        $scope.reset();
    };

    $scope.reset = function () {
        angular.copy({}, $scope.loginForm);
        $scope.loginFailed = false;
    };

    $http
        .get("data/students.json")
        .then((res) => $scope.data = res.data)
});

app.component("appHome", {
    templateUrl: "page/home.html",
    controller: function HomeCtrl() {
        // ControllerAs over $scope
        const ctrl = this;
        ctrl.data = [];

        ctrl.$onChanges = function () {
            /*
             Remove password field from the student data.
             This prevent the miss behaviour of filter when do fuzzy search which make the
             result contains student that have password contains the search key.
             For example, delete this $onChanges and try to search 1 to see the weird results
             (results is all student, because their password contains 1).

             Alternatively, if you want that behaviour, you can just delete this ctrl.$onChanges function
             and everything is going to work as it is before, and the password gonna display in the modal

             Note that this only affect the data in this controller, as i used one-way binding on the
             data array.
            */
            ctrl.data = ctrl.data.map(item => {
                // shallow copy is enough as all the field is string
                const newItem = {...item};
                delete newItem.password;
                return newItem;
            })
        };

        ctrl.show = function (index) {
            ctrl.studentDetail = ctrl.data[index];
        };

        ctrl.close = function () {
            ctrl.studentDetail = undefined;
        }
    },
    bindings: {
        data: "<"
    }
});

app.component("appModal", {
    templateUrl: "page/modal.html",
    controller: function ModalController($element) {
        const ctrl = this;
        ctrl.$onChanges = function () {
            ctrl.show ?
                $element.children(".modal").modal("show") :
                $element.children(".modal").modal("hide")
        }
    },
    transclude: true,
    bindings: {
        show: "<",
    }
});

app.component("appNav", {
    templateUrl: "page/nav.html",
    bindings: {
        email: "@"
    }
});

app.config(function ($routeProvider) {
    $routeProvider.when("/home", {
        template: "<app-home data='data'></app-home>"
    });

    $routeProvider.otherwise({
        redirectTo: "/home",
    })
});
