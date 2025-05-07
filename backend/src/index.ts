import express from 'express';
import path from 'path';


const app = express();
const PORT = 3000;
app.use(express.json());

// serve static images
app.use('/images', express.static(path.join(__dirname, 'images')));

// app.use('/products');
// app.use('/products');

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});