import { Router } from "express";
import { getAllProducts, searchProducts, addProduct,updateProduct } from "../controllers/productController";

const router = Router();

router.get('/',getAllProducts);
router.get('/search',searchProducts);
router.post('/',addProduct);
router.put('/:id',updateProduct);

export default router;