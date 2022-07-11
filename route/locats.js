const express = require('express');
const router = express.Router();

const { getLocations, addLocation, patchLocations } = require('../controller/locats');

router
  .route('/')
  .get(getLocations)
  router.post('/',addLocation);
  router.patch('/',patchLocations);

module.exports = router;
