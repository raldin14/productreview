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

export const addReview =async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {author, rating, comment} = req.body;
        if(!author || !rating || rating < 1 || rating > 5) res.status(400).json({error: 'Invalid input'});
        else{
            const reviews: Review[] = await readJSON(reviewPath);
            const newReview: Review = {
                id: uuidv4(),
                productId: req.params.id,
                author,
                rating,
                comment,
                date: new Date().toISOString(),
            };

            reviews.push(newReview);
            await writeJSON(reviewPath, reviews);
            await updateAverageRating(req.params.id);
            res.status(201).json(newReview);
        }
    } catch (error) {
        next(error);
    }
}

export const updateReview =async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {author, rating, comment } = req.body;
        const reviews: Review[] = await readJSON(reviewPath);
        const review = reviews.find(r => r.id === req.params.id && r.productId === req.params.productId);
        if(!review) res.status(404).json({error: 'Review not found'});
        else{
            if(author) review.author = author;
            if(rating) review.rating = rating;
            if(comment) review.comment = comment;
            review.date = new Date().toISOString();
            await writeJSON(reviewPath, reviews);
            await updateAverageRating(req.params.productId);
            res.json(review);
        }
    } catch (error) {
        next(error);
    }
}

export const deleteReview =async (req: Request, res: Response, next: NextFunction) => {
    try {
        let reviews: Review[] = await readJSON(reviewPath);
        const initialLength = reviews.length;
        reviews = reviews.filter(r => !(r.id === req.params.id && r.productId === req.params.productId));
        if(reviews.length === initialLength) res.status(404).json({error: 'Review not found'});
        else{
            await writeJSON(reviewPath, reviews);
            await updateAverageRating(req.params.productId);
            res.status(204).send();
        }
    } catch (error) {
        next(error);
    }
}