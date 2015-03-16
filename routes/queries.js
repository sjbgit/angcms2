var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send('Queries zone');
});

router.get('/array', function(req, res) {
    return res.send(200, { test: 'this is the test info'});
});


module.exports = router;