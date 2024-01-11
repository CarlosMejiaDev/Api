// routes/member.js

const express = require('express');
const router = express.Router();
const Member = require('../models/member');

router.get('/', async (req, res) => {
  try {
    const members = await Member.getAll();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newMember = await Member.create(req.body);
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedMember = await Member.delete(req.params.id);
    res.json(deletedMember);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedMember = await Member.update(req.params.id, req.body);
    res.json(updatedMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;