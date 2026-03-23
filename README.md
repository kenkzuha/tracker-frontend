# Chainfolio (Frontend)

An open source crypto & stock portfolio tracker built with Angular and NestJS.

![License](https://img.shields.io/badge/license-MIT-green)
![Angular](https://img.shields.io/badge/Angular-21-red)
![NestJS](https://img.shields.io/badge/NestJS-latest-red)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-latest-blue)

---

## Tech Stack

**Frontend**
- Angular 21
- Angular Material
- TypeScript

**Backend**
- NestJS
- TypeORM
- PostgreSQL
- JWT Authentication
- Yahoo Finance API (via `yahoo-finance2`)

---

## Features

- User authentication (signup, login, logout) with JWT
- Dark / light theme toggle
- Portfolio overview (total value, profit/loss)
- Holdings table with live prices
- Price chart
- Recent transactions
- Support for Indonesian stocks (IDX), US stocks, and crypto

---

## Project Structure

```
chainfolio/
├── tracker-frontend/         # Angular app
   └── src/app/
       ├── core/             # Guards, interceptors
       │   ├── auth.guard.ts
       │   └── auth.interceptor.ts
       ├── auth/             # Auth feature
       │   ├── login/
       │   ├── signup/
       │   └── auth.service.ts
       ├── dashboard/        # Dashboard feature
       │   └── components/
       │       ├── sidebar/
       │       ├── topbar/
       │       └── stat-card/
       └── home/             # Landing page
```

---

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL
- npm

---

### Backend Setup

> Please check [Backend Repository](https://github.com/kenkzuha/tracker-backend) for setup details.

---

### Frontend Setup
> Clone this Repository first

```bash
cd tracker-frontend
npm install
npm start
```

Frontend runs on `http://localhost:4200`

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Register a new user |
| POST | `/auth/login` | Login and receive JWT token |

### Prices
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/prices/quote/:symbol` | Get single asset price |
| GET | `/prices/quotes?symbols=` | Get multiple prices |
| GET | `/prices/search?q=` | Search for a symbol |
| GET | `/prices/chart/:symbol?range=` | Get chart data |

### Symbol Formats
```
Crypto        →  BTC-USD, ETH-USD, SOL-USD
US Stocks     →  AAPL, TSLA, GOOGL
IDX Stocks    →  BBCA.JK, TLKM.JK, GOTO.JK
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Database url |
| `JWT_TOKEN` | Secret key for JWT signing |

---

## Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a new branch
```bash
git checkout -b feature/your-feature-name
```
3. Make your changes and commit
```bash
git commit -m "feat: add your feature"
```
4. Push to your branch
```bash
git push origin feature/your-feature-name
```
5. Open a Pull Request

---

## Status

This project is currently in development.

- [x] Authentication (signup, login, logout)
- [x] Landing page
- [x] Dashboard shell (sidebar, topbar, stat cards)
- [ ] Portfolio CRUD
- [ ] Holdings table with live prices
- [ ] Price chart
- [ ] Transactions
- [ ] Markets page
- [ ] Profile & Settings

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

*Built by kenkzuha*