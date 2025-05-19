import { Request, Response, NextFunction } from "express";
import axios from 'axios';
// import path from 'path';
// import { v4 as uuidv4} from 'uuid';
// import { readJSON, writeJSON } from "../utils/fileHandler";
import  Review  from "../models/Review";
import  Product  from "../models/Product";

const API_KEY = process.env.OPENAI_API_KEY;
const URL = process.env.SERVER_URL;
// const reviewPath = path.join(__dirname, '../data/reviews.json');
// const productPath = path.join(__dirname, '../data/products.json');

const updateAverageRating =async (productId:string) => {
    const reviews = await Review.find({productId});
    if(reviews.length === 0) {
        await Product.findByIdAndUpdate(productId, { averageRating: 0 });
        return; 
    }

    const avg = reviews.reduce((sum, r) => sum + r.rating, 0)/reviews.length;
    await Product.findByIdAndUpdate(productId, {averageRating: avg});
    // const reviews: Review[] = await readJSON(reviewPath);
    // const products: Product[] = await readJSON(productPath);
    // const product = products.find(p => p.id === productId);
    // if(!product) return;
    // const relevant = reviews.filter( r => r.productId === productId);
    // product.averageRating = relevant.reduce((sum, r) => sum + r.rating, 0)/ (relevant.length || 1);
    // await writeJSON(productPath, products);
}

export const getProductReviews =async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviews = await Review.find({productId: req.params.id});
        res.json(reviews);
        // const reviews: Review[] = await readJSON(reviewPath);
        // const productReviews = reviews.filter(r => r.productId === req.params.id);
        // res.json(productReviews);
    } catch (error) {
        next(error);
    }
}

export const addReview =async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {author, rating, comment} = req.body;
        if(!author || !rating || rating < 1 || rating > 5) res.status(400).json({error: 'Invalid input'});
        else{
            const newReview = new Review({
                productId: req.params.id,
                author,
                rating,
                comment,
                date: new Date().toISOString(),
            });

            await newReview.save();
            await updateAverageRating(req.params.id);

            res.status(201).json(newReview);
        }
        // const {author, rating, comment} = req.body;
        // if(!author || !rating || rating < 1 || rating > 5) res.status(400).json({error: 'Invalid input'});
        // else{
        //     const reviews: Review[] = await readJSON(reviewPath);
        //     const newReview: Review = {
        //         id: uuidv4(),
        //         productId: req.params.id,
        //         author,
        //         rating,
        //         comment,
        //         date: new Date().toISOString(),
        //     };

        //     reviews.push(newReview);
        //     await writeJSON(reviewPath, reviews);
        //     await updateAverageRating(req.params.id);
        //     res.status(201).json(newReview);
        // }
    } catch (error) {
        next(error);
    }
}

export const updateReview =async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {author, rating, comment } = req.body;
        const review = await Review.findOne({
            _id: req.params.id,
            productId: req.params.productId,
        });

        if(!review) res.status(404).json({error: "Review not Found"});
        else {
            if(author) review.author = author;
            if(rating) review.rating = rating;
            if(comment) review.comment = comment;
            review.date = new Date().toISOString();

            await review.save();
            await updateAverageRating(req.params.productId);

            res.json(review);
        }
        // const {author, rating, comment } = req.body;
        // const reviews: Review[] = await readJSON(reviewPath);
        // const review = reviews.find(r => r.id === req.params.id && r.productId === req.params.productId);
        // if(!review) res.status(404).json({error: 'Review not found'});
        // else{
        //     if(author) review.author = author;
        //     if(rating) review.rating = rating;
        //     if(comment) review.comment = comment;
        //     review.date = new Date().toISOString();
        //     await writeJSON(reviewPath, reviews);
        //     await updateAverageRating(req.params.productId);
        //     res.json(review);
        // }
    } catch (error) {
        next(error);
    }
}

export const deleteReview =async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deleted = await Review.findOneAndDelete({
            _id: req.params.id,
            productId: req.params.productId,
        });

        if(!deleted) res.status(404).json({error: "Review not found"});
        else {
            await updateAverageRating(req.params.productId);
            res.status(204).send();
        }
        // let reviews: Review[] = await readJSON(reviewPath);
        // const initialLength = reviews.length;
        // reviews = reviews.filter(r => !(r.id === req.params.id && r.productId === req.params.productId));
        // if(reviews.length === initialLength) res.status(404).json({error: 'Review not found'});
        // else{
        //     await writeJSON(reviewPath, reviews);
        //     await updateAverageRating(req.params.productId);
        //     res.status(204).send();
        // }
    } catch (error) {
        next(error);
    }
}

export const suggestReview =async (req :Request, res: Response, next: NextFunction) => {
    const {rating } = req.body;
    console.log(rating, API_KEY)
    if( typeof rating !== "number" || rating < 1 || rating > 5)
        res.status(400).json({message: 'Rating must be anumber between 1 and 5'});
    else{
        try {
            const response = await axios.post(
                "https://openrouter.ai/api/v1/chat/completions",
                {
                  model: "mistralai/mistral-7b-instruct:free", 
                  messages: [
                    {
                      role: "user",
                      content: `Write a helpful one paragraph review for a product rated ${rating} out of 5 donnot add product name.`,
                    },
                  ],
                },
                {
                  headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": URL, 
                    "X-Title": "product-review-app", 
                  },
                }
              );
                // console.log(response.data.choices?.[0]?.message?.content);
            res.status(200).send(response.data.choices?.[0]?.message?.content)
        } catch (error: any) {
            console.error("OpenRouter API error:", error.response?.data || error.message);
        }
    }
}