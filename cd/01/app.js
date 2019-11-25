const app = angular.module("studentApp", []);

app.controller("StudentCtrl", function () {
    const ctrl = this;
    ctrl.data = [
        {name: "Some Name", email: "someemail@somehost.somedomain", age: 27, address: "Somewhere in some planet"},
        {name: "Some Name", email: "someemail@somehost.somedomain", age: 27, address: "Somewhere in some planet"},
        {name: "Some Name", email: "someemail@somehost.somedomain", age: 27, address: "Somewhere in some planet"},
        {name: "Some Name", email: "someemail@somehost.somedomain", age: 27, address: "Somewhere in some planet"},
        {name: "Some Name", email: "someemail@somehost.somedomain", age: 27, address: "Somewhere in some planet"},
        {name: "Some Name", email: "someemail@somehost.somedomain", age: 27, address: "Somewhere in some planet"},
        {name: "Some Name", email: "someemail@somehost.somedomain", age: 27, address: "Somewhere in some planet"}
    ];
    ctrl.cols = Object.keys(ctrl.data[0]);
});
