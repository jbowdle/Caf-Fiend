const router = require('express').Router();
const { Database, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new database
router.post('/', withAuth, async (req, res) => {
  try {
    const newDatabase = await Database.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newDatabase);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get all databases for a user
router.get('/', withAuth, async (req, res) => {
  try {
    const databases = await Database.findAll({
      where: { user_id: req.session.user_id },
    });
    res.status(200).json(databases);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Mores routes here 

module.exports = router;