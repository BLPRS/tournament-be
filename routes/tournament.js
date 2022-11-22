var express = require("express");
var router = express.Router();
let authController = require("../controllers/auth");

let tournamentController = require("../controllers/tournament");

/* GET list of tournaments */
router.get("/list", tournamentController.tournamentList);

/* POST create tournament */
router.post("/add", authController.requireAuth, tournamentController.tournamentAdd);

/* PUT update tournament */
router.put("/edit/:id", authController.requireAuth, authController.isAllowed, tournamentController.tournamentEdit);

/* DELETE delete tournament */
router.delete("/delete/:id", authController.requireAuth, authController.isAllowed, tournamentController.tournamentDelete);

module.exports = router;
