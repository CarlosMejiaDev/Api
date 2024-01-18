// models/member.js

const sql = require('mssql');
const jwt = require('jsonwebtoken');

class Member {
  static async getAll(token) {
    try {
      const pool = await sql.connect();
      const decoded = jwt.verify(token, 'tu_secreto_jwt');
      const userID = decoded.id;
      const result = await pool.request()
        .input('UserID', sql.Int, userID)
        .query('SELECT * FROM members WHERE UserID = @UserID');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }

  static async create(member, token) {
    try {
      const pool = await sql.connect();

      // Calculate the end date as one month after the current date
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);

      // Decode the JWT to get the user ID
      const decoded = jwt.verify(token, 'tu_secreto_jwt');
      const userID = decoded.id;

      const result = await pool.request()
        .input('Nombre', sql.VarChar(255), member.Nombre)
        .input('Email', sql.VarChar(255), member.Email)
        .input('Celular', sql.VarChar(20), member.Celular)
        .input('MembresiaAsignada', sql.Int, member.MembresiaAsignada)
        .input('FechaFinalizacion', sql.DateTime, endDate)
        .input('UserID', sql.Int, userID)
        .query('INSERT INTO members (Nombre, Email, Celular, MembresiaAsignada, FechaFinalizacion, UserID) VALUES (@Nombre, @Email, @Celular, @MembresiaAsignada, @FechaFinalizacion, @UserID)');
      return result.rowsAffected;
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
        .query('DELETE FROM members WHERE Id = @Id AND UserID = @UserID');
      return result.rowsAffected;
    } catch (err) {
      throw err;
    }
  }

  static async update(id, member, token) {
    try {
      const pool = await sql.connect();
      const decoded = jwt.verify(token, 'tu_secreto_jwt');
      const userID = decoded.id;
      const result = await pool.request()
        .input('Id', sql.Int, id)
        .input('Nombre', sql.VarChar(255), member.Nombre)
        .input('Email', sql.VarChar(255), member.Email)
        .input('Celular', sql.VarChar(20), member.Celular)
        .input('MembresiaAsignada', sql.Int, member.MembresiaAsignada)
        .input('UserID', sql.Int, userID)
        .query('UPDATE members SET Nombre = @Nombre, Email = @Email, Celular = @Celular, MembresiaAsignada = @MembresiaAsignada WHERE Id = @Id AND UserID = @UserID');
      return result.rowsAffected;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Member;