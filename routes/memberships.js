// routes/memberships.js

const express = require('express');
const router = express.Router();
const Membership = require('../models/membership');

// GET route to get all memberships
router.get('/', async (req, res) => {
  try {
    const memberships = await Membership.getAll();
    res.json(memberships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST route to create a new membership
router.post('/', async (req, res) => {
  try {
    const newMembership = await Membership.create(req.body);
    res.status(201).json(newMembership);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE route to delete a membership
router.delete('/:id', async (req, res) => {
  try {
    const deletedMembership = await Membership.delete(req.params.id);
    res.json(deletedMembership);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT route to update a membership
router.put('/:id', async (req, res) => {
  try {
    const updatedMembership = await Membership.update(req.params.id, req.body);
    res.json(updatedMembership);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;