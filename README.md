# 🦆 DeccanVault

DeccanVault is a **self-hosted object storage service** inspired by cloud storage solutions, but lightweight and easy to run on your own infrastructure.  
It is built with **Node.js + Nitro** and designed for developers who want full control over their data without depending on third-party providers.

## ✨ Features (Planned & In Progress)

- 📦 **Buckets**: Organize your data into logical containers
- 📂 **Object Storage**: Store, retrieve, and delete files with simple APIs
- 🛠️ **S3-like REST Endpoints** (but simpler & fully open-source)
- ⚡ **Lightweight**: Runs anywhere Node.js runs (local machine, VPS, Docker, k8s)
- 🔒 **Customizable**: Extend with middleware, authentication, or logging

## 📌 Why DeccanVault?

- You want a **private alternative** to S3 for small projects or local dev
- You’re learning how object storage systems are built under the hood
- You want to run your own storage service on **local hardware** or **cloud VMs**
- You like ducks 🦆 (and Hyderabad-inspired names 😉)

## 🚀 Installation

### 1. Clone the repository

### 2. Install dependencies

```bash
pnpm install
```

### 3. Run the development server

```bash
pnpm run dev
```

The service will be available at:

```
http://localhost:3000
```

## 🧪 Quick Test

```bash
curl http://localhost:3000/health
```

Expected response

```json
{ "status": "ok", "service": "DeccanVault" }
```

## 📂 Project Structure

```
deccan-vault/
├── server/
│   ├── middleware/          # Global middleware (e.g., error handling, logging)
│   ├── routes/              # REST API endpoints
│   └── utils/               # Utilities (custom errors, helpers)
├── .gitignore
├── package.json
└── README.md
```

## 🎯 Roadmap

- [x] Phase 0 → Scaffold project, error handling, health check
- [ ] Phase 1 → Implement Bucket CRUD (create, list, delete buckets)
- [ ] Phase 2 → Implement Object CRUD (upload, fetch, delete files)
- [ ] Phase 3 → Add metadata, policies, and authentication
- [ ] Phase 4 → Optional dashboard UI
