var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/initsession', (req, res) => {
    req.session.validWebid = false;
    req.session.validBiometric = false;
    console.log(req.session);
});

module.exports = router;
