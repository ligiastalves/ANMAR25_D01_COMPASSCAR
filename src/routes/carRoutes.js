const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

//Route to register a car
router.post('/', carController.createCar);

//Route to upgrade car items
router.put('/:id/items', carController.updateCarItems);

//Route to get a car by ID
router.get('/:id', carController.getCarById);

//Router to list cars with pagination and filters
router.get('/', carController.listCars);

module.exports = router;