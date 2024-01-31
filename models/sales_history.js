// models/sales_history.js
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const config = require('../dbconfig'); // Importa la configuración de la base de datos

class SalesHistory {
  static async getAll(token) {
    try {
      const connection = await mysql.createConnection({config});
      const decoded = jwt.verify(token, 'tu_secreto_jwt');
      const userID = decoded.id;
      const [rows] = await connection.execute('SELECT * FROM sales_history WHERE UserID = ?', [userID]);
      return rows;
    } catch (err) {
      throw err;
    }
  }

  static async create(sale, token) {
    try {
      const connection = await mysql.createConnection({config});
      const userID = jwt.verify(token, 'tu_secreto_jwt').id;
      const [result] = await connection.execute('INSERT INTO sales_history (ID_Producto, Cantidad, PrecioVenta, UserID) VALUES (?, ?, ?, ?)', [sale.ID_Producto, sale.Cantidad, sale.PrecioVenta, userID]);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = SalesHistory;