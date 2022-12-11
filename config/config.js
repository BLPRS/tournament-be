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

require("dotenv").config();

module.exports = {
  ATLASDB: process.env.ATLASDB,
  LOCALDB: "mongodb://localhost:27017/blprs",
  SECRETKEY: process.env.SECRETKEY,
};
