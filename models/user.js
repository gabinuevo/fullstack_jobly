/** User class for Jobly */
const db = require("../db");
const sqlForPartialUpdate = require("../helpers/partialUpdate");
const { makeGetQuery, makeInsertQuery } = require("../helpers/UserQueryGens");
const { BAD_REQUEST } = require("../config");


/** A User on the site */

class User {

  static getSafeFields() {
    const safeFields = ["username", "password", "first_name", "last_name", "email",
      "photo_url", "is_admin"];
    return safeFields;
  }

  // /** Get a list of companies 
  //  * NOTE: MUST TAKE OBJECT
  //  * FIXME: Naming can be clearer; maybe searchByTerms()???
  //  * -- returns
  //  * [{handle, name}, ...]
  //  */

  // static async getAll(queryObj) {
  //   const safeFields = this.getSafeFields();

  //   const queryInfo = makeGetQuery(queryObj, safeFields);
  //   const result = await db.query(queryInfo.query,
  //     queryInfo.searchParams);

  //   return result.rows;
  // }

  /** Insert a new User into the database -- returns
   * {username, first_name, last_name, email, photo_url, is_admin} */
  static async addUser(inputObj) {
    try {
      const safeFields = User.getSafeFields();
      const queryInfo = makeInsertQuery(inputObj, safeFields);
      const result = await db.query(queryInfo.query, queryInfo.valuesArr);

      return result.rows[0];
    } catch (err) {
      throw { status: BAD_REQUEST, message: "User handle already taken" }
    }
  }

  // /** Get all User data using User handle. Returns User
  //  * object or User not found error. */
  // static async getOneUser(handle) {
  //   const result = await db.query(
  //     `SELECT handle, name, num_employees, description, logo_url 
  //           FROM companies WHERE handle=$1`,
  //     [handle]);

  //   return result.rows[0];
  // }

  // /** Takes in viariable information on a User selected via handle,
  //  * changes appropriate fields, returns User object with
  //  * User data. */
  // static async updateOneUser(table, items, key, id) {
  //   const safeFields = User.getSafeFields()
  //   const queryInfo = sqlForPartialUpdate(table, items, key, id, safeFields);

  //   const result = await db.query(queryInfo.query, queryInfo.values);

  //   return result.rows[0];
  // }

  // /** Takes in User handle, deletes User if in database. 
  //  * Returns SQL DELETE object. */
  // static async deleteOneUser(handle) {

  //   const result = await db.query(
  //     `DELETE FROM companies
  //           WHERE handle=$1`,
  //     [handle]);

  //   return result;
  // }

}

module.exports = User;