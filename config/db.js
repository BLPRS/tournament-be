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

// In real project, never expose your credential in your code.
let uriDB = require("./config").ATLASDB;

let mongoose = require("mongoose");

module.exports = function () {
  // Connect to the database
  mongoose.connect(uriDB);

  let mongodb = mongoose.connection;
  mongodb.on("error", console.error.bind(console, "Connection Error:"));
  mongodb.once("open", () => {
    console.log("==== Connected to MongoDB ====");
  });

  return mongodb;
};
