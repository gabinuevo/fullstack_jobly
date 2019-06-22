/** User class for Jobly */
const db = require('../db');
const bcrypt = require("bcrypt");
const sqlForPartialUpdate = require('../helpers/partialUpdate');
const { makeInsertQuery } = require('../helpers/UserQueryGens');
const { BAD_REQUEST, UNAUTHORIZED, saltRounds } = require('../config');


/** A User on the site */

class User {

  static getSafeFields() {
    const safeFields = ['username', 'password', 'first_name', 'last_name', 'email',
      'photo_url', 'is_admin'];
    return safeFields;
  }

  /** Get a list of companies 
   * NOTE: MUST TAKE OBJECT
   * FIXME: Naming can be clearer; maybe searchByTerms()???
   * -- returns
   * [{handle, name}, ...]
   */

  static async getAllUsers() {

    const result = await db.query(`SELECT username, first_name, last_name, email,
      photo_url, is_admin FROM users`);

    return result.rows;
  }

  /** Insert a new User into the database -- returns
   * {username, first_name, last_name, email, photo_url, is_admin} */
  static async addUser(inputObj) {
    try {
      const safeFields = User.getSafeFields();
      inputObj = { ...inputObj, password: bcrypt.hashSync(inputObj.password, saltRounds) };

      const queryInfo = makeInsertQuery(inputObj, safeFields);
      const result = await db.query(queryInfo.query, queryInfo.valuesArr);
      return result.rows[0];
    } catch (err) {
      if (err.message.includes("users_email_key")) {
        throw { status: BAD_REQUEST, message: "Email is already taken" }
      } else {
        throw { status: BAD_REQUEST, message: "Username has already been taken" }
      }
    }
  }

  /** Login a User into the database -- returns
   * {username, first_name, last_name, email, photo_url, is_admin} */
  static async loginUser(username, password) {
    try {
      const dbPW = await db.query(`SELECT password FROM users WHERE username=$1`, [username])

      const response = bcrypt.compareSync(password, dbPW.rows[0].password);
      if (response) {
        return await this.getOneUser(username);
      }
    } catch (err) {
      throw { status: UNAUTHORIZED, message: "Invalid Credentials" };
    }
  }

  /** Get all User data using User's username. Returns User
   * object or User not found error. */
  static async getOneUser(username) {
    const result = await db.query(
      `SELECT username, first_name, last_name, email, photo_url, is_admin
            FROM users WHERE username=$1`,
      [username]);

    return result.rows[0];
  }

  /** Takes in viariable information on a User selected via handle,
   * changes appropriate fields, returns User object with
   * User data. */
  static async updateOneUser(table, items, key, username) {
    const safeFields = User.getSafeFields()
    const queryInfo = sqlForPartialUpdate(table, items, key, username, safeFields);

    const result = await db.query(queryInfo.query, queryInfo.values);

    return result.rows[0];
  }

  /** Takes in User handle, deletes User if in database. 
   * Returns SQL DELETE object. */
  static async deleteOneUser(username) {

    const result = await db.query(
      `DELETE FROM users
            WHERE username=$1`,
      [username]);

    return result;
  }

}

module.exports = User;