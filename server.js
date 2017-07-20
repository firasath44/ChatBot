/**
 * Created by Firasath on 7/19/2017.
 */

//log uncaughtexception
process.on('uncaughtException', function (err) {
    console.log("Uncaught Exception:", err);
    //exit application
    process.exit(1);
});

var express = require('express');
var bodyParser = require('body-parser');
var serviceConfig = require('./serverConfig');
var queryString = require('query-string');
var path = require('path');




var app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './AppUi'))); 

app.all('/*', function (req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,loginUserId,userType,userCustomerId');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});


app.use(bodyParser.urlencoded({ extended: queryString }));

// SERVE STATIC CONTENT

app.use('/', require('./routes'));

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
    try {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    } catch (ex) {
     //   console.log('exception in app.use ' + ex);
    }
});

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Start the server
//do not change that
app.set('port', process.env.PORT || serviceConfig.hostingApiConfig.port);

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
  
});


module.exports = server;