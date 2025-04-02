const carRepository = require('../repositories/carRepository');

const createCar = async (carDate) => {
    const { brand, model, year, plate } = carDate;
    const errors = [];
    
    if (!brand) errors.push('brand is required');
    if (!model) errors.push('model is required');
    if (!year) errors.push('year is required');
    if (!plate) errors.push('plate is required');

    //validation of the year
    const currentYear = new Date().getFullYear();
    const minYear = currentYear - 9; //Maximum year considering next year
    if (year < minYear || year > currentYear + 1){
        errors.push(`year must be between ${minYear} and ${currentYear + 1}`);
    }

    //validation of the plate (format: ABC-1C34)
    const plateRegex = /^[A-Z]{3}-\d[A-J0-9]\d{2}$/;
    if(!plateRegex.test(plate)){
        errors.push('plate must be in the correct format ABC-1C34');
    }

    if (errors.length > 0){
        const error = new Error('Validation failed');
        error.status = 400;
        error.errors = errors;
        throw error;
    }
    
    //Check if there is already a car with the same license plate
    const existingCar = await carRepository.findByPlate(plate);
    if (existingCar){
        const error = new Error('Car already registered');
        error.status = 409;
        error.errors = ['Car already registered'];
        throw error;
    }

    //Create car in database
    return await carRepository.create(carDate);
};

module.exports = { createCar };