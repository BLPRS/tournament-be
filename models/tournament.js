let mongoose = require("mongoose");

// Create Tournament schema
let TournamentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required",
    },
    description: {
      type: String,
      trim: true,
    },
    type: String,
    gameName: String,
    playerNum: Number,
    startedAt: Date,
    createdAt: {
      type: Date,
      default: function() {
        if (this.createdAt) return;
        return Date.now();
      },
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    // adds relationship with USER
    // use Model ID = User
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

  },
  {
    collection: "tournament",
  }
);

module.exports = mongoose.model("Tournament", TournamentSchema);
