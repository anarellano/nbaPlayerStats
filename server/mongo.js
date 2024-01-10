// Put csv file in mongodb

// step 1:  imports models.js to this file DONE
// step 2:  make connection with mongoose
// how do you run mongodb: "sce run mongo"
// how do we run mongodb without SCE: through docker( google: "how to run mongodb with docker" )

// step 3:  open the the file with node
// open file
// read the file lines
//
// step 4:  import indivdual stats of each player (each line of the file has the single players stats)

const mongoose = require("mongoose");
const NBAPlayer = require("./models");
const fs = require("fs");
const readline = require("readline");

mongoose.connect("mongodb://localhost:27017/nbaPlayers");

const file = readline.createInterface({
  input: fs.createReadStream("./players.csv"),
  output: process.stdout,
  terminal: false,
});

// line is a string
file.on("line", async (line) => {
  //player is an array of strings
  const player = line.split(";");
  const formattedPlayerData = new NBAPlayer({
    player: player[1],
    position: player[2],
    age: player[3],
    team: player[4],
    gamesPlayed: player[5],
    gamesStarted: player[6],
    minutesPlayed: player[7],
    fieldGoals: player[8],
    fieldGoalAttempts: player[9],
    fieldGoalPercentage: player[10],
    threePointFieldGoals: player[11],
    threePointFieldGoalAttempts: player[12],
    threePointFieldGoalPercentage: player[13],
    twoPointFieldGoals: player[14],
    twoPointFieldGoalAttempts: player[15],
    twoPointFieldGoalPercentage: player[16],
    effectiveFieldGoalPercentage: player[17],
    freeThrows: player[18],
    freeThrowAttempts: player[19],
    freeThrowPercentage: player[20],
    offensiveRebounds: player[21],
    defensiveRebounds: player[22],
    totalRebounds: player[23],
    assists: player[24],
    steals: player[25],
    blocks: player[26],
    turnovers: player[27],
    personalFouls: player[28],
    pointsPerGame: player[29],
  });

  try {
    await formattedPlayerData.save();
    console.log("Player saved", formattedPlayerData.player);
  } catch (err) {
    console.log("Could not save player:", err);
  }
});
