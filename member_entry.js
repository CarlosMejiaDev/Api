// models/member_entry.js
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const config = require('../dbconfig');

class MemberEntry {
  static async getAll(token) {
    try {
      const connection = await mysql.createConnection(config);
      const decoded = jwt.verify(token, 'tu_secreto_jwt');
      const adminID = decoded.id;
      const [rows] = await connection.execute('SELECT * FROM member_entries WHERE member_id = ?', [adminID]);
      return rows;
    } catch (err) {
      throw err;
    }
  }

  static async create(memberEntry, token) {
    try {
      const connection = await mysql.createConnection(config);
      const decoded = jwt.verify(token, 'tu_secreto_jwt');
      const adminID = decoded.id;
  
      const [result] = await connection.execute('INSERT INTO member_entries (member_id) VALUES (?)', [adminID]);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = MemberEntry;