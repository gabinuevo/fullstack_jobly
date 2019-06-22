const Router = require("express").Router;
const ExpressError = require("../helpers/expressError");
const { BAD_REQUEST, NOT_FOUND } = require("../config");
const { validate, FormatChecker } = require("jsonschema");
const userSchemaNew = require("../schemas/userSchemaNew.json");
const userSchemaPatch = require("../schemas/userSchemaPatch.json");
const User = require("../models/user");

const router = new Router();

// function makeTimer() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (Math.random() > .5) return resolve("we did it")
//       return reject("nope")
//     }, 2000)
//   })
// }

/** Post a new user, return error if data is invalid. */
router.post("/", async function (req, res, next) {
  try {
    const validation = validate(req.body, userSchemaNew);

    if (!validation.valid) {
      const errors = validation.errors.map(e => e.stack);
      throw new ExpressError(errors, BAD_REQUEST);
    }
    const user = await User.addUser(req.body);

    return res.status(201).json({ user });
  } catch (err) {
    return next(err);
  }
});

/** GET /  - get full list of users
* => {users: [{username, first_name, last_name, email, photo_url, isAdmin}, ...]}
*/
router.get("/", async function (req, res, next) {
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
router.get("/:username", async function (req, res, next) {
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

/** PATCH /:username  - updates a user by its username 
 * returns an the newly updated usrr
* => {user: userData}
*/
router.patch("/:username", async function (req, res, next) {
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
router.delete("/:username", async function (req, res, next) {
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