import express from "express";
import controller from "../controllers/userController.js";
import { protect, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Only administrators can view user accounts
router.get("/", protect, requireAdmin, controller.getAll);
router.get("/:id", protect, requireAdmin, controller.getById);

export default router;