import { Router } from "express";
import { BankingService } from "../../../core/application/bankingService";

const router = Router();

/**
 * 🔹 GET /banking/records?shipId=R001&year=2024
 * Fetch all banking records for a ship in a given year
 */
router.get("/records", async (req, res) => {
    try {
        const { shipId, year } = req.query;

        if (!shipId || !year) {
            return res.status(400).json({ error: "shipId and year are required" });
        }

        const records = await BankingService.getBankRecords(
            String(shipId),
            Number(year)
        );

        res.json(records);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * 🔹 POST /banking/bank
 * Body: { "shipId": "R001", "year": 2024, "amount": 50000 }
 * Bank surplus CB amount for a ship
 */
router.post("/bank", async (req, res) => {
    try {
        const { shipId, year, amount } = req.body;

        if (!shipId || !year || !amount) {
            return res.status(400).json({ error: "shipId, year, and amount required" });
        }

        const result = await BankingService.bankSurplus(
            String(shipId),
            Number(year),
            Number(amount)
        );

        res.json({ message: "Banked successfully ✅", result });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

/**
 * 🔹 POST /banking/apply
 * Body: { "shipId": "R001", "year": 2025, "amount": 20000 }
 * Apply banked credits to reduce deficit CB
 */
router.post("/apply", async (req, res) => {
    try {
        const { shipId, year, amount } = req.body;

        if (!shipId || !year || !amount) {
            return res.status(400).json({ error: "shipId, year, and amount required" });
        }

        const result = await BankingService.applyBanked(
            String(shipId),
            Number(year),
            Number(amount)
        );

        res.json({ message: "Applied successfully ✅", result });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

export default router;