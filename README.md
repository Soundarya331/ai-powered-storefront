# NovaStore — AI-Powered E-Commerce Platform

A full-stack AI-powered e-commerce storefront featuring Google Sign-In, Stripe Checkout, role-based access control, and a LangChain product support assistant.

---

## 📦 Project Structure

```
hydra-curls-ai-commerce/
├── assessment-2/               # Main application (NovaStore)
│   ├── backend/                # FastAPI Python backend
│   │   ├── app/
│   │   │   ├── agent/          # LangChain AI support agent
│   │   │   ├── routers/        # API route handlers
│   │   │   ├── services/       # Business logic layer
│   │   │   ├── main.py         # FastAPI app entry point
│   │   │   ├── models.py       # SQLAlchemy ORM models
│   │   │   ├── schemas.py      # Pydantic request/response schemas
│   │   │   ├── auth.py         # JWT & Google OAuth verification
│   │   │   ├── database.py     # SQLAlchemy engine & session
│   │   │   ├── config.py       # Environment settings
│   │   │   └── seed_data.py    # Product catalog seeder
│   │   ├── test_backend.py     # Pytest test suite
│   │   └── requirements.txt    # Python dependencies
│   ├── frontend/               # React + TypeScript storefront
│   │   ├── src/
│   │   │   ├── components/     # UI components (shadcn/ui + custom)
│   │   │   ├── context/        # React context providers
│   │   │   ├── services/       # API client calls
│   │   │   ├── lib/            # Utility helpers
│   │   │   ├── types.ts        # Shared TypeScript types
│   │   │   └── App.tsx         # Root component & routing
│   │   ├── tests/              # Playwright end-to-end tests
│   │   └── package.json
│   ├── docs/                   # Architecture & design documentation
│   │   ├── api_documentation.md
│   │   ├── database_schema.md
│   │   ├── system_design.md
│   │   └── scaling_strategy.md
│   ├── Dockerfile              # Multi-stage Docker build
│   └── render.yaml             # Render Blueprint for deployment
```

---

## 🛠️ Tech Stack

### Backend

| Technology | Version | Purpose |
|---|---|---|
| **Python** | 3.11+ / 3.13 | Core language |
| **FastAPI** | ≥0.115 | REST API framework with async support |
| **Uvicorn** | ≥0.30 | ASGI server |
| **SQLAlchemy** | ≥2.0 | ORM & database abstraction layer |
| **Pydantic v2** | ≥2.8 | Data validation and settings management |
| **PostgreSQL** | 15+ | Primary relational database |
| **psycopg3** | ≥3.2 | Async PostgreSQL driver |
| **python-jose** | ≥3.3 | JWT creation and verification |
| **google-auth** | ≥2.30 | Server-side Google ID token verification |
| **Stripe Python SDK** | ≥10 | Stripe Checkout session & webhook handling |
| **LangChain Core** | ≥1 | AI agent orchestration framework |
| **langchain-openai** | ≥1 | OpenAI LLM integration for LangChain |
| **OpenAI** | GPT-4o-mini (default) | Large language model for AI support |
| **httpx** | ≥0.27 | Async HTTP client |
| **python-dotenv** | ≥1 | Environment variable loading |
| **pytest** | ≥8 | Testing framework |

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| **React** | ^18.3 | UI component library |
| **TypeScript** | ^5.5 | Type-safe JavaScript |
| **Vite** | ^7.3 | Build tool and dev server |
| **Tailwind CSS** | ^3.4 | Utility-first CSS framework |
| **shadcn/ui** | — | Accessible, composable UI components |
| **Radix UI** | ^1.3 | Headless UI primitives |
| **Lucide React** | ^0.428 | Icon library |
| **PostCSS** | ^8.4 | CSS transformation |
| **Playwright** | ^1.63 | End-to-end testing framework |

### Infrastructure & DevOps

| Technology | Purpose |
|---|---|
| **Docker** | Multi-stage containerization (Node → Python image) |
| **Render** | Cloud deployment platform (free tier, Singapore region) |
| **PostgreSQL on Render** | Managed database |
| **Google Cloud Console** | OAuth 2.0 Web client configuration |
| **Stripe** | Payment processing (test mode & webhooks) |

---

## ⚙️ How It Works

### Authentication Flow

