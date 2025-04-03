const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

//Route to register a car
router.post('/', carController.createCar);

//Route to upgrade car items
router.put('/:id/items', carController.updateCarItems);

module.exports = router;