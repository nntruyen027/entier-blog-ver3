var mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        String
    },
    categogy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categogy'
    },
    summary: String,
    detail: String,
    image: String,
    date: mongoose.Schema.Types.Date
})



const post = mongoose.model('post', postSchema);

module.exports = post