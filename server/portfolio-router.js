import express from "express";
import portfolio from "./portfolio-router.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const items = await portfolio.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const item = await portfolio.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }

        res.json(item);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/", async (req, res) => {
    try {
        const Item = await portfolio.create(req.body);
        
        res.status(201).json(Item);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedItem = await portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedItem) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedItem = await portfolio.findByIdAndDelete(req.params.id);

        if (!deletedItem) {
            return res.status(404).json({ error: "Item not found" });
        }

        res.json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;