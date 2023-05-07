var mongoose = require('mongoose');

const categogySchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        require: true
    },
    photo: String
})

const categogy = mongoose.model('categogy', categogySchema);


module.exports = categogy