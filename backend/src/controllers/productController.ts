import { Request, Response, NextFunction } from "express";
import path from 'path';
import { readJSON } from '../utils/fileHandler';
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
        if(!q) return res.status(400).json({ error: 'Missing search query'});
        const products: Product[] = await readJSON(productPath);
        const results = products.filter(p => p.name.toLowerCase().includes((q as string).toLowerCase()));
        res.json(results);
    } catch (error) {
        next(error);
    }
}