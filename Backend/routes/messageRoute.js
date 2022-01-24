const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/messages');

router.post('/addmessage', postCtrl.newMessages);
router.get('/', postCtrl.getMessages);
router.get('/:id', postCtrl.getOneMessages);
router.put('/update/:id/content', postCtrl.updateContentMessages);
router.put('/update/:id/title', postCtrl.updateTitleMessages)
router.put('/update/:id/file', postCtrl.updateFileMessages)
router.delete('/delete/:id', postCtrl.deleteMessage);

module.exports = router;