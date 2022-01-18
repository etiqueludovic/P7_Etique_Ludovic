const express = require('express');
const router = express.Router();

//const auth = require('../middleware/auth');
const postCtrl = require('../controllers/messages');

router.post('/addmessage', postCtrl.newMessages);
router.get('/', postCtrl.getMessages);
router.get('/:id', postCtrl.getOneMessages);
router.put('/update/:id', postCtrl.updateMessages);
router.delete('/delete/:id', postCtrl.deleteMessage);

module.exports = router;