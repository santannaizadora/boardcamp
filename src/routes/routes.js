import { Router } from "express";
import categoriesRoute from "./categoriesRoute.js";
import gamesRoute from "./gamesRoute.js";
import customersRoute from "./customersRoute.js";
import rentalsRoute from "./rentalsRoute.js";

const router = Router();
router.use(categoriesRoute);
router.use(gamesRoute);
router.use(customersRoute);
router.use(rentalsRoute);

export default router;