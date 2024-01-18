// models/provider.js

const sql = require('mssql');
const jwt = require('jsonwebtoken');

class Provider {
  static async getAll(token) {
    try {
      const pool = await sql.connect();
      const decoded = jwt.verify(token, 'tu_secreto_jwt');
      const UserID = decoded.id;
      const result = await pool.request()
        .input('UserID', sql.Int, UserID)
        .query('SELECT * FROM providers WHERE UserID = @UserID');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }

  static async create(provider, token) {
    try {
      const pool = await sql.connect();
      const decoded = jwt.verify(token, 'tu_secreto_jwt');
      const UserID = decoded.id;
      console.log('Decoded user ID:', UserID); // Log the decoded user ID
      const result = await pool.request()
        .input('Nombre', sql.VarChar(255), provider.Nombre)
        .input('Email', sql.VarChar(255), provider.Email)
        .input('Celular', sql.VarChar(20), provider.Celular)
        .input('Direccion', sql.VarChar(255), provider.Direccion)
        .input('UserID', sql.Int, UserID)
        .query('INSERT INTO providers (Nombre, Email, Celular, Direccion, UserID) VALUES (@Nombre, @Email, @Celular, @Direccion, @UserID)');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }

  static async delete(id, token) {
    try {
      const pool = await sql.connect();
      const decoded = jwt.verify(token, 'tu_secreto_jwt');
      const UserID = decoded.id;
      const result = await pool.request()
        .input('ID', sql.Int, id)
        .input('UserID', sql.Int, UserID)
        .query('DELETE FROM providers WHERE ID = @ID AND UserID = @UserID');
      return result.rowsAffected;
    } catch (err) {
      throw err;
    }
  }

  static async update(id, provider, token) {
    try {
      const pool = await sql.connect();
      const decoded = jwt.verify(token, 'tu_secreto_jwt');
      const UserID = decoded.id;
      const result = await pool.request()
        .input('ID', sql.Int, id)
        .input('Nombre', sql.VarChar(255), provider.Nombre)
        .input('Email', sql.VarChar(255), provider.Email)
        .input('Celular', sql.VarChar(20), provider.Celular)
        .input('Direccion', sql.VarChar(255), provider.Direccion)
        .input('UserID', sql.Int, UserID)
        .query('UPDATE providers SET Nombre = @Nombre, Email = @Email, Celular = @Celular, Direccion = @Direccion WHERE ID = @ID AND UserID = @UserID');
      return result.rowsAffected;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Provider;