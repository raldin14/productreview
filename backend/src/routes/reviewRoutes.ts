import { Router } from "express";
import { addReview, deleteReview, getProductReviews, updateReview } from "../controllers/reviewController";

const router = Router();

router.get('/:id/reviews',getProductReviews);
router.post('/:id/reviews',addReview);
router.put('/:productId/reviews/:id',updateReview);
router.delete('/:productId/reviews/:id',deleteReview);
export default router;