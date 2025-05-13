# productreview
# 🛍️ Product Review & Rating Platform (Backend)

This is a full-featured backend API for a Product Review & Rating platform built with **Node.js**, **Express**, and **TypeScript**. It allows users to browse products, search/filter them, and create/edit/delete product reviews. Data is stored using local JSON files (no database needed).

---

## 📦 Features

- 🗂 Paginated product listing (10 per page)
- 🔎 Product search by name
- 🏷 Filter products by category
- 📝 CRUD operations for reviews
- ⭐ Automatic average rating calculation per product
- 📁 Data persistence using `products.json` and `reviews.json`
- ✅ Robust validation and error handling

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/product-review-api.git
cd product-review-api

2. Install Dependencies
bash
Copy
Edit
npm install
3. Run the Development Server
bash
Copy
Edit
npm run dev
The server will run at http://localhost:3000.

📁 Project Structure
graphql
Copy
Edit
product-review-api/
├── src/
│   ├── controllers/      # Business logic (product + review)
│   ├── data/             # JSON data files (products, reviews)
│   ├── models/           # TypeScript interfaces
│   ├── routes/           # API route definitions
│   ├── utils/            # File read/write helpers
│   └── app.ts            # Express server entry point
├── package.json
├── tsconfig.json
└── README.md
🧪 API Endpoints
📦 Products
Method	Endpoint	Description
GET	/api/products	List all products (with page and category filters)
GET	/api/products/search?q=...	Search products by name
POST	/api/products	Add a new product
PUT	/api/products/:id	Update an existing product
DELETE	/api/products/:id	Delete a product

📝 Reviews
Method	Endpoint	Description
GET	/api/products/:id/reviews	Get all reviews for product
POST	/api/products/:id/reviews	Add a review
PUT	/api/products/:productId/reviews/:reviewId	Edit a review
DELETE	/api/products/:productId/reviews/:reviewId	Delete a review

🧰 Scripts
Command	Description
npm run dev	Run with nodemon (development)
npm run build	Compile TypeScript
npm start	Run compiled JS (production)

🔧 Configuration
tsconfig.json
This project uses modern JavaScript targets and strict typing:

json
Copy
Edit
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  }
}
📂 Data Files
src/data/products.json – Contains product objects with fields:

id, name, description, category, price, dateAdded, averageRating, imagePath

src/data/reviews.json – Contains review objects:

id, productId, author, rating, comment, date

Both files must exist and be initialized with [] if empty.

✅ Example Product Entry
json
Copy
Edit
{
  "id": "1",
  "name": "Wireless Headphones",
  "description": "High quality wireless headphones",
  "category": "Electronics",
  "price": 99.99,
  "dateAdded": "2024-05-06T00:00:00Z",
  "averageRating": 4.5,
  "imagePath": "/images/headphones.png"
}
