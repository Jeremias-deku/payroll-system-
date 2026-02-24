import express from "express";
import * as AdminController from "../controllers/AdminController.js";

const router = express.Router();

// Admin authentication routes
router.post("/login", AdminController.loginAdmin);
router.post("/forgot-password", AdminController.forgotPassword);
router.post("/reset-password", AdminController.resetPassword);

export default router;
