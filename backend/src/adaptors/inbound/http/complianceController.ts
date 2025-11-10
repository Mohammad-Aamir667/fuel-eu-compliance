import { Router, Request, Response } from "express";
import { ComplianceService } from "../../../core/application/complianceService";

const router = Router();

// Calculate Compliance Balance for all routes in a given year
router.get("/cb", async (req: Request, res: Response) => {
    try {
        const year = parseInt(req.query.year as string);
        if (!year) return res.status(400).json({ error: "Year is required" });

        const results = await ComplianceService.calculateCB(year);
        res.json({ message: "Compliance balances calculated", results });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to calculate compliance balances" });
    }
});

// Get stored Compliance Balance records for a given year
router.get("/list", async (req: Request, res: Response) => {
    try {
        const year = parseInt(req.query.year as string);
        if (!year) return res.status(400).json({ error: "Year is required" });

        const records = await ComplianceService.getCB(year);
        res.json(records);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch compliance balances" });
    }
});

export default router;