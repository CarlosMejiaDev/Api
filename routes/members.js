// routes/member.js

const express = require('express');
const router = express.Router();
const Member = require('../models/member');

router.get('/', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // asumimos que el token se pasa en el encabezado de autorización como 'Bearer your_token'
    const members = await Member.getAll(token);
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const newMember = await Member.create(req.body, token);
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const deletedMember = await Member.delete(req.params.id, token);
    res.json(deletedMember);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const updatedMember = await Member.update(req.params.id, req.body, token);
    res.json(updatedMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;