1. The user clicks **Sign in with Google** on the frontend.
2. Google Identity Services returns a signed **ID token** to the browser.
3. The browser posts the ID token to `POST /api/auth/google`.
4. FastAPI calls **google-auth** to verify the token's signature, audience, expiry, and `email_verified` flag — server-side.
5. If the user's email is in the `ADMIN_EMAILS` allowlist, the role is set to `admin`; otherwise `customer`.
6. FastAPI returns a short-lived **JWT** (containing only the user ID) signed with `SECRET_KEY`.
7. Every subsequent API request carries this JWT as a `Bearer` token. The server reloads the full user record from PostgreSQL on every request — roles are never stored in the token.

### Product Catalog

- Products are seeded at startup via `seed_data.py` (idempotent — runs only when the catalog is empty).
- The database enforces constraints: `price_cents >= 50` and `stock_quantity >= 0`.
- Admins can create, update, and deactivate products via `POST/PATCH /api/products`.
- Customers see only active (`is_active=True`) products.

### Shopping Cart & Checkout

1. The cart is held in **React state / context** on the frontend.
2. On checkout, the frontend calls `POST /api/checkout/session` with the cart contents.
3. FastAPI:
   - Aggregates duplicate cart rows.
   - Reserves inventory with **conditional database updates** in the same transaction as order creation (preventing oversell).
   - Creates a **Stripe Checkout Session** and returns its URL.
4. If Stripe session creation fails, the transaction is **rolled back** and inventory is restored.
5. The user is redirected to the Stripe-hosted checkout page.

### Payment Confirmation

- **Success path:** Stripe redirects to `/checkout/success`. FastAPI calls `stripe.checkout.Session.retrieve` to confirm the session is `complete` and `paid`, matching session ID, amount, currency, and test-mode state. The order is marked `paid`.
- **Webhook path:** Stripe fires events (`checkout.session.completed`, `checkout.session.expired`, `payment_intent.payment_failed`) to `POST /api/webhooks/stripe`. FastAPI verifies the webhook signature and processes idempotently using the `stripe_events` table (deduplication by event ID). Admins cannot manually flip an unpaid order to paid.
- **Inventory release:** Stock is only released back when Stripe confirms session expiry.

### AI Support Assistant

The support assistant lives in `backend/app/agent/support_agent.py` and operates in two modes:

#### LLM Mode (requires `OPENAI_API_KEY`)

- Powered by **LangChain** with **GPT-4o-mini**.
- Exposes three **LangChain tools** to the model:

  | Tool | Description |
  |---|---|
  | `get_product_price` | Fetches current price and stock for a product by name |
  | `list_available_products` | Lists up to 10 in-stock products, optionally by category |
  | `get_order_status` | Returns the authenticated user's recent orders |

- Tools are **scoped to the authenticated account** — the agent can never access another user's orders regardless of what the user message says.
- Runs a **tool-call loop** (up to 3 iterations, 4 tool calls per turn) to fulfill requests.
- Keeps last 6 conversation turns for context.
- On OpenAI errors, logs type/status/code only (no customer data) and returns HTTP 503.

#### Basic Mode (no API key required)

- Keyword-based routing: detects intent (order status, pricing, catalog) via regex and direct keyword matching.
- Calls the same LangChain tools directly — returns real database-backed data.
- Clearly labeled in the UI as basic mode.

### Role-Based Access Control (RBAC)

| Role | Permissions |
|---|---|
| **customer** | Browse catalog, manage own cart, place orders, view own orders, use AI support |
| **admin** | All customer permissions + create/update/deactivate products, view all orders, update order status |

- Roles are assigned server-side based on `ADMIN_EMAILS`; never client-controlled.
- Customer order APIs enforce **account ownership** — a customer cannot access another user's orders.

### Database Schema

Five tables with SQLAlchemy ORM:

| Table | Key Columns |
|---|---|
| **users** | `id`, `email`, `full_name`, `avatar_url`, `role`, `created_at` |
| **products** | `id`, `title`, `description`, `category`, `price_cents`, `stock_quantity`, `image_url`, `is_active`, timestamps |
| **orders** | `id`, `user_id` (FK), `total_amount_cents`, `status`, `stripe_session_id`, `stripe_payment_intent_id`, `paid_at`, `payment_error`, `customer_email`, timestamps |
| **order_items** | `id`, `order_id` (FK), `product_id` (FK), `product_title`, `unit_price_cents`, `quantity` |
| **stripe_events** | `event_id` (unique), `event_type`, `received_at` |

Additive migrations (for `paid_at` and `payment_error` columns) run automatically at startup via `ALTER TABLE` introspection — no migration tool required.

---

## 🚀 Running Locally

**Prerequisites:** Python 3.11+, Node.js 20.19+ (or 22.12+), PostgreSQL 15+.

### 1. Database Setup

Create a PostgreSQL database named `novastore`:

