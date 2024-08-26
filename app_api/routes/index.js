var express = require('express');
var router = express.Router();


var tripsController = require('../controllers/trips');

/* GET home page. */
// router.get('/trips', tripsController.tripsList);
router
    .route('/trips')
    .get(tripsController.tripsList);

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

module.exports = router;
