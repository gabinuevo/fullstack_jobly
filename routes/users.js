const Router = require("express").Router;
const ExpressError = require("../helpers/expressError");
const { BAD_REQUEST, NOT_FOUND, SECRET_KEY, UNAUTHORIZED } = require("../config");
const { authenticateJWT, ensureLoggedIn, ensureCorrectUser, ensureAdmin } = require("../middleware/auth");
const { validate } = require("jsonschema");
const jwt = require("jsonwebtoken");
const userSchemaNew = require("../schemas/userSchemaNew.json");
const userSchemaPatch = require("../schemas/userSchemaPatch.json");
const User = require("../models/user");

const router = new Router();


/** GET /  - get full list of users
 * => {users: [{username, first_name, last_name, email, photo_url, isAdmin}, ...]}
 */
router.get("/", authenticateJWT, ensureLoggedIn, async function (req, res, next) {
  try {
    const result = await User.getAllUsers();
    return res.json({ users: result });

  } catch (err) {
    return next(err);
  }
});

/** GET /:username  - get details of 1 user w/ username in params
 * => {user:userData}
 */
router.get("/:username", authenticateJWT, ensureLoggedIn, async function (req, res, next) {
  try {
    const username = req.params.username;

    const result = await User.getOneUser(username);

    if (result === undefined) {
      throw new ExpressError('User not found', NOT_FOUND)
    } else {
      return res.json({ user: result });
    }
  } catch (err) {
    return next(err);
  }
});

/** Post a new user, return error if data is invalid. */
router.post("/", async function (req, res, next) {
  try {
    const validation = validate(req.body, userSchemaNew);

    if (!validation.valid) {
      const errors = validation.errors.map(e => e.stack);
      throw new ExpressError(errors, BAD_REQUEST);
    }
    const user = await User.addUser(req.body);
    const token = jwt.sign({ ...user }, SECRET_KEY);

    return res.status(201).json({ user, token });
  } catch (err) {
    return next(err);
  }
});

/** Logs in user, throws error if data is invalid. 
 * Needs to receive username and password
*/
router.post("/login", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await User.loginUser(username, password);

    if (!user) {
      throw new ExpressError("Invalid credentials", UNAUTHORIZED);
    } else {
      let token = jwt.sign({ ...user }, SECRET_KEY);
      return res.status(200).json({ user, token });
    }
  } catch (err) {
    return next(err);
  }
});


/** PATCH /:username  - updates a user by its username 
 * returns an the newly updated usrr
* => {user: userData}
*/
router.patch("/:username", authenticateJWT, ensureLoggedIn, ensureCorrectUser, async function (req, res, next) {
  try {

    const validation = validate(req.body, userSchemaPatch);

    if (!validation.valid) {
      const errors = validation.errors.map(e => e.stack);
      throw new ExpressError(errors, BAD_REQUEST);
    }

    const username = req.params.username;
    const result = await User.updateOneUser('users', req.body, 'username', username);

    const { password, ...userData } = result;

    if (result === undefined) {
      throw new ExpressError('User not found', NOT_FOUND)
    } else {
      return res.json({ user: userData });
    }
  } catch (err) {
    return next(err);
  }
});

/** DELETE /:username  - delete a user by their username 
 * returns message of deletion
* => { message: "User deleted." } */
router.delete("/:username", authenticateJWT, ensureLoggedIn, ensureAdmin, async function (req, res, next) {
  try {
    const username = req.params.username;

    const result = await User.deleteOneUser(username);

    if (result.rowCount === 0) {
      throw new ExpressError('User not found', NOT_FOUND)
    } else {
      return res.json({ message: 'User deleted.' });
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;