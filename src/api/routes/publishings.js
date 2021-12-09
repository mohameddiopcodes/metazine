const express = require('express');
const router = express.Router();

const publishingsCtrl = require('../controllers/publishingsCtrl')

router.get('/me/:profileId', publishingsCtrl.me);
router.get('/:id', publishingsCtrl.show);
router.get('/', publishingsCtrl.index);
router.post('/', publishingsCtrl.create);
router.put('/:id', publishingsCtrl.update);
router.post('/delete/:id', publishingsCtrl.delete);

module.exports = router;
