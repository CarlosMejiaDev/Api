const mysql = require('mysql2/promise');
const config = require('../dbconfig');

class Category {
  static async getAll() {
    try {
      const connection = await mysql.createConnection(config);
      const [rows] = await connection.execute('SELECT * FROM categories');
      return rows;
    } catch (err) {
      throw err;
    }
  }

  static async create(category) {
    try {
      const connection = await mysql.createConnection(config);
      const [result] = await connection.execute('INSERT INTO categories (name) VALUES (?)', [category.name]);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async delete(id) {
    try {
      const connection = await mysql.createConnection(config);
      const [result] = await connection.execute('DELETE FROM categories WHERE id = ?', [id]);
      return result.affectedRows;
    } catch (err) {
      throw err;
    }
  }

  static async update(id, category) {
    try {
      const connection = await mysql.createConnection(config);
      const [result] = await connection.execute('UPDATE categories SET name = ? WHERE id = ?', [category.name, id]);
      return result.affectedRows;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Category;