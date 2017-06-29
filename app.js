var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var uuidv4 = require('uuid/v4');

var server = require('./routes/server');
var index = require('./routes/index');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));

// Session config
// this has to be called before our static setup. 
// This way the req to / will set the cookie and session
// before the static middleware can finish the request.
app.use(session({
    genid: (req) => {
        return uuidv4();
    },
    secret: 'super duper secretive secret...',
    resave: false,
    // saveUninitialized: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    },
    validWebid: false,
    validBiometric: false
}));

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', index);
app.use('/api', server);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('error');
});

module.exports = app;

