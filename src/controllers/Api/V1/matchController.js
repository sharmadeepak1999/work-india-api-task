const Match = require("../../../models/match");
const { validationResult } = require("express-validator");

const matchController = {
  addMatch: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          status: errors.array(),
          status_code: 400
        });
      }

      const { team_1, team_2, date, venue } = req.body;
      const newMatch = await Match.create({ team_1, team_2, date, venue });
      res.status(200).json({ 
        message: "Match created successfully",
        status_code: 200,
        match_id: newMatch.id
       });
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        status: "Match cannot be created",
        status_code: 500
      });
    }
  },

  getMatches: async (req, res) => {
    try {
      const matches = await Match.find();
      res.status(200).json({ 
        status_code: 200,
        matches: matches[0]
       });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Cannot fetch matches" });
    }
  },
  getMatchById: async (req, res) => {
    try {
      const data = await Match.findById(req.params.match_id);
      res.status(200).json({ 
        status_code: 200,
        ...data
       });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Cannot fetch match" });
    }
  }
};

module.exports = matchController;
