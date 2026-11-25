import express from "express";
import controller from "../controllers/projectController.js";
import { protect, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Logged-in users can view projects
router.get("/", protect, controller.getAll);
router.get("/:id", protect, controller.getById);

// Only administrators can modify projects
router.post("/", protect, requireAdmin, controller.create);
router.put("/:id", protect, requireAdmin, controller.update);
router.delete("/:id", protect, requireAdmin, controller.deleteById);
router.delete("/", protect, requireAdmin, controller.deleteAll);

export default router;