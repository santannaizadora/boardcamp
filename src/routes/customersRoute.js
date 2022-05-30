import { Router } from "express";
import { getCustomers, createCustomer, updateCustomer } from "../controllers/customersController.js";
import { checkIfCpfExists, checkIfCpfExistsOnUpdate, checkIfCpfIsValid, checkIfPhoneIsValid, checkIfBirthdayIsValid } from "../middlewares/customersMiddleware.js";

const router = Router();

router.get("/customers", getCustomers);
router.post("/customers", checkIfCpfIsValid, checkIfPhoneIsValid, checkIfBirthdayIsValid, checkIfCpfExists, createCustomer);
router.put("/customers/:id", checkIfCpfIsValid, checkIfPhoneIsValid, checkIfBirthdayIsValid, checkIfCpfExistsOnUpdate, updateCustomer);

export default router;