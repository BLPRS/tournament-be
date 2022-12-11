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

var express = require("express");
var router = express.Router();
let controlerIndex = require("../controllers/index");

/* GET home page. */
router.get("/", controlerIndex.home);

module.exports = router;
