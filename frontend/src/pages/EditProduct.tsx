import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import API from '../api';
import type { Product } from "../types";
import { useProductContex } from "../context/ProductContext";

const EditProduct = () => {
    const {id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Partial<Product> | null>(null);
    const { fetchProducts } = useProductContex();

    useEffect(() =>{
        API.get(`/${id}`).then(res => setProduct(res.data));
    },[id]);

    if(!product) return <div>Loading...</div>;

    return <ProductForm initialData={product} onSubmit={async (data) => {
        await API.put(`/${id}`, data);
        await fetchProducts();
        navigate('/');
    }}/>;
}

export default EditProduct;