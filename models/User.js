const mongoose = require('mongoose');

//user model
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone_no:{
      type: Number,
      required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('User', UserSchema);
