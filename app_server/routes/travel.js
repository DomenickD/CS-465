var express = require('express');
var router = express.Router();
const crtlMain = require('../controllers/travel');

/* GET home page. */
router.get('/', crtlMain.travel);

module.exports = router;