```sql
CREATE DATABASE novastore;
```

Copy the backend environment file and fill in your values:

```powershell
Copy-Item assessment-2/backend/.env.example assessment-2/backend/.env
```

Set `DATABASE_URL` (e.g., `postgresql+psycopg://user:pass@localhost/novastore`) and a fresh random `SECRET_KEY`.

### 2. Backend

```powershell
cd assessment-2/backend
py -3.13 -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

- FastAPI interactive docs: http://localhost:8000/docs
- At startup: schema is created, additive migration runs, product catalog is seeded.

### 3. Frontend

In a new terminal:

```powershell
cd assessment-2/frontend
npm ci
npm run dev
```

Open http://localhost:5173.

> **Note:** Catalog browsing and basic AI support work without provider credentials. Google Sign-In, Stripe Checkout, and LLM support each require their respective credentials (see below).

---

## 🔑 Provider Configuration

| Provider | Environment Variable | Notes |
|---|---|---|
| **Google OAuth** | `GOOGLE_CLIENT_ID` | Create an OAuth 2.0 Web client in Google Cloud Console. Add `http://localhost:5173` as an authorized JavaScript origin. |
| **Admin Access** | `ADMIN_EMAILS` | Comma-separated email allowlist. Users on this list receive the `admin` role on sign-in. |
| **Stripe** | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | Use `sk_test_` keys. Register webhook at `/api/webhooks/stripe` for `checkout.session.completed`, `checkout.session.expired`, and `payment_intent.payment_failed` events. |
| **OpenAI / LangChain** | `OPENAI_API_KEY`, `OPENAI_MODEL` | Keep the key server-side only — never expose to browser bundles. Defaults to `gpt-4o-mini`. |

---

## 🐳 Docker

The multi-stage `Dockerfile` in `assessment-2/`:

1. **Stage 1 (Node 22-alpine):** Builds the React/TypeScript frontend (`npm ci && npm run build`).
2. **Stage 2 (Python 3.13-slim):** Installs Python dependencies, copies the backend, and copies the frontend `dist/` from Stage 1.
3. The single container serves both the API and the static frontend from the same origin — simplifying CORS and cookie handling.

---

## ☁️ Deploying to Render (Free Tier)

1. Push this repository to GitHub.
2. In Render, select **New → Blueprint** and point it at your repository.
3. Set the Blueprint file path to `assessment-2/render.yaml`.
4. Render provisions a **PostgreSQL database** (`novastore-db`) and a **Docker web service** in Singapore automatically.
5. In the service's environment settings, enter: `GOOGLE_CLIENT_ID`, `ADMIN_EMAILS`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and optionally `OPENAI_API_KEY`.
6. Add your Render HTTPS origin to the Google OAuth authorized origins.
7. Register `https://YOUR-HOST.onrender.com/api/webhooks/stripe` in Stripe test-mode webhooks and paste the generated signing secret as `STRIPE_WEBHOOK_SECRET`.

> **Free tier note:** Render web services spin down after inactivity (first request may take ~1 min to wake). Free PostgreSQL expires after 30 days.

---

## 🧪 Testing

### Backend (pytest)

```powershell
cd assessment-2/backend
python -m pytest -q
```

Tests use an isolated **SQLite** database by default. Set `TEST_DATABASE_URL` to a PostgreSQL connection string to run the concurrent last-item oversell test.

### Frontend (Playwright)

```powershell
cd assessment-2/frontend
npm ci
npm run build     # Validate production build compiles cleanly
```

End-to-end Playwright tests are in `frontend/tests/`.

---

## 📄 Documentation

Extended design documentation is available in `assessment-2/docs/`:

- `api_documentation.md` — Full API reference with endpoints and request/response schemas
- `database_schema.md` — ER diagram and table definitions
- `system_design.md` — Architecture overview and component interactions
- `scaling_strategy.md` — Horizontal scaling, caching, and performance plans

---

## 🔒 Security Notes

- JWTs contain **only a user ID**; every request reloads the account and role from the database.
- Only server-configured `ADMIN_EMAILS` grant admin access — it cannot be escalated via the API.
- Invalid or expired bearer tokens are rejected with HTTP 401.
- Stripe webhook payloads are verified using the signing secret before any state mutation.
- Webhook event IDs are deduplicated in the `stripe_events` table — payment fulfillment is idempotent.
- The AI agent tools are scoped to the authenticated account; the model cannot access other users' data regardless of prompt content.
- Provider error details (API keys, customer content) are never logged or returned to the browser.

---

*AI tool disclosure: OpenAI Codex assisted with repository review, implementation, and tests.*
