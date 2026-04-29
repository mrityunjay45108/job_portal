import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import registerCompany from "../controllers/company.controller.js";
import { getAllCompanies } from "../controllers/company.controller.js";
import { updateCompany } from "../controllers/company.controller.js"; 
import { getCompanyById } from "../controllers/company.controller.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get").get(isAuthenticated, getAllCompanies);
router.route("/get/:id").get(isAuthenticated, getCompanyById);
router.route("/update/:id").put(isAuthenticated, updateCompany);

export default router;
