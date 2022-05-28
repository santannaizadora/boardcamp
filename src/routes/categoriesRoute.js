import { Router } from "express";
import { getCategories,  createCategory } from "../controllers/categoriesController.js";
import { checkIfThereIsCategoryName, checkIfCategoryExists } from "../middlewares/categoriesMiddleware.js";

const router = Router();
router.get("/categories", getCategories);
router.post("/categories", checkIfThereIsCategoryName, checkIfCategoryExists, createCategory);

export default router;