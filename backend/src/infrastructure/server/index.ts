import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { getAllRoutes, getComparison, setBaseline } from "../../adaptors/inbound/http/routeController";
import complianceRouter from "../../adaptors/inbound/http/complianceController";
import bankingRouter from "../../adaptors/inbound/http/bankingController";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.get("/routes", getAllRoutes);
app.post("/routes/:id/baseline", setBaseline);
app.get("/routes/comparison", getComparison);
app.use("/compliance", complianceRouter);
app.use("/banking", bankingRouter);

app.get("/", (req, res) => {
    res.send("FuelEU Compliance API is live 🚀");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

