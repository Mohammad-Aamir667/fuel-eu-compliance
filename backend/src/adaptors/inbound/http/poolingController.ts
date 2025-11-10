import { Router } from "express";
import { PoolingService } from "../../../core/application/poolingService";

const router = Router();

/**
 * 🔹 GET /compliance/adjusted-cb?year=2025
 * Returns adjusted CBs for a given year
 */
router.get("/compliance/adjusted-cb", async (req, res) => {
    try {
        const { year } = req.query;

        if (!year) {
            return res.status(400).json({ error: "Year is required" });
        }

        const data = await PoolingService.getAdjustedCBs(Number(year));
        res.json(data);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

/**
 * 🔹 POST /pools
 * Body: { "year": 2025, "members": ["R001", "R002", "R003"] }
 * Creates a pool and adjusts CB among members
 */
router.post("/pools", async (req, res) => {
    try {
        const { year, members } = req.body;

        if (!year || !members || !Array.isArray(members)) {
            return res.status(400).json({ error: "Year and members[] are required" });
        }

        const result = await PoolingService.createPool(Number(year), members);
        res.json({ message: "Pool created successfully ✅", result });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

export default router;