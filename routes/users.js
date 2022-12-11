/*
Student IDs:
  Behnaz Hajibandeh – 301291057
  Cong Lanh Hoang – 301210743
  Peter John Soto – 301271157
  Richard Antonio – 301273039
  Sergio Rafael Hautrive Righi – 301217827
Web App Name:
  Tournament
Description:
  Tournament Bracket Generator
*/

let express = require("express");
let router = express.Router();
let usersController = require("../controllers/user");
let authController = require("../controllers/auth");

/* GET users listing. */
router.get("/me", authController.requireAuth, usersController.myprofile);

/* POST Sign-up */
router.post("/signup", usersController.signup);

/* POST Sign-in */
router.post("/signin", usersController.signin);

/* PUT update user */
router.put("/edit/:id", authController.requireAuth, usersController.userEdit);

module.exports = router;
