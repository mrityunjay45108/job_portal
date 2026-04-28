import express from "express";
import {
 register,
 login,
 logout,
 updateProfile
} from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import registerCompany from "../controllers/company.controller.js";
import { getAllCompanies } from "../controllers/company.controller.js";
import { updateCompany } from "../controllers/company.controller.js"; 


const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get").get(isAuthenticated, getAllCompanies);
router.route("/get/:id").get(isAuthenticated, updateProfile);
router.route("/update/:id").put(isAuthenticated, updateCompany);

export default router;
