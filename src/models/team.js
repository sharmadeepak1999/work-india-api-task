const db = require("../config/database");

const Team = {
  create: (team) => {
    return db
      .promise()
      .execute(
        "INSERT INTO teams (team_name) VALUES (?)",
        [team.team_name]
      );
  },

  find: () => {
    return db.promise().query("SELECT * FROM teams");
  },

  findById: (team_id) => {
    return db.promise().query("SELECT * from teams where id = ?", [team_id]);
  }
};

module.exports = Team;
