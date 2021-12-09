const Profile = require('../models/Profile')
const { createJWT } = require('./usersCtrl')
const bcrypt = require('bcryptjs')

module.exports = {
    create,
    index,
    me,
    find,
    update,
    deleteProfile
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

async function update(req, res) {
    try {
        const match = await bcrypt.compare(req.body.password, req.user.password);
        if(!match) throw new Error('The password is incorrect')
        await Profile.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(await Profile.findById(req.params.id))
    } catch(e) {
        res.status(401).json({message: e.message})
    }
}

async function deleteProfile(req, res) {
    try {
        const match = await bcrypt.compare(req.body.password, req.user.password);
        if(!match) throw new Error('The password is incorrect')
        req.user.profiles = req.user.profiles.filter(id => id !== req.params.id)
        req.user.save()
        await Profile.findByIdAndDelete(req.params.id)
    } catch(e) {
        res.status(401).json({message: e.message})
    }
}