var express = require("express");
var router = express.Router();

let tournamentController = require("../controllers/tournament");

/* GET list of tournaments */
router.get("/list", tournamentController.tournamentList);

/* POST create tournament */
router.post("/add", tournamentController.tournamentAdd);

/* PUT update tournament */
router.put("/edit/:id", tournamentController.tournamentEdit);

/* DELETE delete tournament */
router.delete("/delete/:id", tournamentController.tournamentDelete);

module.exports = router;
