# EzzzMoney 💸

A fullstack personal finance management application built with a Spring Boot + React/TypeScript stack. Track your income and expenses, manage recurring bills, set budget limits per category, and receive real-time alerts when your finances need attention.

---

## Features

### Overview Dashboard
- **Financial Health Score** — a composite score ring computed from savings rate, budget adherence, and bill status
- **Cash Flow Summary** — monthly income vs. expenses with net balance
- **Budget Tracker** — per-category spending bars computed from real transactions; limits are editable and persisted
- **Income vs. Expenses Chart** — monthly bar chart visualization via Recharts
- **Recent Transactions** — quick view of the last five records

### Records
- Add, view, and delete income and expense entries
- Assign each expense to a budget category; income entries are auto-categorized
- Filter transactions by category

### Bills
- Track recurring and one-time bills with due dates and categories
- Status automatically computed: **Overdue**, **Due Soon** (within 7 days), **Upcoming**, **Paid**
- Mark bills as paid, edit details, or delete
- Summary counts and total unpaid amount shown at a glance

### Alerts
- Real-time alert feed generated from live financial data:
  - Budget category exceeded or approaching limit
  - Large individual expenses above a configurable threshold
  - Monthly expenses exceeding income
  - Overdue or due-soon bills
  - Recent income received (info level)
- **Configurable thresholds** — budget warning percentage, large-transaction amount, and per-alert-type toggles are saved to the backend and persist across sessions
- Dismiss individual alerts; severity levels: critical, warning, info

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Recharts, Axios, React Router |
| Backend | Spring Boot 4.0.5, Java 17, Spring Data JPA |
| Database | H2 (in-memory) |
| Build | npm, Maven |

---

## Prerequisites

| Tool | Version |
|---|---|
| Java (Zulu JDK recommended) | 17 LTS |
| Maven | 3.9.x |
| Node.js | 25.x |
| npm | 11.x |

Verify your installations:
```bash
java -version
mvn -v
node -v
npm -v
```

Download links:
- [Java 17 (Zulu)](https://www.azul.com/downloads/?version=java-17-lts&package=jdk#zulu)
- [Maven](https://maven.apache.org/download.cgi)
- [Node.js](https://nodejs.org/en/download)

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd ezzzz-money
```

For the latest in-development code, check out the `staging` branch:
```bash
git checkout staging
```

### 2. Install frontend dependencies

```bash
cd ezzzzmoney-frontend
npm install
```

### 3. Run both services

**macOS / Linux:**
```bash
./scripts/up.bash
```

**Windows (PowerShell):**
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser  # first time only
./scripts/up.ps1
```

The script starts both the Spring Boot backend and the React dev server. Once ready:

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8080 |
| H2 Console | http://localhost:8080/h2-console |

Press `Ctrl + C` to stop all services.

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Authenticate a user |
| `GET` | `/api/expenses/user/{userId}` | Get all transactions for a user |
| `POST` | `/api/expenses/user/{userId}` | Create a new transaction |
| `PUT` | `/api/expenses/{id}` | Update a transaction |
| `DELETE` | `/api/expenses/{id}` | Delete a transaction |
| `GET` | `/api/bills/user/{userId}` | Get all bills for a user |
| `POST` | `/api/bills/user/{userId}` | Create a new bill |
| `PUT` | `/api/bills/{id}` | Update a bill |
| `DELETE` | `/api/bills/{id}` | Delete a bill |
| `GET` | `/api/budgets/user/{userId}` | Get budget categories for a user |
| `POST` | `/api/budgets/user/{userId}` | Create a budget category |
| `PUT` | `/api/budgets/{id}` | Update a budget category |
| `DELETE` | `/api/budgets/{id}` | Delete a budget category |
| `GET` | `/api/alert-settings/user/{userId}` | Get alert settings for a user |
| `PUT` | `/api/alert-settings/user/{userId}` | Update alert settings |

---

## Project Structure

```
ezzzz-money/
├── ezzzzmoney-frontend/        # React/TypeScript app
│   └── src/
│       ├── Api.tsx             # Axios service layer
│       ├── App.tsx             # Routing
│       ├── Login.tsx           # Authentication page
│       └── Dashboard.tsx       # Main app (all tabs)
├── ezzzzmoney-spring-backend/  # Spring Boot app
│   └── src/main/java/.../
│       ├── models/             # JPA entities
│       ├── repositories/       # Spring Data repositories
│       ├── services/           # Business logic
│       └── controllers/        # REST controllers
├── scripts/
│   ├── up.bash                 # macOS/Linux startup script
│   └── up.ps1                  # Windows startup script
└── docs/
    └── project_setup_instructions.md
```

---

## Notes

- The H2 database is **in-memory** — all data is lost when the backend restarts. This is intentional for the prototype stage.
- The frontend proxies API requests to `http://localhost:8080` via the `proxy` field in `package.json`, so no CORS configuration is needed during development.
- JPA `ddl-auto=create` recreates all tables on each backend startup; no migration scripts are required.
