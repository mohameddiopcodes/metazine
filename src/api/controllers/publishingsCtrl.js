const Publishing = require('../models/Publishing')

module.exports = {
    create,
    index,
    me
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
        const publishings = await Publishing.find({ user: req.user })
        res.json(publishings)
    } catch(e) {
        res.status(500).json({message: e.message})
    }
}