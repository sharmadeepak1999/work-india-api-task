const Player = require("../../../models/player");
const { validationResult } = require("express-validator");

const playerController = {
  addPlayer: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          status: errors.array(),
          status_code: 400
        });
      }

      const { name, matches_played, runs, average, strike_rate } = req.body;
      const newPlayer = await Player.create({ name, matches_played, runs, average, strike_rate });
      res.status(200).json({ 
        message: "Player created successfully",
        status_code: 200,
        player_id: newPlayer.id
       });
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        status: "Player cannot be created",
        status_code: 500
      });
    }
  },
  getPlayerStats: async (req, res) => {
    try {
      const { player_id } = req.params;
      const [rows] = await Player.findById(player_id);

      res.status(200).json({
        status_code: 200,
        player: rows[0]
       });
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        status: "Player cannot be fetched",
        status_code: 500
      });
    }
  }
};

module.exports = playerController;
