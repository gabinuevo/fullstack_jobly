/** Generates an INSERT SQL query dynamically based on input
 * from client. Minimum information require is handle and name.
 */
function makeInsertQuery(reqObj, safeFields) {

  let query = `INSERT INTO users (`;
  let valuesArr = [];
  let valueStr = ") VALUES (";
  let idx = 1;

  for (let key in reqObj) {
    if (safeFields.includes(key)) {
      query += `${key}, `;
      valueStr += `$${idx}, `;
      valuesArr.push(reqObj[key]);
      idx++;
    }
  }

  valueStr = valueStr.slice(0, -2); // ", " = 2

  // ", " = 2
  query = query.slice(0, -2) + valueStr + `) RETURNING username, first_name, last_name, email, photo_url, is_admin`;

  return { query, valuesArr };
}

module.exports = { makeInsertQuery };