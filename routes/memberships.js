// routes/memberships.js

const express = require('express');
const router = express.Router();
const Membership = require('../models/membership');

// GET route to get all memberships
router.get('/', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // asumimos que el token se pasa en el encabezado de autorización como 'Bearer your_token'
    const memberships = await Membership.getAll(token);
    res.json(memberships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST route to create a new membership
router.post('/', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const newMembership = await Membership.create(req.body, token);
    res.status(201).json(newMembership);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE route to delete a membership
router.delete('/:id', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const deletedMembership = await Membership.delete(req.params.id, token);
    res.json(deletedMembership);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT route to update a membership
router.put('/:id', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const updatedMembership = await Membership.update(req.params.id, req.body, token);
    res.json(updatedMembership);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;