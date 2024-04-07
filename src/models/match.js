const db = require("../config/database");

const Match = {
  create: (match) => {
    return db
      .promise()
      .execute(
        "INSERT INTO matches (team_1, team_2, date, venue) VALUES (?, ?, ?, ?)",
        [match.team_1, match.team_2, match.date, match.venue]
      );
  },

  find: () => {
    return db.promise().query("SELECT * FROM matches");
  },

  findById: async (match_id) => {
    const matchData = await db.promise().execute("Select * from matches where id = ?", [match_id]);
    const team_1_squad = await db.promise().execute("Select p.name, s.player_id, s.role from squads s JOIN players p ON s.player_id = p.id where team_id = ?", [matchData[0][0].team_1]);
    const team_2_squad = await db.promise().execute("Select p.name, s.player_id, s.role from squads s JOIN players p ON s.player_id = p.id where team_id = ?", [matchData[0][0].team_2]);
    return {
      ...matchData[0][0],
      squads: {
        team_1: team_1_squad[0][0],
        team_2: team_2_squad[0][0]
      }
    }
  }
};

module.exports = Match;
