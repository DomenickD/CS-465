//Bring in the DB Connections and the Tri[ Schema
const Mongoose = require('./db');
const Trip = require('./travlr');

//read seed data from json file
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json','utf8'));

// delete any exsiting records, then insert seed data
const seedDB = async () => {
    await Trip.deleteMany();
    await Trip.insertMany(trips);
};

// close the mongodb connection and exit it
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0)
})