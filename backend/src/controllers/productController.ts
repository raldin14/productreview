import { Request, Response, NextFunction } from "express";
import path from 'path';
import {v4 as uuidv4 } from 'uuid';
import { readJSON, writeJSON } from '../utils/fileHandler';
// import { Product } from '../models/Product';
import Product  from '../models/Product';

const productPath = path.join(__dirname,'../data/products.json');

// export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.json(products);
        // const { page = '1', category } = req.query;
        // const products: Product[] = await readJSON(productPath);
        // let filtered = category ? products.filter(p => p.category === category) : products;
        // const sorted = filtered.sort((a,b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        // const paginated = sorted.slice((+page - 1) * 10, +page * 10);
        // res.json(paginated);
    } catch (err) {
        // next(err);
        res.status(500).json({message: "Failed to get products"});
    }
}

// export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product) res.status(404).json({message: "Not Found"});
        else res.json(product);
        // const { id } = req.params;

        // const products: Product[] = await readJSON(productPath);
        // const product = products.find(p => p.id === id);

        // if (!product) res.status(404).json({ error: 'Product not found' });
        // else res.json(product);
    } catch (error) {
        // next(error);
        res.status(500).json({message: "Error fetching product"});
    }
};

// export const searchProducts = async (req: Request, res: Response, next: NextFunction) => {
    export const searchProducts = async (req: Request, res: Response) => {
    try {
        const q = req.query.q as string;
        const products = await Product.find({name: { $regex: q, $options: "i"}});
        res.json(products);
        // const { q } = req.query;
        // if(!q) res.status(400).json({ error: 'Missing search query'});
        // else{
        //     const products: Product[] = await readJSON(productPath);
        //     const results = products.filter(p => p.name.toLowerCase().includes((q as string).toLowerCase()));
        //     res.json(results);
        // }
    } catch (error) {
        // next(error);
        res.status(500).json({message: "Failed to search products"});
    }
}

// export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
    export const addProduct = async (req: Request, res: Response) => {
    try {
        const {name, description, category, price, image } = req.body;
        if(!name || !description || !category || !price){
            res.status(400).json({error: 'Missing required fields'});
        }else{
            const product = new Product(req.body);
            const saved = await product.save();
            res.status(201).json(saved);
        }       
        
        // const {name, description, category, price, image } = req.body;
        // if(!name || !description || !category || !price){
        //     res.status(400).json({error: 'Missing required fields'});
        // }else{
        //     const products: Product[] = await readJSON(productPath);
        //     const newProduct: Product = {
        //         id: uuidv4(),
        //         name,
        //         description,
        //         category,
        //         price: Number(price),
        //         dateAdded: new Date().toISOString(),
        //         averageRating: 0,
        //         image: image || ''
        //     };

        //     products.push(newProduct);
        //     await writeJSON(productPath, products);
        //     res.status(201).json(newProduct);
        // }
    } catch (error) {
        // next(error);
        res.status(400).json({message: "Failed to add product"});
    }
}

// export const updateProduct =async (req: Request, res: Response, next: NextFunction) => {
    export const updateProduct =async (req: Request, res: Response) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true});
        if(!updated) res.status(404).json({message: "Product not found"});
        else res.json(updated);
        // const { id } = req.params;
        // const {name, description, category, price, image } = req.body;
        // const products: Product[] = await readJSON(productPath);
        // const index = products.findIndex(p => p.id === id);
        // if(index === -1) res.status(401).json({error: 'Product not found'});
        // else{
        //     const updated = {
        //         ...products[index],
        //         name: name ?? products[index].description,
        //         description: description ?? products[index].description,
        //         category: category ?? products[index].category,
        //         price: price ?? products[index].price,
        //         image: image ?? products[index].image
        //     };

        //     products[index] = updated;
        //     await writeJSON(productPath, products);
        //     res.json(updated);
        // }
    } catch (error) {
        // next(error);
        res.json(400).json({message: "Update failed"});
    }
}

// export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        if(!deleted) res.status(404).json({message: "Product not found"});
        else res.json({message: "Deleted successfully"});
        // const {id} = req.params;
        // const products: Product[] = await readJSON(productPath);
        // const exists = products.find(p => p.id === id);
        // if(!exists) res.status(404).json({error: 'Product not found'});
        // else{
        //     const updated = products.filter(p => p.id !== id);
        //     await writeJSON(productPath, updated);
        //     res.status(204).send();
        // }
    } catch (error) {
        // next(error);
        res.status(500).json({message: "Delete failed"});
    }
}