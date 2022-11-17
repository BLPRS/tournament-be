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
module.exports.tournamentList = async function(req, res, next){  

  try {
      let tournamentList = await Tournament.find().populate({
          path: 'owner',
          select: 'firstName lastName email username admin created'
      });

      res.status(200).json(tournamentList);
      
  } catch (error) {
    console.error(error);
      return res.status(400).json(
          { 
              success: false, 
              message: getErrorMessage(error)
          }
      );
  }
}

/**
 * ADDING TOURNAMENT ITEM
 * DEFINING OWNERSHIP OF ITEM
 */
module.exports.tournamentAdd = (req, res, next) => {
  console.log(req.body);

  try {
    let newItem = Tournament({
      _id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      gameName: req.body.gameName,
      playerNum: req.body.playerNum,
      startedAt: req.body.startedAt,
      owner: (req.body.owner == null || req.body.owner == "") ? req.payload.id : req.body.owner
    });

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
    let id = req.params.id;

    let updatedItem = Tournament({
      _id: id,
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      gameName: req.body.gameName,
      playerNum: req.body.playerNum,
      startedAt: req.body.startedAt,
      owner: (req.body.owner == null || req.body.owner == "")? req.payload.id : req.body.owner 
    });

    Tournament.updateOne({ _id: id }, updatedItem, (err) => {
      if (err) {
        console.error(err);

        return res.status(400).json({
          success: false,
          message: getErrorMessage(error),
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
    let id = req.params.id;

    Tournament.deleteOne({ _id: id }, (err) => {
      if (err) {
        console.error(err);

        return res.status(400).json({
          success: false,
          message: getErrorMessage(error),
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Item deleted successfully.",
        });
      }
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};
