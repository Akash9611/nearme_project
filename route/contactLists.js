const express = require("express");
const router = express.Router();

const { getContact, postContact } = require('../controller/contactLists');

router.route('/').post(postContact).get(getContact);

module.exports = router;