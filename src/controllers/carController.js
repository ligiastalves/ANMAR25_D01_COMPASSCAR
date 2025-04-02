const carService = require('../services/carService');

const createCar = async (req, res) => {
    try {
        const car = await carService.createCar(req.body);
        return res.status(201).json(car);        
    } catch (error){
        return res.status(error.status || 500).json({ errors: error.errors || ['Internal server error']});
    }
};

module.exports = { createCar };