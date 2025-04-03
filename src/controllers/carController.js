const carService = require("../services/carService");
const { Car, CarItems } = require('../models');

const createCar = async (req, res) => {
  console.log("Recebendo requisição POST:", req.body);
  try {
    const car = await carService.createCar(req.body);
    return res.status(201).json(car);
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ errors: error.errors || ["Internal server error"] });
  }
};

//Update car items
const updateCarItems = async (req, res) => {
  try {
    const { id } = req.params;
    const items = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ errors: ["items is required"] });
    }

    if (items.length > 5) {
      return res.status(400).json({ errors: ["items must be a maximum of 5"] });
    }

    const uniqueItems = new Set(items);
    if (uniqueItems.size !== items.length) {
      return res.status(400).json({ errors: ["items cannot be repeated"] });
    }

    const car = await Car.findByPk(id);
    if (!car) {
      return res.status(404).json({ errors: ["car not found"] });
    }

    await CarItems.destroy({ where: { car_id: id } });

    const carItems = items.map((item) => ({ name: item, car_id: id }));
    await CarItems.bulkCreate(carItems);

    return res.status(204).send();
  } catch (error) {
    console.error("Error updating car items: ", error);
    return res.status(500).json({ errors: ["Internal server error"] });
  }
};

module.exports = { createCar, updateCarItems };