const express = require('express');
const router = express.Router();

const publishingsCtrl = require('../controllers/publishingsCtrl')

router.get('/me', publishingsCtrl.me);
router.get('/', publishingsCtrl.index);
router.post('/', publishingsCtrl.create);

module.exports = router;
