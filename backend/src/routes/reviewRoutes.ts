import { Router } from "express";
import { addReview, getProductReviews, updateReview } from "../controllers/reviewController";

const router = Router();

router.get('/:id/reviews',getProductReviews);
router.post('/:id/reviews',addReview);
router.put('/:productId/reviews/:id',updateReview);
export default router;