import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import API from '../api';
import type { Product } from "../types";

const EditProduct = () => {
    const {id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Partial<Product> | null>(null);

    useEffect(() =>{
        API.get(`/${id}`).then(res => setProduct(res.data));
    },[id]);

    if(!product) return <div>Loading...</div>;

    return (
        <div>
            <button onClick={() => navigate(-1)} className="btn btn-secondary mb-3">Go Back</button>
            <ProductForm initialData={product} onSubmit={async (data) => {
                await API.put(`/${id}`, data);
                navigate('/');
            }}/>
        </div>
    )
}

export default EditProduct;