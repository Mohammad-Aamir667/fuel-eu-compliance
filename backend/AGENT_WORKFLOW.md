
# AI Agent Workflow Log

## 🚀 Agents Used
- *ChatGPT (GPT-5)* — for architecture design, backend logic, Prisma schema, and explanation of project flow.
- *VS Code Inline AI (Copilot-style suggestions)* — to fix small syntax and TypeScript errors directly in the editor.
- *Prisma CLI Assistant* — for database schema generation and data push debugging.

---

## 🧩 Prompts & Outputs

### Example 1 – Understanding the Problem
*Prompt:*
> “Explain what the FuelEU Maritime compliance system does — what is CB, baseline, banking, pooling?”

*AI Output:*
- AI explained that CB (Compliance Balance) measures how much a ship’s GHG intensity differs from the target.  
- Positive = surplus, Negative = deficit.  
- Banking saves surplus for future, pooling allows ships to share CB.

*Validation:*
✅ Used this understanding to plan database schema and backend logic.

---

### Example 2 – Generating Prisma Schema
*Prompt:*
> “Create Prisma schema for routes, compliance balance, banking, and pooling according to FuelEU specs.”

*AI Output:*
AI generated a schema with models:  
Route, ShipCompliance, BankEntry, Pool, PoolMember.  

*Modifications I Made:*
- Renamed some columns to match company format (cbGco2eq, routeId, etc.)  
- Added @@unique([shipId, year]) manually.  
- Verified in Supabase before pushing schema.  

---

### Example 3 – Fixing Compilation & Typing Errors
*Action:*
Used VS Code’s inline AI to fix compile errors like:

Cannot find name 'process'. Try npm i --save-dev @types/node.

AI suggested the command, fixed imports, and resolved TypeScript types for Express and CORS.

*Validation:*
✅ Manually checked all imports and re-ran the server using npm run dev.

---

### Example 4 – Building Controller Logic
*Prompt:*
> “Write controller for compliance service with calculateCB and getCB endpoints.”

*AI Output:*
Generated express handlers that import business logic and expose /calculate and /records.

*Changes I Made:*
- Adjusted file paths for hexagonal structure.  
- Tested via Postman and confirmed DB updates.  

---

## ⚙ Validation & Testing
- Tested /routes and /compliance/cb endpoints via Postman.  
- Confirmed DB updates in Supabase.  
- Verified unique constraints and baseline flag worked correctly.

---

## 💡 Observations
| Area | Agent Helped | Agent Failed |
|------|---------------|--------------|
| Prisma Schema | Saved 1+ hour of manual work | Minor version confusion |
| Business Logic | Clear code generation | Needed manual cleanup |
| Type Errors | VS Code inline fixes were accurate | Sometimes duplicated imports |
| Architecture | ChatGPT explained hexagonal pattern clearly | Needed simplification for project scale |

---

## ✅ Best Practices Followed
- Used AI for *structure and debugging*, not copy-paste of entire files.  
- Always validated logic manually and ran commands locally.  
- Broke down prompts into smaller, testable chunks.  
- Followed clean architecture — Core (business) separated from Adapters (controllers).  

---

## 🧾 Summary
AI agents accelerated development significantly — especially for:
- Explaining unfamiliar patterns (hexagonal, clean architecture)
- Handling Prisma + PostgreSQL setup
- Debugging environment variable and TypeScript errors  

Manual review was done at every step to ensure correctness before pushing to GitHub.