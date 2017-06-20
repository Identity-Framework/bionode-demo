var express = require('express');
var router = express.Router();

// Authentication trickery
/*
 * Spin up another https server on a different port.
 * Define the code for it to validate a webid and have the main server API
 * make calls to the authentication "microserver" or whatever you want to call it.
 *
 * This is because of the way certificates are requested during the TLS handshake before any
 * client code can be served. This will allow the Angular application to present a nice signin page
 * first which can query the auth endpoint which will then query the "microserver" for authentication,
 * causing the cert dialogue to pop up after the user clicks log-in, rather than as soon as their browser
 * makes a connection to the server.
 *
 * Interesting SO thread:
 * https://stackoverflow.com/questions/20433287/node-js-request-cert-has-expired#answer-29397100
 */
// THIS IS A HACK == IDEALLY THIS WOULD BE A SEPARATE PROJECT OR AT LEAST A SEPARATE MODULE/FILE
var https = require('https');
var request = require('request');
var agentOptions = {
    host: 'https://127.0.0.1'
    , port: '3001'
    , path: '/auth'
    , rejectUnauthorized: false
};
var agent = new https.Agent(agentOptions);
var fs = require('fs');
var auth_app = express();
var options = {
    key: fs.readFileSync('certs/server-key.pem'), // the keys and certs are self signed (sorta, one day we will get a real signed cert from a CA :'^(
    cert: fs.readFileSync('certs/server-crt.pem'),
    requestCert: true,
    rejectUnauthorized: false
};
var https_serv = https.createServer(options, auth_app);
https_serv.listen('3001');
// handle microserver API request
auth_app.get('/auth', function(req, res, next) {
    res.json('Auth microserver api working');
});
// -----------------------

// APP API ----
router.get('/', function(req, res, next) {
    res.json({
        API_Endpoint: 'API index',
        DESC: {
            '/api/auth': { 
                METHODS: {
                    'GET' : 'Request to have a WebID authenticated',
                    'POST' : 'Authenticates the actual WebID cert, not typically accessed directly'
                }
            }
        }
    });
});

router.get('/auth', function(req, res, next) {
    // Make a request to our wedid authentication microservice
    var authed;
    request({
        url: 'https://127.0.0.1:3001/auth',
        method: 'GET',
        agent: agent
    }, function(err, resp, body) {
        if (!err && resp.statusCode === 200) {
            // A okay!
            authed = 'We hit the "microservice" auth endpoint';
        } else {
            // crud...
            console.log(err);
            authed = err.Error;
        }
    });
    res.json(authed);
});

router.post('/auth', function(req, res, next) {
    res.json({ MSG: 'Not yet implemented' });
});
// ------------

module.exports = router;
