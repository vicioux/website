const router = require('express').Router();
const middlewares = require('./middlewares');
const bodyParser = require('body-parser')

const INVITATION_STATUS = {
    ACCEPTED: 'accepted',
    WAITING: 'waiting',
    CANCELED: 'rejected'
}

function jsonResponse(res, data) {
    res.setHeader('Content-Type', 'application/json');
    return res.send(JSON.stringify(data, null, 3));
}

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/**
 * Logo page
 */
router.get('/', function(request, response) {
    response.render('pages/wedding');
});

/**
 * Admin routes
 */
router.get('/invitations', middlewares.basicAuth, function(request, response) {
    const db = request.app.get('db');
    db.ref('/invitations').once('value', function (snapshot) {
        const invitations = snapshot.val();
        response.render('pages/wedding-invitations', { invitations });
    });
});

router.post('/invitations', middlewares.basicAuth, function(request, response) {
    const invitation = {
        name: request.body.name,
        email: request.body.email,
        people: request.body.people,
        status: INVITATION_STATUS.WAITING
    }

    const db = request.app.get('db');
    db.ref('/invitations').push(invitation, function () {
        response.redirect('/wedding/invitations');
    });
});

/**
 * Invitation routes
 */
router.get('/:token', middlewares.isValidToken, function(request, response) {
    const invitation = request._invitation;
    const token = request.params.token;
    response.render('pages/wedding-invitation', { invitation, token: token });
});

router.post('/:token/accept', (request, response) => {
    const db = request.app.get('db');
    db.ref('/invitations/'+ request.params.token).update({
        status: INVITATION_STATUS.ACCEPTED
    }, function (error) {
        if (error) {
            jsonResponse(response, {error: error});
        } else {
            jsonResponse(response, {success: true});
        }
    });
});

module.exports = router;
