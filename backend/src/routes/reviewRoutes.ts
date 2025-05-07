import { Router } from "express";
import { getProductReviews } from "../controllers/reviewController";

const router = Router();

router.get('/:id/reviews',getProductReviews);
export default router;