// models/member.js

const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const config = require('../dbconfig');
const admin = require('firebase-admin');

// Configura tus credenciales de Firebase
var serviceAccount = require("../keyStorage.json");

let bucket;
if (admin.apps.length) {
    bucket = admin.storage().bucket();
} else {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: "flowfitimagenes.appspot.com"
    });
    bucket = admin.storage().bucket();
}
class Member {
  static async getAll(token) {
    try {
      const connection = await mysql.createConnection(config);
      const decoded = jwt.verify(token, 'tu_secreto_jwt');
      const userID = decoded.id;
      const [rows] = await connection.execute('SELECT * FROM members WHERE user_id = ?', [userID]);
      return rows;
    } catch (err) {
      throw err;
    }
  }

  static async create(member, token) {
    try {
      const connection = await mysql.createConnection(config);
  
      // Calculate the end date based on the membership duration
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + Number(member.membership_duration));
  
      // Decode the JWT to get the user ID
      const decoded = jwt.verify(token, 'tu_secreto_jwt');
      const userID = decoded.id;
  
      // Check if member.profile_picture and member.profile_picture.name are defined
      if (!member.profile_picture || !member.profile_picture.name) {
        throw new Error('member.profile_picture or member.profile_picture.name is undefined');
      }
  
      // Sube la imagen al Firebase Storage
      const file = bucket.file(`profile_pictures/${member.profile_picture.name}`);
      await file.save(member.profile_picture.data);
  
      // Guarda la URL de la imagen en la base de datos
      member.profile_picture = `https://firebasestorage.googleapis.com/v0/b/flowfitimagenes.appspot.com/o/${encodeURIComponent(file.name)}?alt=media`;
  
      const [result] = await connection.execute('INSERT INTO members (name, email, phone, assigned_membership, end_date, profile_picture, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)', [member.name, member.email, member.phone, member.assigned_membership, endDate, member.profile_picture, userID]);
      return result;
    } catch (err) {
      throw err;
    }
  }
  static async delete(id, token) {
    try {
      const connection = await mysql.createConnection(config);
      const decoded = jwt.verify(token, 'tu_secreto_jwt');
      const userID = decoded.id;
      const [result] = await connection.execute('DELETE FROM members WHERE id = ? AND user_id = ?', [id, userID]);
      return result.affectedRows;
    } catch (err) {
      throw err;
    }
  }

  static async update(id, member, token) {
    try {
      const connection = await mysql.createConnection(config);
      const decoded = jwt.verify(token, 'tu_secreto_jwt');
      const userID = decoded.id;
      const [result] = await connection.execute('UPDATE members SET name = ?, email = ?, phone = ?, assigned_membership = ?, profile_picture = ? WHERE id = ? AND user_id = ?', [member.name, member.email, member.phone, member.assigned_membership, member.profile_picture, id, userID]);
      return result.affectedRows;
    } catch (err) {
      throw err;
    }
  }
}


module.exports = Member;