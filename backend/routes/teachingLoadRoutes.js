import express from "express";
import * as TeachingLoadController from "../controllers/TeachingLoadController.js";

const router = express.Router();

// Initialize tables
router.post("/init", TeachingLoadController.initializeTables);

// Teaching Load CRUD routes
router.post("/", TeachingLoadController.createTeachingLoad);
router.get("/", TeachingLoadController.getAllTeachingLoads);
router.get("/teacher/:teacherId", TeachingLoadController.getTeacherTeachingLoad);
router.get("/:id", TeachingLoadController.getTeachingLoadById);
router.put("/:id", TeachingLoadController.updateTeachingLoad);
router.delete("/:id", TeachingLoadController.deleteTeachingLoad);

// Teaching Load Completion Workflow routes
router.patch("/:id/mark-done", TeachingLoadController.markTeachingLoadAsDone);
router.patch("/:id/approve", TeachingLoadController.approveTeachingLoad);
router.patch("/:id/disapprove", TeachingLoadController.disapproveTeachingLoad);

export default router;
