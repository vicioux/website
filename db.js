var firebase = require("firebase");

function createDbConnection () {
    // Initialize the app with a service account, granting admin privileges
    firebase.initializeApp({
    databaseURL: "https://wedding-16f39.firebaseio.com",
    serviceAccount: "credentials/wedding-1ff0327b70c3.json"
    });

    var db = firebase.database();
}

module.exports = {
    createDbConnection
}
