const User = require('../models/User')
const Profile = require('../models/Profile')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = {
    create,
    logIn,
    checkToken,
    update,
    deleteAccount,
    createJWT
}

async function create(req, res) {
    try {
        let user = new User(req.body)
        const profile = new Profile({user: user._id, name: user.name})
        user.profiles.push(profile)
        await user.save()
        await profile.save()
        
        res.json({ token: createJWT(await User.findById(user._id)) })
    } catch(e) {
        res.status(401).json({ message: e.message });
    }
}

const SALT_ROUNDS = 8
async function logIn(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) throw new Error('This account does not exist');
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) throw new Error('The password is incorrect');
        res.json({ token: createJWT(user) });
    } catch {
        res.status(400).json({message: 'Double check, your email or password may be wrong'});
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

async function update(req, res) {
    try {
        let match = false
        match = !req.body.prevPassword ? await bcrypt.compare(req.body.password, req.user.password) : await bcrypt.compare(req.body.prevPassword, req.user.password)
        if(!match) throw new Error('The password is incorrect')
        !req.body.prevPassword ? delete req.body.password: delete req.body.prevPassword
        console.log(req.body)
        const user = !req.body.password ? await User.findByIdAndUpdate(req.user._id, req.body): await User.findById(req.user._id)
        if(req.body.password) user.password = req.body.password
        req.body.name && await Profile.findByIdAndUpdate(req.user.profiles[0], {name: req.body.name})
        user.save()
        res.json({ token: createJWT(user) })
    } catch(e) {
        res.status(401).json({message: e.message})
    }
}

async function deleteAccount(req, res) {
    try {
        const match = await bcrypt.compare(req.body.password, req.user.password);
        if(!match) throw new Error('The password is incorrect')
        const user = await User.findById(req.user._id)
        user.remove()
        res.json({})
    } catch(e) {
        res.status(401).json({message: e.message})
    }
}