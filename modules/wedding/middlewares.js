var auth = require('basic-auth')

function isValidToken(req, res, next) {
    const db = req.app.get('db');
    const ref = db.ref(`/invitations/${req.params.token}`);

    ref.once('value').then(function (snapshot) {
        const invitation = snapshot.val();
        req._invitation = invitation;
        
        if (!invitation) {
            res.render('error');
        } else {
            next();
        }
    });
}

function basicAuth(req, res, next) {
    var credentials = auth(req)

    if (!credentials || credentials.name !== process.env.BASIC_USERNAME || credentials.pass !== process.env.BASIC_PASSWORD) {
        res.statusCode = 401
        res.setHeader('WWW-Authenticate', 'Basic realm="example"')
        res.end('Access denied')
    } else {
        next();
    }
}

module.exports = {
    isValidToken,
    basicAuth
};
