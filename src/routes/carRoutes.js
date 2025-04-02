const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

//Route to register a car
router.post('/api/v1/cars', carController.createCar);

module.exports = router;