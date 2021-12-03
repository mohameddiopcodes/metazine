const mongoose = require('mongoose')

const shareSchema = mongoose.Schema({
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    percentage: Number
})

module.exports = shareSchema