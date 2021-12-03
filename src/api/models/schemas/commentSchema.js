const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    content: String
})

module.exports = commentSchema