const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    }

})

module.exports = User = mongoose.model('users', UserSchema);