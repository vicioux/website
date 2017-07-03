var firebase = require("firebase");

function createDbConnection () {
    const credentials = {
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI,
        token_uri: process.env.FIREBASE_TOKEN_URI,
    };

    const app = firebase.initializeApp({
        databaseURL: "https://wedding-16f39.firebaseio.com",
        serviceAccount: credentials,
        databaseAuthVariableOverride: {
            uid: process.env.FIREBASE_WORKER
        }
    });

    return app.database();
}

module.exports = {
    createDbConnection
}
