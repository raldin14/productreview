import { Request, Response, NextFunction } from "express";
import path from 'path';
import { v4 as uuidv4} from 'uuid';
import { readJSON, writeJSON } from "../utils/fileHandler";
import { Review } from "../models/Review";
import { Product } from "../models/Product";

const reviewPath = path.join(__dirname, '../data/reviews.json');
const productPath = path.join(__dirname, '../data/products.json');

const updateAverageRating =async (productId:string) => {
    const reviews: Review[] = await readJSON(reviewPath);
    const products: Product[] = await readJSON(productPath);
    const product = products.find(p => p.id === productId);
    if(!product) return;
    const relevant = reviews.filter( r => r.productId === productId);
    product.averageRating = relevant.reduce((sum, r) => sum + r.rating, 0)/ (relevant.length || 1);
    await writeJSON(productPath, products);
}

export const getProductReviews =async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviews: Review[] = await readJSON(reviewPath);
        const productReviews = reviews.filter(r => r.productId === req.params.id);
        res.json(productReviews);
    } catch (error) {
        next(error);
    }
}