# 🧪 TestAPI – Echo & Utilities

A lightweight API service + landing page for developers to **test frontend contracts** quickly.  
Login to get a **Bearer token**, send any JSON payload to `/api/echo`, and get the **same payload** back.

---

## ✨ Features
- 🔑 **JWT Authentication** (register → login → get token)  
- 📡 **Echo endpoint** – test payloads with Bearer token  
- 🌐 **Landing page** (React + Vite) – login & interactive echo tester  
- 📜 **OpenAPI spec** (`backend/openapi.yaml`)  
- 🐳 **Dockerfile** included for backend  

---

## 📂 Project Structure
testapi-echo/
├── backend/ # Express + TypeScript API
│ ├── src/ # routes, middleware, utils
│ ├── .env.example
│ └── openapi.yaml
├── frontend/ # Vite + React landing page
│ ├── src/
│ └── .env.example
└── README.md




---

## 🚀 Quick Start

### Backend
```bash
cd backend
npm install
cp .env.example .env   # set a strong JWT_SECRET
npm run dev            # http://localhost:3000/api/health
```
---


### Frontend
```bash
cd ../frontend
npm install
cp .env.example .env   # points to backend (default http://localhost:3000)
npm run dev            # http://localhost:5173
```

## 🔧 Usage Flow

Register a user → POST /auth/register

Login → POST /auth/login → receive JWT

Echo → POST /api/echo with header

```Authorization: Bearer <token>```


and any JSON body.

Receive same payload + metadata.


## 🌀 Example (cURL)
### Register
```
curl -sX POST http://localhost:3000/auth/register \
  -H 'content-type: application/json' \
  -d '{"email":"me@example.com","password":"secret"}'
```
### Login
```
TOKEN=$(curl -sX POST http://localhost:3000/auth/login \
  -H 'content-type: application/json' \
  -d '{"email":"me@example.com","password":"secret"}' | jq -r .token)
```
### Echo
```
curl -sX POST http://localhost:3000/api/echo \
  -H "authorization: Bearer $TOKEN" \
  -H 'content-type: application/json' \
  -d '{"hello":"world"}' | jq .
```


# 📖 API Reference (Core)

`POST /auth/register → create user`

`POST /auth/login → get bearer token`

`POST /api/echo → echoes payload (requires token)`

`GET /api/health → service status`

More utilities coming soon (`/status/:code`, `/delay/:ms`, `/headers`, etc.).
---

# 📌 Notes

⚠️ In-memory users only → replace with DB for production.

🔒 Add HTTPS, rate limiting, and CORS restrictions before public exposure.

🛠 Extend with more test routes for QA/dev workflows.

📜 License

MIT
 – free to use & extend.

 


