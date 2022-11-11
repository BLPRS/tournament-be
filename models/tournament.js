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
  },
  {
    collection: "tournament",
  }
);

module.exports = mongoose.model("Tournament", TournamentSchema);
