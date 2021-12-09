const express = require('express')
const checkAuthorized = require('../config/checkAuthorized')
const router = express.Router()
const usersCtrl = require('../controllers/usersCtrl')

router.post('/', usersCtrl.create)
router.post('/login', usersCtrl.logIn)
router.get('/check-token', checkAuthorized, usersCtrl.checkToken)
router.put('/', usersCtrl.update)
router.post('/delete', usersCtrl.deleteAccount)

module.exports = router
