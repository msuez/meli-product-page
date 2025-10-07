# 🏃‍♂️ Run Guide

This guide explains how to run and test the project, either via Docker (recommended) or manually on your local machine.

## 🚀 Option 1 – Run with Docker (recommended)

Make sure you have Docker and Docker Compose installed.

```bash
docker-compose up --build
```

This command will build and start both the API and Web services using Docker.

Once both services are running, you can access the application at:

- 🌐 Web App: `http://localhost:3000`
- ⚙️ API: `http://localhost:4000`
- 📄 API Docs: `http://localhost:4000/docs`

To stop the containers:

```bash
docker-compose down
```

## 🧩 Option 2 – Run locally (manual setup)

🧠 Backend (API)

```bash
cd api
npm install
npm run dev
# API runs at http://localhost:4000
# API Docs at http://localhost:4000/docs
```

💻 Frontend (Web)

```bash
cd web
npm install
npm run dev
# Web runs at http://localhost:3000
```

## 🧪 Running Tests

⚙️ Backend (API) Tests

```bash
cd api

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

💻 Frontend (Web) Tests

```bash
cd web

# Run all unit tests
npm run test

# Run unit tests in watch mode
npm run test:unit:watch

# Run unit tests with coverage
npm run test:coverage

# Run tests with Playwright
npx playwright install --with-deps   # first time only
npm run test:e2e
```

## ✅ Summary

| Environment               | Command                     | Description                                                             |
| :------------------------ | :-------------------------- | :---------------------------------------------------------------------- |
| 🐳 **Docker**             | `docker-compose up --build` | Run both API and Web in containers                                      |
| ⚙️ **API (Backend)**      | `npm run dev`               | Start API locally at [http://localhost:4000](http://localhost:4000)     |
| 💻 **Web (Frontend)**     | `npm run dev`               | Start Web app locally at [http://localhost:3000](http://localhost:3000) |
| 🧪 **Tests (Unit)**       | `npm run test`              | Run all Jest unit tests                                                 |
| 👀 **Tests (Watch Mode)** | `npm run test:watch`        | Run tests continuously while editing code                               |
| 📊 **Tests (Coverage)**   | `npm run test:coverage`     | Generate coverage report                                                |
| 🌍 **End-to-End (E2E)**   | `npm run test:e2e`          | Run Playwright integration tests                                        |

## 💬 Final note

This setup provides a fully isolated development environment (via Docker) and a lightweight local mode for debugging and fast iteration.

All services, tests, and coverage tools are preconfigured to work out of the box.

Feel free to reach out if you have any questions or need further assistance!

## 🧑‍💻 Author

**Matías Suez**  
📧 [matisuez.com](https://matisuez.com)
