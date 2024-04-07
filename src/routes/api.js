const express = require("express");
const router = express.Router();

const adminAuthController = require("../controllers/Api/V1/adminAuthController");
const matchController = require("../controllers/Api/V1/matchController");
const teamController = require("../controllers/Api/V1/teamController");
const playerController = require("../controllers/Api/V1/playerController");

const verifyToken = require("../middleware/verifyToken")

const {
  adminLoginValidationRules,
  adminRegisterValidationRules,
} = require("../validations/Api/V1/UserValidation");

const {
  matchCreateValidationRules
} = require("../validations/Api/V1/matchValidation");

const { teamCreateValidationRules 
} = require("../validations/Api/V1/teamValidation")

const { playerCreateValidationRules 
} = require("../validations/Api/V1/playerValidation")

const {
  squadCreateValidationRules
} = require("../validations/Api/V1/squadValidation")
router.post(
  "/admin/register",
  adminRegisterValidationRules(),
  adminAuthController.register
);
router.post(
  "/admin/login", 
  adminLoginValidationRules(), 
  adminAuthController.login
);

router.post(
  "/matches",
  verifyToken,
  matchCreateValidationRules(),
  matchController.addMatch
)

router.get(
  "/matches",
  matchController.getMatches
)

router.get(
  "/matches/:match_id",
  matchController.getMatchById
)

router.post(
  "/teams",
  verifyToken,
  teamCreateValidationRules(),
  teamController.addTeam
)

router.post(
  "/teams/:team_id/squad",
  verifyToken,
  squadCreateValidationRules(),
  teamController.addPlayerToTeamSquad
)

router.get(
  "/teams",
  teamController.getTeams
)

router.post(
  "/players",
  verifyToken,
  playerCreateValidationRules(),
  playerController.addPlayer
)

router.get(
  "/players/:player_id/stats",
  playerController.getPlayerStats
)

module.exports = router;
