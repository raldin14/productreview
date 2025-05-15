import { Router } from "express";
import { addReview, deleteReview, getProductReviews, updateReview } from "../controllers/reviewController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Review management
 */

/**
 * @swagger
 * /products/{id}/reviews:
 *   get:
 *     summary: Get all reviews for a product
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: List of reviews
 */
router.get('/:id/reviews',getProductReviews);

/**
 * @swagger
 * /products/{id}/reviews:
 *   post:
 *     summary: Add a review for a product
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Review added
 */
router.post('/:id/reviews',addReview);


/**
 * @swagger
 * /products/{productId}/reviews/{id}:
 *   put:
 *     summary: Update a review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: Review updated
 */
router.put('/:productId/reviews/:id',updateReview);

/**
 * @swagger
 * /products/{productId}/reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Review deleted
 */
router.delete('/:productId/reviews/:id',deleteReview);
export default router;