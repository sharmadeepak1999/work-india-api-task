const Team = require("../../../models/team");
const Squad = require("../../../models/squad");
const Player = require("../../../models/player");

const { validationResult } = require("express-validator");

const teamController = {
  addTeam: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          status: errors.array(),
          status_code: 400
        });
      }

      const { team_name } = req.body;
      const newTeam = await Team.create({ team_name });
      res.status(200).json({ 
        message: "Team created successfully",
        status_code: 200,
        team_id: newTeam.id
       });
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        status: "Team cannot be created",
        status_code: 500
      });
    }
  },

  addPlayerToTeamSquad: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          status: errors.array(),
          status_code: 400
        });
      }
      const {player_id, role} = req.body;

      const [rows1] = await Team.findById(req.params.team_id);
      const team = rows1[0];
      if(!team) {
        return res.status(401).json({ 
          status: "Team not found!",
          status_code: 401
        });
      }

      const [rows2] = await Player.findById(player_id);
      const player = rows2[0];

      await Squad.create({  player_id: player.id, team_id: team.id, role });
      res.status(200).json({ 
        message: "Player added to squad",
        status_code: 200,
        player_id: player.id,
        team_id: team.id,
        role
       });
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        status: "Player cannot be added to squad",
        status_code: 500
      });
    }
  },

  getTeams: async (req, res) => {
    try {
      const teams = await Team.find();
      res.status(200).json({ 
        status_code: 200,
        teams: teams[0]
       });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Cannot fetch teams" });
    }
  },
};

module.exports = teamController;
