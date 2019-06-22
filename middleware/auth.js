/** Middleware for handling req authorization for routes. */

const jwt = require("jsonwebtoken");
const db = require("../db");
const { SECRET_KEY, UNAUTHORIZED } = require("../config");

/** Middleware: Authenticate user. */

function authenticateJWT(req, res, next) {
  try {
    const tokenFromBody = req.body._token;
    const payload = jwt.verify(tokenFromBody, SECRET_KEY);
    req.user = payload; // create a current user
    return next();
  } catch (err) {
    return next();
  }
}
// end

/** Middleware: Requires user is authenticated. */

function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    return next({ status: UNAUTHORIZED, message: "Unauthorized" });
  } else {
    return next();
  }
}

// end

/** Middleware: Requires correct username. */

function ensureCorrectUser(req, res, next) {
  try {
    if (req.user.username === req.params.username || req.user.is_admin) {
      return next();
    } else {
      return next({ status: UNAUTHORIZED, message: "Unauthorized" });
    }
  } catch (err) {
    // errors would happen here if we made a request and req.user is undefined
    return next({ status: UNAUTHORIZED, message: "Unauthorized" });
  }
}

async function ensureAdmin(req, res, next) {
  try {
    const userInfo = await db.query(`SELECT is_admin FROM users WHERE username = $1 AND email = $2`, [req.user.username, req.user.email]);

    if (!userInfo.rows[0].is_admin) {
      return next({ status: UNAUTHORIZED, message: "Unauthorized" });
    } else {
      return next();
    }
  } catch (err) {
    // errors would happen here if we made a request and req.user is undefined
    return next({ status: err.status || UNAUTHORIZED, message: err.message || "Unauthorized" });
  }
}

// end

module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureCorrectUser,
  ensureAdmin
};
