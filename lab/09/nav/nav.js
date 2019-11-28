function NavCtrl($scope, $location) {
    $scope.isActive = (viewLocation) => $location.path() === viewLocation;
}

app.component("appNav", {
    templateUrl: "nav/nav.html",
    controller: NavCtrl,
});
