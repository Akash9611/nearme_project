const express = require('express');

const router = express.Router();

const UserController = require('../controller/user');
const checkAuth = require('../middleware/check-auth');

router.post('/signup', UserController.createNewUser);

router.post('/login', UserController.login,);
router.get('/cont', UserController.getPhone);
router.get('/about/:id', UserController.getUserAbout);

module.exports = router;