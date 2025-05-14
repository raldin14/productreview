import { useState, useCallback } from "react";
import type { Product } from "../types";

interface Props {
    initialData?: Partial<Product>;
    onSubmit: (product: Partial<Product>) => void;
}

const ProductForm: React.FC<Props> = ({initialData = {}, onSubmit}) => {
    const [form,setForm] = useState<Partial<Product>>({
        name: '',
        description:'',
        category:'',
        averageRating:0,
        image:'',
        ...initialData
    });

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement|HTMLSelectElement>) => {
        const {name, value} = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: ['averageRating', 'price'].includes(name) ? Number(value) : value
          }));
          
    },[]);

    return (
        <form onSubmit={(e) => {e.preventDefault(); onSubmit(form); console.log(form)}}>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" name="name" className="form-control" value={form.name} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea name="description" className="form-control" value={form.description} onChange={handleChange}></textarea>
            </div>
            <div className="mb-3">
                <label className="form-label">Category</label>
                <select name="category" className="form-select" value={form.category} onChange={handleChange}>
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Books">Books</option>
                    <option value="Games">Games</option>
                    <option value="Home">Home</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                    type="number"
                    name="price"
                    step="0.01"
                    min="0"
                    className="form-control"
                    value={form.price}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Rating</label>
                <input 
                    type="number" 
                    min={0} max={5} 
                    name="averageRating" 
                    className="form-control" 
                    value={form.averageRating} 
                    onChange={handleChange} 
                    readOnly />
            </div>
            <div className="mb-3">
                <label className="form-label">Image URL</label>
                <input
                    type="text"
                    name="image"
                    className="form-control"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                />
            </div>
            <button className="btn btn-success" type="submit">Submit</button>
        </form>
    );
};

export default ProductForm;