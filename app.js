var express = require('express')
var app = express();
var swig = require('swig');

var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');

// mongo database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/klangextase');

// project modules
var index = require('./controllers/index');
var contributors = require('./controllers/contributors');

module.exports = app;


// view engine setup
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/views'));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// make db accessible to routes
app.use(function (req, res, next) {
    req.db = db;
    next();
});

// routes
app
    // homepage
    .get('/',                       index)

    // contributors
    .get('/contributors',           contributors.get)
    .post('/contributors',          contributors.add)
    .put('/contributors/:id',       contributors.update)
    .delete('/contributors/:id',    contributors.remove)

;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
// + disable cache in development mode
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
    swig.setDefaults({ cache: false });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
