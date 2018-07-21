const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String,
        unique: false
    },
    temp: {
        type: String
    },
    img: {
        type: String
    }
});

const City = module.exports = mongoose.model('city', CitySchema)
