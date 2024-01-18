// models/sales_history.js

const sql = require('mssql');
const jwt = require('jsonwebtoken');

class SalesHistory {
  static async getAll(token) {
    try {
      const pool = await sql.connect();
      const decoded = jwt.verify(token, 'tu_secreto_jwt');
      const userID = decoded.id;
      const result = await pool.request()
        .input('UserID', sql.Int, userID)
        .query('SELECT * FROM sales_history WHERE UserID = @UserID');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }

  static async create(sale, token) {
    try {
      const pool = await sql.connect();
      const userID = jwt.verify(token, 'tu_secreto_jwt').id;
      const result = await pool.request()
        .input('ID_Producto', sql.Int, sale.ID_Producto)
        .input('Cantidad', sql.Int, sale.Cantidad)
        .input('PrecioVenta', sql.Decimal(10, 2), sale.PrecioVenta)
        .input('UserID', sql.Int, userID)
        .query('INSERT INTO sales_history (ID_Producto, Cantidad, PrecioVenta, UserID) VALUES (@ID_Producto, @Cantidad, @PrecioVenta, @UserID)');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = SalesHistory;