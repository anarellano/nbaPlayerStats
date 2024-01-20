const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nbaPlayers = require("./models");
const app = express();
const port = 8000;
app.use(cors());
app.use(express.json()); // recieve json objects

// Connect to the db
mongoose.connect("mongodb://localhost:27017/nbaPlayers");

// GET data to show on the table
app.get("/getPlayers", async (req, res) => {
  const page = req.query.page || 0;
  const playersPerPage = req.query.limit || 20;
  const { team, nbaPlayer, position } = req.query;
  try {
    let findPlayer = {};
    if (nbaPlayer) {
      findPlayer.player = { $regex: RegExp(nbaPlayer, "i") };
    }
    if (team) {
      findPlayer.team = { $regex: RegExp(team, "i") };
    }
    if (position) {
      findPlayer.position = { $regex: RegExp(position, "i") };
    }

    const response = await nbaPlayers
      .find(findPlayer)
      .skip(page * playersPerPage)
      .limit(playersPerPage);

    if (!response) {
      return "Could not get players";
    }
    const countResponse = await nbaPlayers.find(findPlayer).count();
    const data = res.json({ response, countResponse });
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
