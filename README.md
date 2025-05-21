# CS472-Final-Project-May-2025 – Product Review & Rating Platform

This is a full-stack project built for the CS472 course at Maharishi International University. It demonstrates the integration of various core concepts from the course by developing a Product Review and Rating Platform where users can browse products, search, filter by category, post reviews, and rate products.

---

## 🔗 Live Links

- **Frontend**: [https://productreview-frontend-0vsp.onrender.com/](https://productreview-frontend-0vsp.onrender.com/)
- **Backend**: [https://productreview-backend.onrender.com](https://productreview-backend.onrender.com)
- **GitHub**: [https://github.com/raldin14/productreview](https://github.com/raldin14/productreview)

---

## 📦 Project Structure

productreview/
├── frontend/ # React + TypeScript frontend
└── backend/ # Express + TypeScript backend

---

## 🧰 Tech Stack

### Frontend
- React (with TypeScript)
- React Router
- Context API
- Bootstrap
- Axios for HTTP requests
- Hosted on Render

### Backend
- Node.js with Express
- TypeScript
- MongoDB
- Swagger (OpenAPI 3.0) for API documentation
- Hosted on Render

---

## ✨ Features

### 🛍️ Products
- Store and manage product data in mongoDB productCatalogDB products.
- Fields: `id`, `name`, `description`, `category`, `price`, `dateAdded`, `averageRating`.
- For dev store is productCatalogDBDev
### 📝 Reviews
- Add, edit, and delete reviews per product.
- Each review includes: `id`, `productId`, `author`, `rating (1–5)`, `comment`, `date`.
- Stored in mongoDB productCatalogDB reviews.
- For dev store is productCatalogDBDev

### ⭐ Ratings
- Automatic computation and display of average rating per product.

---

## 🔌 API Endpoints

### Products
- `GET /products`: Paginated, sorted by `dateAdded`. Supports `page` and `category` query.
- `GET /products/search?q=`: Search products by name.

### Reviews
- `GET /products/:id/reviews`: Get all reviews for a product.
- `POST /products/:id/reviews`: Add a review.
- `PUT /products/:productId/reviews/:id`: Edit a review.
- `DELETE /products/:productId/reviews/:id`: Delete a review.

---

## 📄 API Documentation

Swagger docs available via backend deployment:
[https://productreview-backend.onrender.com/api-docs](https://productreview-backend.onrender.com/api-docs)

---

## ✅ Functional Requirements

- Fully typed code (frontend & backend)
- All components and API responses use TypeScript types/interfaces
- Form validations (client and server side)
- Responsive and clean UI
- Memoization with `useMemo`, `React.memo`, `useCallback`
- Proper error and loading state handling

---

## 🧪 How to Run Locally

### Prerequisites:
- Node.js and npm installed

### Steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/raldin14/productreview
   cd productreview
Install dependencies

Backend:

cd backend
add .env file information 
npm install
npm start

Frontend:

cd frontend
add .env file information 
npm install
npm run dev

Ensure proper format in JSON files to avoid backend crashes.

🏆 Bonus Features (Implemented)
✅ Swagger API documentation

✅ Backend hosted on Render

✅ Frontend hosted on Render

✅ AI integrated to generate a suggested comment.

✅ Database with mongoDB
