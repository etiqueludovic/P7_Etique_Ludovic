const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comment');
const validate = require('../middleware/validate');


router.post('/addcomment', auth, validate.comment, commentCtrl.newComment);
router.get('/:id', auth, commentCtrl.getCommentsofPost);
router.get('/', auth, commentCtrl.getCommentAllPosts);
router.delete('/delete/:id', auth, validate.id, commentCtrl.deleteComment);

module.exports = router;