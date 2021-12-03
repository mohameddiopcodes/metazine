const Profile = require('../models/Profile')

module.exports = {
    create,
    index,
    me
}

async function create(req, res) {
    try {
        const profile = await Profile.create(req.body)
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
        const profiles = await Profile.find({ user: req.user })
        res.json(profiles)
    } catch(e) {
        res.status(500).json({message: e.message})
    }
}