const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByUsername(username);
    if (!user || password !== user.password) {
      return res.status(401).json({ error: 'Credenciales inálidas' });
    }

    const token = jwt.sign({ id: user.id }, 'tu_secreto_jwt', { expiresIn: '1h' });
    res.json({ accessToken: token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;