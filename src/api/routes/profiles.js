const express = require('express');
const router = express.Router();

const profilesCtrl = require('../controllers/profilesCtrl')

/* GET users listing. */
router.post('/', profilesCtrl.create);
router.get('/', profilesCtrl.index);
router.post('/me', profilesCtrl.me);

module.exports = router;