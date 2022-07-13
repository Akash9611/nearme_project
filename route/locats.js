const express = require('express');
const router = express.Router();

const { getLocations, addLocation, patchLocations, getNearLocations } = require('../controller/locats');

router.get('/location',getLocations);
router.post('/', addLocation);
router.patch('/', patchLocations);
router.get('/near',getNearLocations);


module.exports = router;
