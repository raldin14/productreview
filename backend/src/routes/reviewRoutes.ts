import { Router } from "express";
import { addReview, getProductReviews } from "../controllers/reviewController";

const router = Router();

router.get('/:id/reviews',getProductReviews);
router.post('/:id/reviews',addReview);
export default router;