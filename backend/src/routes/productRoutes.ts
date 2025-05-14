import { Router } from "express";
import { getAllProducts,getProductById, searchProducts, addProduct,updateProduct, deleteProduct } from "../controllers/productController";

const router = Router();

router.get('/',getAllProducts);
router.get('/search',searchProducts);
router.get('/:id',getProductById);
router.post('/',addProduct);
router.put('/:id',updateProduct);
router.delete('/:id', deleteProduct);

export default router;