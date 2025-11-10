import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { getAllRoutes, getComparison, setBaseline } from "../../adaptors/inbound/http/routeController";
import complianceRouter from "../../adaptors/inbound/http/complianceController";



dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.get("/routes", getAllRoutes);
app.post("/routes/:id/baseline", setBaseline);
app.get("/routes/comparison", getComparison);
app.use("/compliance", complianceRouter);

app.get("/", (req, res) => {
    res.send("FuelEU Compliance API is live 🚀");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

