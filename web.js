/**
 * Simple web server
 */
var express = require('express');
var app = express();
var path = require('path');

app.set('port', (process.env.PORT || 5000));
app.use('/public', express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('pages/index');
});

app.get('/wedding', function(request, response) {
    response.render('pages/wedding');
});

app.listen(app.get('port'), function() {
    console.log('Website is running on port', app.get('port'));
});
