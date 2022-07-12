const express = require('express');
const router = express.Router();

const { getLocations, addLocation, patchLocations, getNearLocations } = require('../controller/locats');

router
  .route('/')
  .get(getLocations);
router.post('/', addLocation);
router.patch('/', patchLocations);
router.get('/near',getNearLocations);


module.exports = router;
