import { Router } from "express";
import { getGames, createGame } from "../controllers/gamesController.js";
import { checkIfCategoryExists, checkIfGameNameExists, checkIfAreValidData } from "../middlewares/gamesMiddleware.js";

const router = Router();

router.get("/games", getGames);
router.post("/games", checkIfCategoryExists, checkIfGameNameExists, checkIfAreValidData, createGame);

export default router;