const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comment');
const validate = require('../middleware/validate');


router.post('/', auth, validate.comment, commentCtrl.newComment);
router.get('/', auth, validate.postId, commentCtrl.getCommentsofPost);
router.delete('/:id', auth, validate.id, commentCtrl.deleteComment);

module.exports = router;