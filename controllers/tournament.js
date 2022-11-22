// create a reference to the model
let Tournament = require("../models/tournament");

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

/**
 * DISPLAYING TOURNAMENT LIST
 * PROVIDING OWNER'S INFO AFTER LIST
 */
module.exports.tournamentList = async function (req, res, next) {
  try {
    let tournamentList = await Tournament.find().populate({
      path: "owner",
      select: "firstName lastName email username admin created",
    });

    res.status(200).json(tournamentList);
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};

/**
 * ADDING TOURNAMENT ITEM
 * DEFINING OWNERSHIP OF ITEM
 */
module.exports.tournamentAdd = (req, res, next) => {
  try {
    const owner = ["", null, undefined].includes(req.body.owner)
      ? req.payload.id
      : req.body.owner;

    const newItem = Tournament({ ...req.body, owner });

    Tournament.create(newItem, (err, item) => {
      if (err) {
        console.error(err);

        return res.status(400).json({
          success: false,
          message: getErrorMessage(err),
        });
      } else {
        console.log(item);
        res.status(201).json(item);
      }
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};

/**
 * EDITING EXISTING ITEM
 * ONLY OWNER OR ADMIN CAN EDIT
 */
module.exports.tournamentEdit = (req, res, next) => {
  try {
    const { id } = req.params;
    const owner = ["", null, undefined].includes(req.body.owner)
      ? req.payload.id
      : req.body.owner;
    const updatedItem = Tournament({ ...req.body, owner });

    Tournament.updateOne({ _id: id }, updatedItem, (err, result) => {
      if (err || result.modifiedCount === 0) {
        return res.status(400).json({
          success: false,
          message: err ? getErrorMessage(err) : "Item not found.",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Item updated successfully.",
        });
        console.log("UPDATED ITEMS" + updatedItem);
      }
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};

/**
 * DELETE EXISTING ITEM
 * ONLY OWNER OR ADMIN CAN DELETE
 */
module.exports.tournamentDelete = (req, res, next) => {
  try {
    const { id } = req.params;

    Tournament.findByIdAndRemove(
      { _id: id },
      { rawResult: true },
      (err, result) => {
        if (err || result.value === null) {
          console.error(err);

          return res.status(400).json({
            success: false,
            message: err ? getErrorMessage(err) : "Item not found.",
          });
        } else {
          res.status(200).json({
            success: true,
            message: "Item deleted successfully.",
          });
        }
      }
    );
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};
