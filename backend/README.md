---

# ⚓ FuelEU Maritime Compliance – Backend

## 📘 Overview

This backend implements the *FuelEU Maritime Regulation (EU) 2023/1805* logic for ships’ emission compliance — handling *routes, **compliance balance (CB)* calculations, *banking* of surplus credits, and *pooling* between ships.

It follows a *Hexagonal (Ports & Adapters)* architecture to keep domain logic clean and independent of frameworks.

---

## 🧩 Tech Stack

- *Language:* TypeScript  
- *Runtime:* Node.js  
- *Framework:* Express.js  
- *ORM:* Prisma  
- *Database:* PostgreSQL (Supabase)  
- *Architecture:* Hexagonal / Clean Architecture  

---

## 🏗 Folder Structure

backend/ ├── prisma/ │   ├── schema.prisma          # DB schema │   ├── seed.ts                # Seed data for routes ├── src/ │   ├── core/ │   │   ├── application/       # Business logic │   │   │   ├── complianceService.ts │   │   │   ├── bankingService.ts │   │   │   └── poolingService.ts │   │   └── domain/            # Entities / core types │   └── adapters/ │       └── inbound/http/      # Controllers for endpoints │           ├── routeController.ts │           ├── complianceController.ts │           ├── bankingController.ts │           └── poolingController.ts │   └── infrastructure/ │       ├── db/prismaClient.ts │       └── server/index.ts ├── package.json └── README.md

---

## ⚙ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/fuel-eu-compliance.git
cd backend

2️⃣ Install dependencies

npm install

3️⃣ Configure environment variables

Create a .env file in backend/:

DATABASE_URL="postgresql://postgres:<password>@<host>:5432/postgres"

4️⃣ Push schema & seed data

npx prisma db push
npx ts-node prisma/seed.ts

5️⃣ Start the development server

npm run dev

Your server will run on http://localhost:7777


---

🔗 API Endpoints

🚢 Routes

Method	Endpoint	Description

GET	/routes	Get all routes
POST	/routes/:routeId/baseline	Set a route as baseline
GET	/routes/comparison	Compare baseline vs other routes



---

🧮 Compliance

Method	Endpoint	Description

GET	/compliance/cb?year=2024	Calculate & store compliance balance for all routes
GET	/compliance/adjusted-cb?year=2024	Get CBs adjusted after pooling



---

🏦 Banking

Method	Endpoint	Request Body	Description

POST	/banking/bank	{ shipId, year }	Bank a ship’s surplus CB
POST	/banking/apply	{ shipId, year, amount }	Apply banked CB to offset deficit



---

⚖ Pooling

Method	Endpoint	Request Body	Description

POST	/pools	{ "year": 2024, "members": ["R001", "R002", "R003"] }	Create a pool across ships
GET	/compliance/adjusted-cb?year=2024	—	View CB after pooling



---

🧠 Core Formula

TARGET_INTENSITY = 89.3368 // gCO₂e/MJ
ENERGY_IN_SCOPE = fuelConsumption * 41000 // MJ
COMPLIANCE_BALANCE = (TARGET_INTENSITY - ghgIntensity) * ENERGY_IN_SCOPE

Positive CB → Surplus (can be banked or pooled)

Negative CB → Deficit (can be offset using banked credits)



---

✅ Example Workflow (Postman)

1️⃣ GET /routes → view all routes
2️⃣ GET /compliance/cb?year=2024 → calculate CB for all
3️⃣ POST /banking/bank → bank surplus
4️⃣ POST /pools → create pooling group
5️⃣ GET /compliance/adjusted-cb?year=2024 → verify final CBs


---

🧪 Testing

You can test APIs using Postman or Thunder Client.

To open your database visually:

npx prisma studio

This opens a web UI to inspect tables and records.


---

🧱 Architecture Summary

Core Layer: business logic, calculations, validations

Adapters Layer: Express controllers mapping HTTP → use-cases

Infrastructure Layer: Prisma DB access & Express server setup

Ports: abstract communication between layers


This structure allows independent testing, easy scaling, and clear separation of concerns.


---

🚀 Future Enhancements

Add authentication for ship operators

Add logging & caching layers

Add unit tests (Jest) for use-cases

Integrate frontend dashboard with charts



---

👨‍💻 Author

Mohammad Aamir
Full-Stack Developer | Node.js | React | TypeScript


---