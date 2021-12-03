const express = require('express');
const router = express.Router();

const publishingsCtrl = require('../controllers/publishingsCtrl')

router.post('/', publishingsCtrl.create);
router.get('/', publishingsCtrl.index);
router.post('/me', publishingsCtrl.me);

module.exports = router;
