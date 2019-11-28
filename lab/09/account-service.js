app.service("accountService", function ($http) {
    this.appId = "appIdGoesHere";

    this.isLoggedIn = () => !!sessionStorage.getItem(`${this.appId}-isLoggedIn`);

    this.getAccountInfo = () => sessionStorage.getItem(`${this.appId}-accountInfo`);

    this.login = (username, password) => {
        return new Promise((resolve, reject) => {
            if (username === "toandz" && password === "123456") {
                sessionStorage.setItem(`${this.appId}-isLoggedIn`, "logged");
                // visualization fetching data from server
                $http
                    .get("userinfo.json")
                    .then(data => {
                        sessionStorage.setItem(`${this.appId}-accountInfo`, JSON.stringify(data));
                        resolve(data)
                    })
                    .catch(err => reject(err));
            } else {
                resolve();
            }
        })
    };

    this.logout = () => {
        if (this.isLoggedIn) {
            sessionStorage.removeItem(`${this.appId}-accountInfo`);
            sessionStorage.removeItem(`${this.appId}-isLoggedIn`)
        }
    }
});
