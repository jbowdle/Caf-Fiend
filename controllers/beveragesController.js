const db = require('../models');
const express = require('express');
const router = express.Router();

// Get all beverages for a specific user
router.get('/api/beverages/:user_id', async (req, res) => {
  try {
    const beverages = await db.Beverage.findAll({ where: { UserId: req.params.user_id } });
    res.json(beverages);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Create a new beverage for a specific user
router.post('/api/beverages', async (req, res) => {
  try {
    const newBeverage = await db.Beverage.create(req.body);
    res.json(newBeverage);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update a beverage
router.put('/api/beverages/:id', async (req, res) => {
  try {
    const updatedBeverage = await db.Beverage.update(req.body, { where: { id: req.params.id } });
    res.json(updatedBeverage);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete a beverage
router.delete('/api/beverages/:id', async (req, res) => {
  try {
    const deletedBeverage = await db.Beverage.destroy({ where: { id: req.params.id } });
    res.json(deletedBeverage);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;