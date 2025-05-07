import { Request, Response, NextFunction } from "express";
import path from 'path';
import {v4 as uuidv4 } from 'uuid';
import { readJSON, writeJSON } from '../utils/fileHandler';
import { Product } from '../models/Product';

const productPath = path.join(__dirname,'../data/products.json');

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page = '1', category } = req.query;
        const products: Product[] = await readJSON(productPath);
        let filtered = category ? products.filter(p => p.category === category) : products;
        const sorted = filtered.sort((a,b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        const paginated = sorted.slice((+page - 1) * 10, +page * 10);
        res.json(paginated);
    } catch (err) {
        next(err);
    }
}

export const searchProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { q } = req.query;
        if(!q) res.status(400).json({ error: 'Missing search query'});
        else{
            const products: Product[] = await readJSON(productPath);
            const results = products.filter(p => p.name.toLowerCase().includes((q as string).toLowerCase()));
            res.json(results);
        }
    } catch (error) {
        next(error);
    }
}

export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body, "this is the value")
        const {name, description, category, price, imagePath } = req.body;
        if(!name || !description || !category || !price){
            res.status(400).json({error: 'Missing required fields'});
        }else{
            const products: Product[] = await readJSON(productPath);
            const newProduct: Product = {
                id: uuidv4(),
                name,
                description,
                category,
                price: Number(price),
                dateAdded: new Date().toISOString(),
                averageRating: 0,
                image: imagePath || ''
            };

            products.push(newProduct);
            await writeJSON(productPath, products);
            res.status(201).json(newProduct);
        }
    } catch (error) {
        next(error);
    }
}