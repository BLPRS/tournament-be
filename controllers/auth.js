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

let passport = require("passport");
let Tournament = require("../models/tournament");
let User = require("../models/user");

function getErrorMessage(err) {
  if (err.errors) {
    for (let errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  }
  if (err.message) {
    return err.message;
  } else {
    return "Unknown server error";
  }
}

// helper function for guard purposes
exports.requireAuth = function (req, res, next) {
  passport.authenticate(
    "tokencheck",
    { session: false },
    function (err, user, info) {
      if (err)
        return res.status(401).json({
          success: false,
          message: getErrorMessage(err),
        });
      if (info)
        return res.status(401).json({
          success: false,
          message: info.message,
        });

      req.payload = user;
      next();
    }
  )(req, res, next);
};

// Validates the owner of the item.
exports.isAllowed = async function (req, res, next) {
  try {
    let id = req.params.id;
    let tournament = await Tournament.findById(id).populate("owner");

    // If there is no item found.
    if (tournament === null) {
      throw new Error("Item not found."); // Express will catch this on its own.
    } else if (tournament.owner !== null) {
      // If the item found has a owner.

      if (tournament.owner._id.toString() !== req.payload.id) {
        // If the owner differs.

        let currentUser = await User.findOne(
          { _id: req.payload.id },
          "admin"
        );

        if (currentUser.admin !== true) {
          // If the user is not a Admin

          console.log("====> Not authorized");
          return res.status(403).json({
            success: false,
            message: "User is not authorized to modify this item.",
          });
        }
      }
    }

    // If it reaches this point, runs the next middleware.
    next();
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};
