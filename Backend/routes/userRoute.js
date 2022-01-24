const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userCtrl');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');

router.post('/register', validate.newUser, userCtrl.newuser);
router.post('/login', validate.login, userCtrl.login);
router.get('/profil/:userId', userCtrl.getProfil);
router.get('/list', userCtrl.getAllUsers);
router.get('/:userId', auth, validate.id, userCtrl.getOneUser);
router.get('/:userId/message', auth, validate.id, userCtrl.getAllPostsOfUser);
router.put('/:userId/username', auth, userCtrl.changeusername);
router.put('/:userId/password', auth, validate.changePassword, userCtrl.changePassword);
router.put('/:userId/profil_image', auth, userCtrl.changeProfilePicture);
router.put('/:userId/bio', auth, userCtrl.changebio);
router.delete('/delete/:id', auth, validate.id, userCtrl.deleteAccount);

module.exports = router;