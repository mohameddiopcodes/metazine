const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = function(req, res, next) {
    let token = req.get('Authorization') || req.query.token
    if(token) {
        token = token.replace('Bearer ', '')
        jwt.verify(token, process.env.SECRET, async function(err, decoded) {
            req.user = err ? null: await User.findById(decoded.user._id)
            req.exp = err ? null: new Date(decoded.exp * 1000)
            next()
        })
    } else {
        req.user = null
        next()
    }
}