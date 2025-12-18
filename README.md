# ShopEasy - Production Grade E-commerce Application

Built with **Spring Boot** (Backend) and **React.js** (Frontend).
Includes **Razorpay** for payments and **Delhivery** for logistics.

## 🚀 Features
- **User Authentication**: JWT based login/register.
- **Product Catalog**: Browsing, Searching, Filtering.
- **Cart & Order**: Persistent database-backed cart.
- **Payments**: Integrated Razorpay for secure transactions.
- **Shipment**: Integrated Delhivery tracking (mocked for demo).

---

## 🛠️ Tech Stack
- **Backend**: Java 17, Spring Boot 3.2, Spring Security, Spring Data JPA.
- **Frontend**: React 18, Tailwind CSS, Axios, React Router.
- **Database**: MySQL 8.
- **DevOps**: Docker, Docker Compose.

---

## 🏃 How to Run Locally

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL Server

### Method 1: Docker (Easiest)
1. Ensure Docker Desktop is running.
2. Run:
   ```bash
   docker-compose up --build
   ```
3. Access Frontend: `http://localhost:3000`
4. Access Backend: `http://localhost:8080`

### Method 2: Manual Setup

#### 1. Database Setup
Create a MySQL database named `ecommerce_db`.
```sql
CREATE DATABASE ecommerce_db;
```

#### 2. Backend Setup
- Navigate to `backend/`.
- Open `src/main/resources/application.properties`.
- Update `spring.datasource.username` and `password`.
- Run:
  ```bash
  ./mvnw spring-boot:run
  ```
- **Alternative (Script)**:
  Use the provided script to run with Java 17:
  ```bash
  cd backend
  chmod +x run_backend.sh
  ./run_backend.sh
  ```

#### 3. Frontend Setup
- Navigate to `frontend/`.
- Install dependencies:
  ```bash
  npm install
  ```
- Start server:
  ```bash
  npm run dev
  ```
- Access at `http://localhost:5173`.

---

## 🌐 Deployment on VPS (Contabo/DigitalOcean)

1. **SSH into VPS**:
   ```bash
   ssh root@<your-vps-ip>
   ```

2. **Install Docker & Docker Compose**:
   ```bash
   apt update
   apt install docker.io docker-compose
   ```

3. **Clone Repo**:
   ```bash
   git clone <your-repo-url>
   cd ecommerce-project
   ```

4. **Run Application**:
   ```bash
   docker-compose up -d
   ```

5. **Nginx Proxy (Optional but Recommended)**:
   Point your domain to the VPS IP and configure Nginx to proxy port 3000 (Frontend) and 8080 (Backend).

---

## 🔄 User Flow (Step-by-Step)

1. **Register**: User signs up. JWT token is stored in LocalStorage.
2. **Browse**: User views `product-listing` page.
3. **Cart**: User clicks "Add to Cart". Backend `CartService` updates DB.
4. **Checkout**: User clicks "Proceed".
5. **Payment**:
   - Backend calls Razorpay to create Order ID.
   - Frontend opens Razorpay Modal.
   - User pays.
   - Razorpay returns `payment_id` and `signature`.
   - Frontend sends these to Backend `/verify`.
6. **Order Confirmation**: Backend verifies signature, updates Order status to `PAID`.
7. **Shipment**: Order logic triggers `DelhiveryService` to create tracking ID.
8. **History**: User sees order in `Order History`.

---

## ⚠️ Common Mistakes to Avoid
- **Razorpay Keys**: Ensure you use "Test Mode" keys for development. Hardcoded keys in git are bad practice (use ENV vars in production).
- **CORS**: If Frontend talks to Backend on different port, `@CrossOrigin` or Global CORS config is needed. (We configured SecurityConfig to allow public endpoints, but ensure CORS is enabled if split hosted).
- **JWT Expiry**: If token expires, the frontend `api.js` interceptor handles attaching it, but doesn't auto-refresh. User will need to login again.
