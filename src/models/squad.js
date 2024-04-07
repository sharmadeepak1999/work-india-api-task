const db = require("../config/database");

const Squad = {
  create: (squad) => {
    return db
      .promise()
      .execute(
        "INSERT INTO squads (player_id, team_id, role) VALUES (?, ?, ?)",
        [squad.player_id, squad.team_id, squad.role]
      );
  }
};

module.exports = Squad;
