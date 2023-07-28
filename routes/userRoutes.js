const express = require('express');
const UserController = require('../controllers/UserController');
const auth = require('../middlewares/auth');
const path = require('path');
const upload = require('../middlewares/imageUploads/profileImgMiddleware');
const router = express.Router();

router.post('/register', upload, UserController.register);
router.post('/login', UserController.login);
router.post('/auth/update-password/:id', UserController.updatePassword);
router.get('/auth/profile', auth, UserController.profile);
router.patch('/auth/profile-update',auth, upload, UserController.updateProfile);
router.delete('/auth/profile-delete', auth, UserController.deleteProfile);
router.post('/forget-password', UserController.forgetPassword);

module.exports = router;