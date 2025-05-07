import { Router } from "express";
import { getAllProducts, searchProducts, addProduct } from "../controllers/productController";

const router = Router();

router.get('/',getAllProducts);
router.get('/search',searchProducts);
router.post('/',addProduct);

export default router;