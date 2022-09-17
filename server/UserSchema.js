const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username : {type: String},
    email : {type: String},
    password: {type : String},
    passes: {type: Array}
})

const userModel = new mongoose.model('user', UserSchema);

module.exports = userModel;