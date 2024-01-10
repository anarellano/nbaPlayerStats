const mongoose = require("mongoose");
const { Schema } = mongoose;

const nbaPlayerSchema = new Schema({
  player: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  gamesPlayed: {
    type: Number,
    required: true,
  },
  gamesStarted: {
    type: Number,
    required: true,
  },
  minutesPlayed: {
    type: Number,
    required: true,
  },
  fieldGoals: {
    type: Number,
    required: true,
  },
  fieldGoalAttempts: {
    type: Number,
    required: true,
  },
  fieldGoalPercentage: {
    type: Number,
    required: true,
  },
  threePointFieldGoals: {
    type: Number,
    required: true,
  },
  threePointFieldGoalAttempts: {
    type: Number,
    required: true,
  },
  threePointFieldGoalPercentage: {
    type: Number,
    required: true,
  },
  twoPointFieldGoals: {
    type: Number,
    required: true,
  },
  twoPointFieldGoalAttempts: {
    type: Number,
    required: true,
  },
  twoPointFieldGoalPercentage: {
    type: Number,
    required: true,
  },
  effectiveFieldGoalPercentage: {
    type: Number,
    required: true,
  },
  freeThrows: {
    type: Number,
    required: true,
  },
  freeThrowAttempts: {
    type: Number,
    required: true,
  },
  freeThrowPercentage: {
    type: Number,
    required: true,
  },
  offensiveRebounds: {
    type: Number,
    required: true,
  },
  defensiveRebounds: {
    type: Number,
    required: true,
  },
  totalRebounds: {
    type: Number,
    required: true,
  },
  assists: {
    type: Number,
    required: true,
  },
  steals: {
    type: Number,
    required: true,
  },
  blocks: {
    type: Number,
    required: true,
  },
  turnovers: {
    type: Number,
    required: true,
  },
  personalFouls: {
    type: Number,
    required: true,
  },
  pointsPerGame: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("NBAPlayer", nbaPlayerSchema);
