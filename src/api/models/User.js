const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Profile = require('./Profile')

const SALT_ROUNDS = 8

const userSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        minLength: 3,
        required: true
    },
    profiles: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Profile'
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, copyDoc) {
            delete copyDoc.password
            return copyDoc
        }
    }
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next()

    this.password =  await bcrypt.hash(this.password, SALT_ROUNDS)
    return next()
})

userSchema.pre('remove', async function(next) {
    console.log('removing...')
    this.profiles.forEach(p => {
        (async () => console.log(await Profile.findByIdAndDelete(p)))()
    })
    return next()
})

module.exports = mongoose.model('User', userSchema)