require("dotenv").config();

module.exports = {
  ATLASDB: process.env.ATLASDB,
  LOCALDB: "mongodb://localhost:27017/blprs",
  SECRETKEY: process.env.SECRETKEY,
};
