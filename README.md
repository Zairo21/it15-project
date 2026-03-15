# IT15/L — Final Project

# Project Structure

```
it15-project/
├── laravel-backend/     ← Laravel RESTful API
└── react-frontend/      ← React.js Application
```

---

# Technologies Used

| Layer | Technology | Version |
|---|---|---|
| Frontend | React.js | 18.x |
| Routing | React Router DOM | 6.x |
| HTTP Client | Axios | 1.x |
| Charts | Recharts | 2.x |
| Backend | Laravel | 10.x |
| Authentication | Laravel Sanctum | 3.x |
| Database | MySQL | 8.x |
| Weather API | OpenWeatherMap | 2.5 |

---

# Backend Setup

```bash
cd laravel-backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan serve
```

 Backend runs at: http://localhost:8000

---

# Frontend Setup

```bash
cd react-frontend
npm install
cp .env.example .env
# Add your OpenWeatherMap API key to .env
npm start
```

 Frontend runs at: http://localhost:3000

---

# Default Login

- *Email:* admin@um.edu.ph
- *Password:* password

---

# API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | /api/login | Login | No |
| POST | /api/logout | Logout | Yes |
| GET | /api/user | Get current user | Yes |
| GET | /api/dashboard/overview | Dashboard data | Yes |
| GET | /api/students | List students | Yes |
| GET | /api/students/stats | Student statistics | Yes |
| GET | /api/students/{id} | Get student | Yes |
| GET | /api/courses | List courses | Yes |
| GET | /api/courses/distribution | Course distribution | Yes |
| GET | /api/courses/{id} | Get course | Yes |

---

# Features

-  Secure login with Laravel Sanctum JWT tokens
-  Dashboard with Bar, Pie, and Line charts (Recharts)
-  500+ student records with search and pagination
-  20+ courses across 8 departments with enrollment tracking
-  Real-time weather with 5-day forecast (OpenWeatherMap)
-  Location-based weather via browser geolocation
-  Protected routes (redirect to login if unauthenticated)
-  Responsive design inspired by UM Portal


