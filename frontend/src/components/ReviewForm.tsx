import { useState } from "react";
import type { Review } from "../types";

interface Props {
    productId: string;
    onSubmit: (review: Omit<Review, "id"|"date">) => void;
}

const ReviewForm: React.FC<Props> = ({productId, onSubmit}) => {
    const [form,setForm] = useState<Omit<Review, "id" | "date"|"productId">>({
        author:"",
        rating:0,
        comment:"",
    });

    const handlerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value} = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "rating" ? Number(value) : value,
        }));
    }

    const handlerSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({...form, productId});
        setForm({author:"", rating: 0, comment:""});
    }

    return (
        <form onSubmit={handlerSubmit}>
            <input type="text" name="author" placeholder="Your Name" value={form.author} onChange={handlerChange} className="form-control mb-2"/>
            <input type="number" name="rating" min={1} max={5} step={0.1} value={form.rating} onChange={handlerChange} className="form-control mb-2" />
            <textarea name="comment" placeholder="Write your review..." value={form.comment} onChange={handlerChange} className="form-control mb-2"/>
            <button type="submit" className="btn btn-primary">Submit Review</button>
        </form>
    )
}

export default ReviewForm;