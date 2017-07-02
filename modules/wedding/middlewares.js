function isValidToken(req, res, next) {
    const db = req.app.get('app');
    db.ref(`/invitations/${req.params.token}`).once('value').then(function (snapshot) {
        req._invitation = snapshot.val();
        next();
    });
}

module.exports = {
    isValidToken
};
