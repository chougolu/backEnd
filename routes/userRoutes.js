const express = require('express');
const UserController = require('../controllers/UserController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/profileImgMiddleware');
const router = express.Router();

router.post('/register', upload, UserController.register);
router.get('/login', UserController.login);
router.get('/auth/update-password/:id', auth, UserController.updatePassword);
router.get('/auth/profile', auth, UserController.profile);
router.patch('/auth/profile-update', upload, auth, UserController.updateProfile);
router.delete('/auth/profile-delete', auth, UserController.deleteProfile);
router.post('/forget-password', UserController.forgetPassword);

module.exports = router;