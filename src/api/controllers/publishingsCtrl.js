const { ObjectId } = require('mongoose').Schema.Types
const Profile = require('../models/Profile')
const Publishing = require('../models/Publishing')

const bcrypt = require('bcryptjs')


module.exports = {
    create,
    index,
    me,
    show,
    update,
    delete: deletePublishing
}

async function create(req, res) {
    try {
        const publishing = await Publishing.create(req.body)
        res.json(publishing)
    } catch(e) {
        res.status(401).json({message: e.message})
    }
}

async function index(req, res) {
    try {
        const publishings = await Publishing.find({})
        res.json(publishings)
    } catch(e) {
        res.status(500).json({message: e.message})
    }
}

async function me(req, res) {
    try {
        const profile = Profile.findById(req.params.profileId)
        const publishings = await Publishing.find({ 'shares.profile': req.params.profileId || profile._id })
        res.json(publishings)
    } catch(e) {
        res.status(500).json({message: e.message})
    }
}

async function show(req, res) {
    try {
        const id = req.params.id
        const publishing = await Publishing.findById(id)
        res.json(publishing)
    } catch(e) {
        res.status(500).json({message: e.message})
    }
}

async function update(req, res) {
    try {
        const match = await bcrypt.compare(req.body.password, req.user.password);
        if(!match) throw new Error('The password is incorrect')
        delete req.body.password
        res.json(await Publishing.findByIdAndUpdate(req.params.id, req.body))
    } catch(e) {
        res.status(401).json({message: e.message})
    }
}

async function deletePublishing(req, res) {
    try {
        const match = await bcrypt.compare(req.body.password, req.user.password);
        if(!match) throw new Error('The password is incorrect')
        await Publishing.findByIdAndDelete(req.params.id)
        res.json({})
    } catch(e) {
        res.status(401).json({message: e.message})
    }
}