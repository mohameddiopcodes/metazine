const mongoose = require('mongoose')
const { collection } = require('./Publishing')

const Publishing = require('./Publishing')

const profileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: String,
    image: String,
    publishings: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Publishing'
    }
},
{
    timestamps: true,
    toJSON: {
        virtuals: true
    }
})

profileSchema.virtual('collections').get(function() {
    let collections = []
    collections = this.publishings.forEach(async p => collections.push((await Publishing.findById(p)).collection))
    return collections
})

module.exports = mongoose.model('Profile', profileSchema)