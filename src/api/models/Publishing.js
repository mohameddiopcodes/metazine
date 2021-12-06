const mongoose = require ('mongoose')
const commentSchema = require('./schemas/commentSchema')
const shareSchema = require('./schemas/shareSchema')

const publishingSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    shares: [shareSchema],
    metazine: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        required: true
    },
    series: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [commentSchema]
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, copyDoc) {
            delete copyDoc.comments
            return copyDoc
        }
    }
})

module.exports = mongoose.model('Publishing', publishingSchema)