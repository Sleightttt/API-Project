const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  check("firstName")
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage("Please provide a firstName with at least 1 characters."),
  check("lastName")
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage("Please provide a lastName with at least 1 characters."),
  handleValidationErrors,
];

//sign up
router.post("/", validateSignup, async (req, res) => {
  const { email, password, username, firstName, lastName } = req.body;
  const user = await User.signup({
    email,
    username,
    password,
    firstName,
    lastName,
  });
  let info = user.toJSON();
  console.log(info);
  delete info.createdAt;
  delete info.updatedAt;

  await setTokenCookie(res, user);

  return res.json({
    user: info,
  });
});
//get all users test route
// router.get("/", async (req, res) => {
//   const users = await User.findAll();
//   return res.json({ users });
// });

module.exports = router;
