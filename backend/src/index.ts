import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import connectDB from './config/db';
import productRoutes from './routes/productRoutes';
import reviewRoutes from './routes/reviewRoutes';
import errorHandler from './middlewares/errorHandler';

connectDB();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());//Add especific client to ftch
app.use(express.json());

// serve static images
app.use('/images', express.static(path.join(__dirname, 'images')));

//Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Product API",
      version: "1.0.0",
      description: "API for managing products and reviews",
    },
    servers: [
      {
        url: `https://productreview-backend.onrender.com`, 
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            name: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            category: { type: "string" },
          },
          required: ["name", "price"],
        },
        Review: {
          type: "object",
          properties: {
            rating: { type: "number" },
            comment: { type: "string" },
          },
          required: ["rating", "comment"],
        },
      },
    },
  },
  apis: ["./dist/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/products',productRoutes);
app.use('/products',reviewRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});