import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import API from "../api";
import { useProductContex } from "../context/ProductContext";

const CreateProduct = () => {
    const navigate = useNavigate();
    const { fetchProducts } = useProductContex();

    return (
        <ProductForm onSubmit={async (data: any) =>{
            await API.post('/', data);
            await fetchProducts();
            navigate('/');
        }}/>
    );
};

export default CreateProduct;