const app = angular.module("product", []);

app.controller("productCtrl", function ($scope) {
    $scope.products = getProducts(4);
    $scope.productDetail = $scope.products[0];
    $scope.showDetail = (index) => {
        $("#prodDetail").modal("show");
        $scope.productDetail = $scope.products[index];
    };
    $scope.closeDetail = () => {
        $("#prodDetail").modal("hide");
    };
});


function getProducts(number) {
    return [...Array(number)]
        .map((_, i) => {
            return {
                name: `Product Number ${i}`,
                price: 2000,
                image: "https://websanova.com/img/posts/jquery-plugin-development-boilerplate.png",
            };
        });
}
