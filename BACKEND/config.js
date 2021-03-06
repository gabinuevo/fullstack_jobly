/** Shared config for application; can be req"d many places. */


require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "secret";

const PORT = +process.env.PORT || 3001;

const saltRounds = 14;

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const UNAUTHORIZED = 403;

// database is:
//
// - on Heroku, get from env var DATABASE_URL
// - in testing, "jobly-test"
// - else: "jobly"

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "jobly-test";
} else {
  DB_URI  = process.env.DATABASE_URL || "jobly";
}


module.exports = {
  SECRET_KEY,
  PORT,
  DB_URI,
  BAD_REQUEST,
  NOT_FOUND,
  UNAUTHORIZED,
  saltRounds
};
