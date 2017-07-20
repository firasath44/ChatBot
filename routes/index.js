var express = require('express');

var config = require('../serverConfig');

var router = express.Router();
var test = require('./test');
var apiAi = require('./apiAi');

router.get('/api/v1/test', test.GetMessages);
router.post('/api/v1/apiAiCall', apiAi.getMessages);
module.exports = router;