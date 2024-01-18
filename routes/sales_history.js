// routes/sales_history.js

const express = require('express');
const router = express.Router();
const SalesHistory = require('../models/sales_history');
const Product = require('../models/product');

// GET route to get all sales
router.get('/', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // asumimos que el token se pasa en el encabezado de autorización como 'Bearer your_token'
    const sales = await SalesHistory.getAll(token);
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST route to create a new sale
router.post('/', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const newSale = await SalesHistory.create(req.body, token);
    await Product.decreaseQuantity(req.body.ID_Producto, req.body.Cantidad, token);
    res.status(201).json(newSale);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;