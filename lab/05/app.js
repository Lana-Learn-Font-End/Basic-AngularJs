const app = angular.module("productApp", ["ngRoute"]);

app.controller("ProductCtrl", function () {
    const ctrl = this;
    ctrl.data = [
        {name: "product1", price: "20000", sale: "10000", saleRate: "50%"},
        {name: "product1", price: "20000", sale: "10000", saleRate: "50%"},
        {name: "product1", price: "20000", sale: "10000", saleRate: "50%"},
        {name: "product1", price: "20000", sale: "10000", saleRate: "50%"},
        {name: "product1", price: "20000", sale: "10000", saleRate: "50%"},
        {name: "product1", price: "20000", sale: "10000", saleRate: "50%"},
        {name: "product1", price: "20000", sale: "10000", saleRate: "50%"},
    ];
    ctrl.cols = Object.keys(ctrl.data[0]);
});

app.directive("listJs", function () {
    return {
        template: "<table class=\"table\">" +
                  "    <thead>" +
                  "    <tr>" +
                  "        <th scope=\"col\" ng-show=\"showIndex\">STT</th>" +
                  "        <th scope=\"col\" ng-repeat=\"col in cols track by $index\">" +
                  "            {{col.charAt(0).toUpperCase() + col.slice(1)}}" +
                  "        </th>" +
                  "    </tr>" +
                  "    </thead>" +
                  "    <tbody>" +
                  "    <tr ng-repeat=\"item in data track by $index\">" +
                  "        <td ng-show=\"showIndex\">{{$index + 1}}</td>" +
                  "        <td ng-repeat=\"col in cols track by $index\">" +
                  "            {{item[col]}}" +
                  "        </td>" +
                  "    </tr>" +
                  "    </tbody>" +
                  "</table>",
        scope: {
            data: "<",
            cols: "<",
            showIndex: "<"
        }
    };
});

app.directive("listHtml", function () {
    return {
        templateUrl: "templates/product.html",
        scope: {
            data: "<",
            cols: "<",
            showIndex: "<?"
        },
        //default showIndex to false
        compile: (element, attrs) => {
            if (!attrs.showIndex) showIndex = false;
        }
    };
});
