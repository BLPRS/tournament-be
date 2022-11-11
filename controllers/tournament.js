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

module.exports.tournamentList = async (req, res, next) => {
  const query = {};
  const selectedFields = "name description type gameName playerNum startedAt";

  try {
    let tournamentList = await Tournament.find(query, selectedFields);
    res.status(200).json(tournamentList);
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};

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
      }
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};

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
