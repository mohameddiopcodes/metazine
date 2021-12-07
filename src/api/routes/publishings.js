const express = require('express');
const router = express.Router();

const publishingsCtrl = require('../controllers/publishingsCtrl')

router.get('/me/:profileId', publishingsCtrl.me);
router.get('/', publishingsCtrl.index);
router.post('/', publishingsCtrl.create);

module.exports = router;
