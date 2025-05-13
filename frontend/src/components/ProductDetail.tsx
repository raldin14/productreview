import { useEffect } from "react";
import { useReviewContext } from "../context/ReviewContext";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import type { Review } from "../types";

const ProductDetail = ({ productId}: {productId: string}) => {
    const {reviews, fetchReviews, createReview } = useReviewContext();
    useEffect(() => {
        fetchReviews(productId);
    },[productId])

    const handlerSubmit = (review: Omit<Review, "id" | "date">) => {
        createReview(productId, review);
    }

    return (
        <div>
            <h4>Reviews</h4>
            <ReviewList reviews={reviews.filter((r) => r.productId === productId)}/>
            <ReviewForm productId={productId} onSubmit={handlerSubmit}/>
        </div>
    )
}

export default ProductDetail;