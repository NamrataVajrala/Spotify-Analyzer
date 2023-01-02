// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var SongSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        default: "Unknown"
    },
    genre: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    length: {
        type: String,
        required: true
    },
    videoURL: {
        type: String,
        required: true
    },
    listeners: {
        type: [String],
        default: []
    }
});

// Export the Mongoose model
module.exports = mongoose.model('Song', SongSchema);
