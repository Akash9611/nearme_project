const express = require('express');

const router = express.Router();

const UserController = require('../controller/user');
const checkAuth = require('../middleware/check-auth');

router.post('/signup', UserController.createNewUser);

router.post('/login', UserController.loin,);
router.post('/cont', UserController.postPhoneData);

module.exports = router;