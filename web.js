var express = require('express');
var app = express();
var path = require('path');
var wedding = require('./modules/wedding');
var { createDbConnection }  = require('./db');

app.set('db', createDbConnection())
app.set('port', (process.env.PORT || 5000));
app.use('/public', express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('pages/index');
});

app.use('/wedding', wedding);

app.listen(app.get('port'), function() {
    console.log('Website is running on port', app.get('port'));
});
