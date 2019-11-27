const app = angular.module("form", ['ngMessages']);

app.directive("equalTo", function () {
    return {
        restrict: 'A',
        require: "ngModel",
        link: (scope, element, attrs, ctrl) => {
            // observe the equal-to and re-validate on change
            attrs.$observe("equalTo", validate);

            // watch own input value and re-validate on change
            scope.$watch(attrs.ngModel, validate);

            function validate() {
                const inputVal = ctrl.$viewValue;
                const equalTo = attrs["equalTo"];
                console.log(equalTo);
                console.log(inputVal);
                ctrl.$setValidity("equalTo", !inputVal || !equalTo || inputVal === equalTo);
            }
        }
    };
});

app.directive("fuckingStrong", function () {
    return {
        restrict: 'A',
        require: "ngModel",
        link: (scope, element, attrs, ctrl) => {
            scope.$watch(attrs.ngModel, validate);

            function validate() {
                console.log(ctrl.$viewValue);
                if (ctrl.$viewValue) {
                    const containsNumber = ctrl.$viewValue.match(/[0-9]/);
                    const containsAlphabet = ctrl.$viewValue.match(/[a-z]/);
                    const containsUppercase = ctrl.$viewValue.match(/[A-Z]/);
                    // convert to bool
                    ctrl.$setValidity("fuckingStrong", !!(containsAlphabet && containsUppercase && containsNumber));
                } else {
                    ctrl.$setValidity("fuckingStrong", false);
                }
            }
        }
    };
});

app.controller("Ctrl", function ($scope) {
    $scope.log = (val) => console.log(val)
});
