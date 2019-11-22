function random(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function getProducts(number) {
    return [...Array(number)]
        .map(() => {
            return {
                name: `Product Num ${random(10, 200)}`,
                price: random(100, 30000),
                image: "https://websanova.com/img/posts/jquery-plugin-development-boilerplate.png",
                date: `${random(1, 30)}/${random(1, 12)}/2020`
            }
        })
}

angular.module("product", [])

    .controller("productCtrl", ($scope) => {
        $scope.originProducts = getProducts(8);
        $scope.products = $scope.originProducts;
        $scope.productDetail = $scope.products[0];
        $scope.type = "fuzzy";
        $scope.search = "";
        $scope.furrySearch = () => {
            if ($scope.search) {
                if ($scope.type === "fuzzy") {
                    $scope.products =
                        $scope.originProducts
                            .filter(product =>
                                Object.keys($scope.originProducts[0])
                                    .map(type => $scope.fuzzySearchByKey(type, $scope.search))
                                    .filter(result => result.length > 0)
                                    .length > 0
                            );
                } else {
                    $scope.products = $scope.fuzzySearchByKey($scope.type, $scope.search);
                }
            } else {
                $scope.products = $scope.originProducts;
            }
        };

        $scope.showDetail = (index) => {
            $("#prodDetail").modal("show");
            $scope.productDetail = $scope.products[index]
        };
        $scope.closeDetail = () => {
            $("#prodDetail").modal("hide");
        };
        $scope.fuzzySearchByKey = (key, value) => {
            return $scope.originProducts.filter(item => item[key].toString().includes(value))
        }
    });

