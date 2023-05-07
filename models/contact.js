var mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    job: String,
    other: String
})

const contact = mongoose.model('contact', contactSchema);

module.exports = contact