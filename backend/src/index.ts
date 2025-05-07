import express from 'express';
import path from 'path';
import productRoutes from './routes/productRoutes';
import reviewRoutes from './routes/reviewRoutes';
import errorHandler from './middlewares/errorHandler';

const app = express();
const PORT = 3000;
app.use(express.json());

// serve static images
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/products',productRoutes);
app.use('/products',reviewRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});