import { useState } from "react";
import type { Review } from "../types";
import Rating from "./Rating";
import ReviewForm from "./ReviewForm";

interface Props{
    reviews: Review[];
    onDelete: (reviewId: string) => void;
    onEdit: (review: Review) => void;
}

const ReviewList: React.FC<Props> = ({reviews, onDelete, onEdit}) => {
    const [editingReviewId, setEditingReviewId] = useState<string|null>(null);

    const handleEditingSubmit = (updated: Omit<Review,'_id'|'date'>) => {

        if(!editingReviewId) return;

        onEdit({
            ...updated,
            _id: editingReviewId,
            date: new Date().toISOString(),
        });

        setEditingReviewId(null);
    }

    if(reviews.length === 0) return <p>No Reviews yet.</p>;

    return(
        <div className="mt-3">
            {reviews.map((r) => editingReviewId === r._id ? (
                <div key={r._id} className="mb-3">
                    <ReviewForm
                        productId={r.productId}
                        initialData={{
                            author: r.author,
                            rating: r.rating,
                            comment: r.comment,
                        }}
                        onSubmit={handleEditingSubmit}
                        onCancel={() => setEditingReviewId(null)}
                    />
                </div>
            ):(
                <div key={r._id} className="mb-3 border-bottom pb-2">
                    <strong>{r.author}</strong> <Rating rating={r.rating}/>
                    <p className="mb-1">{r.comment}</p>
                    <small className="text-muted">{new Date(r.date).toLocaleDateString()}</small>
                    <div className="mt-2">
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => setEditingReviewId(r._id)}>Edit</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(r._id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ReviewList;