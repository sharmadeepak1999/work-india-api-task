const db = require("../config/database");

const Player = {
  create: (player) => {
    return db
      .promise()
      .execute(
        "INSERT INTO players (name, matches_played, runs, average, strike_rate) VALUES (?, ?, ?, ?, ?)",
        [player.name, player.matches_played, player.runs, player.average, player.strike_rate]
      );
  },
  
  findById: (player_id) => {
    return db.promise().query("SELECT * FROM players where id = ?", [player_id]);
  },
};

module.exports = Player;
