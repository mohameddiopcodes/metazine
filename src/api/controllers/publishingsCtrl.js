const Profile = require('../models/Profile')
const Publishing = require('../models/Publishing')

module.exports = {
    create,
    index,
    me,
    show
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
        const profileId = req.params.profileId
        const publishings = await Publishing.find({ 'shares.profile': profileId })
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