const Car = require('../models/Car');
const findByPlate = async (plate) => {
    return await Car.findOne({ where: { plate } });
};

const create = async (carDate) => {
    return await Car.create(carDate);
};

module.exports = { findByPlate, create };