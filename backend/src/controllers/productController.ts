import { Request, Response, NextFunction } from "express";
import Product  from '../models/Product';

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = 10;

        const total = await Product.countDocuments();

        const products = await Product.find()
            .sort({ dateAdded: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        res.json({
            page,
            total,
            totalPages: Math.ceil(total / limit),
            data: products
        });
    } catch (err) {
        res.status(500).json({message: "Failed to get products"});
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product) res.status(404).json({message: "Not Found"});
        else res.json(product);
    } catch (error) {
        res.status(500).json({message: "Error fetching product"});
    }
};

export const searchProducts = async (req: Request, res: Response) => {
    try {
        const q = req.query.q as string;
        const page = parseInt(req.query.page as string) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;

        const filter = { name: { $regex: q, $options: "i" } };

        const total = await Product.countDocuments(filter);
        const products = await Product.find(filter)
                                      .skip(skip)
                                      .limit(limit);

        res.json({
            data: products,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
        });
    } catch (error) {
        res.status(500).json({message: "Failed to search products"});
    }
}

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
    } catch (error) {
        res.status(400).json({message: "Failed to add product"});
    }
}

export const updateProduct =async (req: Request, res: Response) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true});
        if(!updated) res.status(404).json({message: "Product not found"});
        else res.json(updated);
    } catch (error) {
        res.json(400).json({message: "Update failed"});
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const deleted = await Product.findById(req.params.id);
        if(!deleted) res.status(404).json({message: "Product not found"});
        else {
            await deleted.deleteOne();
            res.json({message: "Deleted successfully"});
        }
    } catch (error) {
        res.status(500).json({message: "Delete failed"});
    }
}