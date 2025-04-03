const carService = require("../services/carService");
const { Car, CarItems } = require('../models');
const { Op } = require('sequelize');

//route POST
const createCar = async (req, res) => {
  try {
    const car = await carService.createCar(req.body);
    return res.status(201).json(car);
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ errors: error.errors || ["Internal server error"] });
  }
};

//route PUT
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

//route GET
const getCarById = async (req, res) =>{
  try {
    const { id } = req.params;

    const car = await Car.findByPk(id, {
      include: {
        model: CarItems,
        attributes: ["name"],
      },
    });

    if (!car) {
      return res.status(404).json({ errors: ['car not found'] });
    }

    const carData = {
      id: car.id,
      brand: car.brand,
      model: car.model,
      year: car.year,
      plate: car.plate,
      created_at: car.created_at,
      items: car.CarItems ? car.CarItems.map ((item) => item.name) : [],
    };

    return res.status(200).json(carData);
  } catch (error){
    console.error('Error fetching car by ID', error);
    return res.status(500).json({ errors: ['Internal server error'] });
  }
};

//List cars with filters and pagination
const listCars = async (req, res) => {
  try {
    const { year, final_plate, brand, page, limit } = req.query;

    const pageNumber = Math.max(1, parseInt(page) || 1, 1);
    const limitNumber = Math.min(Math.max(parseInt(limit) || 5, 1), 10);
    const offset = (pageNumber - 1) * limitNumber;

    const filters = {};

    if (year) {
      filters.year = { [Op.gte]: parseInt(year) };
    }

    if (final_plate){
      filters.plate = { [Op.like]: `%${final_plate}` };
    }

    if (brand) {
      filters.brand = {[Op.iLike]: `%${brand}` };
    }

    const { count, rows } = await Car.findAndCountAll({
      where: filters,
      limit: limitNumber,
      offset: offset,
      order: [['created_at', 'DESC']],
    });

    const totalPages = Math.ceil(count / limitNumber);
    return res.status(200).json({
      count,
      pages: totalPages,
      data: rows,
    });

  } catch (error){
    console.error('Error listing cars: ', error);
    return res.status(500).json ({ errors: ['Internal server error'] });
  }
};

module.exports = { createCar, updateCarItems, getCarById, listCars };