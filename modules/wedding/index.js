const router = require('express').Router();
const middlewares = require('./middlewares');

function jsonResponse(res, data) {
    res.setHeader('Content-Type', 'application/json');
    return res.send(JSON.stringify(data, null, 3));
}

router.get('/', function(request, response) {
    response.render('pages/wedding');
});

router.get('/:token', middlewares.isValidToken, function(request, response) {
    console.log(request._invitation);
    response.render('pages/wedding-invitation');
});

router.get('/:token/confirmation', middlewares.isValidToken, function(request, response) {
    jsonResponse(response, {invitation: true});
});

module.exports = router;
