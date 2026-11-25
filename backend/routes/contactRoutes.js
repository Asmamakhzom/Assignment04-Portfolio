import express from "express";
import controller from "../controllers/contactController.js";
import { protect, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Only administrators can view submitted contacts
router.get("/", protect, requireAdmin, controller.getAll);
router.get("/:id", protect, requireAdmin, controller.getById);

// Visitors can submit the contact form
router.post("/", controller.create);

// Only administrators can update or delete contacts
router.put("/:id", protect, requireAdmin, controller.update);
router.delete("/:id", protect, requireAdmin, controller.deleteById);
router.delete("/", protect, requireAdmin, controller.deleteAll);

export default router;