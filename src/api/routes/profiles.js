const express = require('express');
const router = express.Router();

const profilesCtrl = require('../controllers/profilesCtrl')

/* GET users listing. */
router.get('/me', profilesCtrl.me);
router.get('/:id', profilesCtrl.find);
router.post('/', profilesCtrl.create);
router.get('/', profilesCtrl.index);
router.put('/:id', profilesCtrl.update);
router.post('/delete/:id', profilesCtrl.deleteProfile);

module.exports = router;