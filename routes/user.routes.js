import express from "express";
import { register } from "../controllers/userController";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile/update").put(isAuthenticated, updateProfile);
router.route("/logout").post(logout);
export default router;  
