const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');

// GET /trip - list all teh trips and include an HTML status code

const tripsList = async (req, res) => {
    const q = await Model
        .find({})
        .exec();

    //code here commented to show on console log
    // console.log(q);

    if (!q) {
        return res
            .status(404)
            .json(err);
    } else {
        return res
            .status(200)
            .json(q);
    }

};

const tripsFindByCode = async (req, res) => {
    const q = await Model
        .find({ 'code': req.params.tripCode })
        .exec();

    //code here commented to show on console log
    // console.log(q);

    if (!q) {
        return res
            .status(404)
            .json(err);
    } else {
        return res
            .status(200)
            .json(q);
    }

};

module.exports = {
    tripsList,
    tripsFindByCode
};

