// models/user.js

const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../dbconfig'); // Importa la configuración de la base de datos

class User {
  static async findByUsername(username) {
    try {
      const connection = await mysql.createConnection(config);
      const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);
      return rows[0]; // Asegúrate de que esto incluye la propiedad 'id'
    } catch (err) {
      throw err;
    }
  }

  static async generateAuthToken(user) {
    const token = jwt.sign({ id: user.id }, 'tu_secreto_jwt', { expiresIn: '1h' });
    return token;
  }
}

module.exports = User;