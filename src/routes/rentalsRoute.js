import { Router } from "express";
import { getRentals, createRental, finnishRental, deleteRental } from "../controllers/rentalsController.js";
import { checkIfCustomerExists, checkIfGameExists, checkIfRentalDaysIsValid, checkIfStockIsAvailable, checkIfRentalIsFinnished, checkIfRentalExists } from "../middlewares/rentalsMiddleware.js";

const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", checkIfCustomerExists, checkIfGameExists, checkIfRentalDaysIsValid, checkIfStockIsAvailable, createRental);
router.post("/rentals/:id/return", checkIfRentalIsFinnished, checkIfRentalExists, finnishRental);
router.delete("/rentals/:id", checkIfRentalExists, checkIfRentalIsFinnished, deleteRental);

export default router;