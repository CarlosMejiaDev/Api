// models/membership.js

const sql = require('mssql');
const jwt = require('jsonwebtoken');

class Membership {
  static async getAll(token) {
    try {
      const pool = await sql.connect();
      const decoded = jwt.verify(token, 'tu_secreto_jwt');
      const userID = decoded.id;
      const result = await pool.request()
        .input('UserID', sql.Int, userID)
        .query('SELECT * FROM memberships WHERE UserID = @UserID');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }

  static async create(membership, token) {
    try {
      const pool = await sql.connect();
      const decoded = jwt.verify(token, 'tu_secreto_jwt');
      const userID = decoded.id;
      const result = await pool.request()
        .input('Titulo', sql.VarChar(255), membership.Titulo)
        .input('Descripcion', sql.Text, membership.Descripcion)
        .input('Precio', sql.Decimal(10, 2), membership.Precio)
        .input('UserID', sql.Int, userID)
        .query('INSERT INTO memberships (Titulo, Descripcion, Precio, UserID) VALUES (@Titulo, @Descripcion, @Precio, @UserID)');
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
        .input('Id', sql.Int, id)
        .input('UserID', sql.Int, userID)
        .query('DELETE FROM memberships WHERE Id = @Id AND UserID = @UserID');
      return result.rowsAffected;
    } catch (err) {
      throw err;
    }
  }

  static async update(id, membership, token) {
    try {
      const pool = await sql.connect();
      const decoded = jwt.verify(token, 'tu_secreto_jwt');
      const userID = decoded.id;
      const result = await pool.request()
        .input('Id', sql.Int, id)
        .input('Titulo', sql.VarChar(255), membership.Titulo)
        .input('Descripcion', sql.Text, membership.Descripcion)
        .input('Precio', sql.Decimal(10, 2), membership.Precio)
        .input('UserID', sql.Int, userID)
        .query('UPDATE memberships SET Titulo = @Titulo, Descripcion = @Descripcion, Precio = @Precio WHERE Id = @Id AND UserID = @UserID');
      return result.rowsAffected;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Membership;