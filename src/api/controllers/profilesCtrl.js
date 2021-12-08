const Profile = require('../models/Profile')

module.exports = {
    create,
    index,
    me,
    find
}

async function create(req, res) {
    try {
        const profile = await Profile.create(req.body)
        req.user.profiles.push(profile)
        req.user.save()
        console.log(req.user)
        res.json(profile)
    } catch(e) {
        res.status(401).json({message: e.message})
    }
}

async function index(req, res) {
    try {
        const profiles = await Profile.find({})
        res.json(profiles)
    } catch(e) {
        res.status(500).json({message: e.message})
    }
}

async function me(req, res) {
    try {
        const profiles = await Profile.find({ user: req.user._id })
        res.json(profiles)
    } catch(e) {
        res.status(500).json({message: e.message})
    }
}

async function find(req, res) {
    const id = req.params.id
    const profile = await Profile.findById(id)
    res.json(profile)
}