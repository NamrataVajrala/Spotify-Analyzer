// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    favoriteSongs: {
        type: [String],
        default: []
    }
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);