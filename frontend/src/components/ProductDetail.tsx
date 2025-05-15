import { useEffect } from "react";
import { useReviewContext } from "../context/ReviewContext";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import type { Review } from "../types";

const ProductDetail = ({ productId}: {productId: string}) => {
    const {reviews, fetchReviews, createReview, updateReview, deleteReview } = useReviewContext();
    useEffect(() => {
        fetchReviews(productId);
    },[productId])

    const handlerSubmit = (review: Omit<Review, "id" | "date">) => {
        createReview(productId, review);
    }

    const handleEdit = (review: Review) =>{
        const {_id, productId: pid, date, ...updatefields} = review;
        updateReview(pid,_id,updatefields);
    }

    const handleDelete = (id: string) => {
        deleteReview(productId,id);
    }
    return (
        <div>
            <h4>Reviews</h4>
            <ReviewList reviews={reviews.filter((r) => r.productId === productId)} onEdit={handleEdit} onDelete={handleDelete}/>
            <ReviewForm productId={productId} onSubmit={handlerSubmit}/>
        </div>
    )
}

export default ProductDetail;