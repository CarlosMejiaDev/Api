// models/user.js

const sql = require('mssql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class User {
  static async findByUsername(username) {
    try {
      const pool = await sql.connect();
      const result = await pool.request()
        .input('Username', sql.NVarChar, username)
        .query('SELECT * FROM users WHERE username = @Username');
      return result.recordset[0]; // Asegúrate de que esto incluye la propiedad 'id'
    } catch (err) {
      throw err;
    }
  }

  static async generateAuthToken(user) {
    const token = jwt.sign({ id: user.ID }, 'tu_secreto_jwt', { expiresIn: '1h' });
    return token;
  }
}

module.exports = User;