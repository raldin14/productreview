import { useEffect, useState } from "react";
import type { Review } from "../types";
import { useNavigate } from "react-router-dom";

interface Props {
    productId: string;
    onSubmit: (review: Omit<Review, "id"|"date">) => void;
    onCancel?: () => void;  // Optional cancel for edit mode
    initialData?: {
        author: string;
        rating: number;
        comment: string;
    };
}

const ReviewForm: React.FC<Props> = ({productId, onSubmit, onCancel,initialData}) => {
    const navigate = useNavigate();
    const [form,setForm] = useState<Omit<Review, "_id" | "date"|"productId">>({
        author:"",
        rating:0,
        comment:"",
    });

    const [error, setError] = useState("");

    useEffect(()=>{
        if(initialData){
            setForm(initialData)
        }
    },[initialData]);
    
    const handlerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value} = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "rating" ? Number(value) : value,
        }));
    }

    const handlerSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.author.trim() || !form.comment.trim() || form.rating <= 0) {
            setError("All fields are required, and rating must be greater than 0.");
            return;
        }

        setError("");
        onSubmit({
            ...form, productId,
            _id: ""
        });
        
        if (!initialData) {
            setForm({ author: "", rating: 0, comment: "" });
        }
    }

    return (
        <form onSubmit={handlerSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            <input type="text" name="author" placeholder="Your Name" value={form.author} onChange={handlerChange} className="form-control mb-2"/>
            <input type="number" name="rating" min={1} max={5} step={0.1} value={form.rating} onChange={handlerChange} className="form-control mb-2" />
            <textarea name="comment" placeholder="Write your review..." value={form.comment} onChange={handlerChange} className="form-control mb-2"/>
            <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary">{initialData ? "Update Review" : "Submit Review"}</button>
                {onCancel ? (<button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
                        Cancel
                    </button>) :(<button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
                        Cancel
                    </button>)}
            </div>
        </form>
    )
}

export default ReviewForm;