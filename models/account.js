var mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
});

accountSchema.methods.verifyPassword = function (password) {
    return this.password == password;
}

const account = mongoose.model('account', accountSchema);

module.exports = account