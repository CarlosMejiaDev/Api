// models/product.js

const sql = require('mssql');
const jwt = require('jsonwebtoken');

class Product {
  static async getAll(token) {
    try {
      const pool = await sql.connect();
      const decoded = jwt.verify(token, 'tu_secreto_jwt');
      const userID = decoded.id;
      const result = await pool.request()
        .input('UserID', sql.Int, userID)
        .query('SELECT * FROM products WHERE UserID = @UserID');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }

  static async create(product, token) {
    try {
      const pool = await sql.connect();
      const decoded = jwt.verify(token, 'tu_secreto_jwt');
      const userID = decoded.id;
      const result = await pool.request()
        .input('Nombre', sql.VarChar(255), product.Nombre)
        .input('Descripcion', sql.Text, product.Descripcion)
        .input('Precio', sql.Decimal(10, 2), product.Precio)
        .input('Cantidad', sql.Int, product.Cantidad)
        .input('Categoria', sql.VarChar(50), product.Categoria)
        .input('ProveedorID', sql.Int, product.ProveedorID)
        .input('UserID', sql.Int, userID)
        .query('INSERT INTO products (Nombre, Descripcion, Precio, Cantidad, Categoria, ProveedorID, UserID) VALUES (@Nombre, @Descripcion, @Precio, @Cantidad, @Categoria, @ProveedorID, @UserID)');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }

  static async delete(id, token) {
    try {
      const pool = await sql.connect();
      const decoded = jwt.verify(token, 'tu_secreto_jwt');
      const userID = decoded.id;
      const result = await pool.request()
        .input('ID', sql.Int, id)
        .input('UserID', sql.Int, userID)
        .query('DELETE FROM products WHERE ID = @ID AND UserID = @UserID');
      return result.rowsAffected;
    } catch (err) {
      throw err;
    }
  }

  static async update(id, product, token) {
    try {
      const pool = await sql.connect();
      const decoded = jwt.verify(token, 'tu_secreto_jwt');
      const userID = decoded.id;
      const result = await pool.request()
        .input('ID', sql.Int, id)
        .input('Nombre', sql.VarChar(255), product.Nombre)
        .input('Descripcion', sql.Text, product.Descripcion)
        .input('Precio', sql.Decimal(10, 2), product.Precio)
        .input('Cantidad', sql.Int, product.Cantidad)
        .input('Categoria', sql.VarChar(50), product.Categoria)
        .input('ProveedorID', sql.Int, product.ProveedorID)
        .input('UserID', sql.Int, userID)
        .query('UPDATE products SET Nombre = @Nombre, Descripcion = @Descripcion, Precio = @Precio, Cantidad = @Cantidad, Categoria = @Categoria, ProveedorID = @ProveedorID WHERE ID = @ID AND UserID = @UserID');
      return result.rowsAffected;
    } catch (err) {
      throw err;
    }
  }

  static async decreaseQuantity(id, quantity, token) {
    try {
      const pool = await sql.connect();
      const decoded = jwt.verify(token, 'tu_secreto_jwt');
      const userID = decoded.id;
      const result = await pool.request()
        .input('id', sql.Int, id)
        .input('quantity', sql.Int, quantity)
        .input('UserID', sql.Int, userID)
        .query('UPDATE products SET Cantidad = Cantidad - @quantity WHERE ID = @id AND UserID = @UserID');
      return result.rowsAffected[0];
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Product;