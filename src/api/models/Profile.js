const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: String,
    publishings: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Publishing'
    }
})

profileSchema.virtual('collections').get(function() {
    const collections = []
    this.populate('publishings').exec()
    this.publishings.forEach(p => collections.push(p.collection))
    return collections
})

module.exports = mongoose.model('Profile', profileSchema)