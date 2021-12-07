const User = require('../models/User')
const Profile = require('../models/Profile')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = {
    create,
    logIn,
    checkToken
}

async function create(req, res) {
    try {
        let user = new User(req.body)
        const profile = new Profile({user: user._id, name: user.name})
        user.profiles.push(profile)
        await user.save()
        await profile.save()

        user = await User.populate(user, 'profiles')
        res.json({ token: createJWT(user) })
    } catch(e) {
        res.status(401).json({ message: e.message });
    }
}

const SALT_ROUNDS = 8
async function logIn(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email }).populate('profiles').exec();
        if (!user) throw new Error();
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) throw new Error();
        console.log(user)
        res.json({ token: createJWT(user) });
    } catch {
        res.status(400).json('Try again, something went wrong');
    }
}

function createJWT(user) {
    return jwt.sign(
        { user }, 
        process.env.SECRET,
        {expiresIn: '24h'}
    )
}

function checkToken(req, res) {
    console.log(req.user)
    res.json(req.exp)
}