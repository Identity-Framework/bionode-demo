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
// NOT ONLY IS THIS A HACK, BUT IT'S ALSO INSECURE, HOWEVER IT IS FOR DEMONSTRAION ONLY.
// YOU SHOULD NEVER EVER BYPASS CERT VALIDATION IN A PRODUCTION ENV... EVER
// - sincerely Cory Sabol: cssabol@gmail.com
var https = require('https');
var request = require('request');
var agentOptions = {
    host: 'localhost'
    , port: '3001'
    //, path: '/auth'
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
auth_app.get('/auth', (req, res, next) => {
    // request and authenticate a WebID certificate here
    res.json('Auth microserver api working');
});
auth_app.get('/', (req, res, next) => {
    res.json('hi');
});
// END TRICKY HACK -----------------------

// APP API --------------------------
router.get('/', (req, res, next) => {
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

router.get('/auth', (req, res, next) => {
    // Make a request to our wedid authentication microservice
    /*
    var authed;
    https.get({
        path: '/auth',
        agent: agent
    }, (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);

        res.on('data', (d) => {
            process.stdout.write(d);
        });

    }).on('error', (e) => {
         console.error(e);
    });
    */
    res.redirect('https://localhost:3001/auth');
});

router.post('/auth', (req, res, next) => {
    res.json({ MSG: 'Not yet implemented' });
});
// ----------------------------------

module.exports = router;
