import type { Review } from "../types";
import Rating from "./Rating";

interface Props{
    reviews: Review[];
}

const ReviewList: React.FC<Props> = ({reviews}) => {
    if(reviews.length === 0) return <p>No Reviews yet.</p>;

    return(
        <div className="mt-3">
            {reviews.map((r) => (
                <div key={r.id} className="mb-3 border-bottom pb-2">
                    <strong>{r.author}</strong> <Rating rating={r.rating}/>
                    <p className="mb-1">{r.comment}</p>
                    <small className="text-muted">{new Date(r.date).toLocaleDateString()}</small>
                </div>
            ))}
        </div>
    );
};

export default ReviewList;