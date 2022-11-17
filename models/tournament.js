let mongoose = require("mongoose");

/*
 * embedded object Match
 */

const MatchSchema = mongoose.Schema(
  {
    x: { type: String },
    y: { type: String },
    winner: { type: Number },
  },
  { _id: false }
);

/*
 * embedded object Round
 */

const RoundSchema = mongoose.Schema(
  {
    r16: { type: [MatchSchema] },
    r8: { type: [MatchSchema] },
    r4: { type: [MatchSchema] },
    r2: { type: [MatchSchema] },
  },
  { _id: false }
);

/*
 * embedded object Participant
 */

const ParticipantSchema = mongoose.Schema(
  {
    id: { type: String },
    name: { type: String },
  },
  { _id: false }
);

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
    // adds relationship with USER
    // use Model ID = User
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    participants: [ParticipantSchema],
    rounds: RoundSchema,
    startedAt: String,
    deleted: { type: Boolean, default: false },
    completed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: "tournament",
  }
);

module.exports = mongoose.model("Tournament", TournamentSchema);
