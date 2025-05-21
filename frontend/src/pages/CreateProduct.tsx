import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import API from "../api";
import { useProductContex } from "../context/ProductContext";

const CreateProduct = () => {
    const navigate = useNavigate();
    const {fetchProducts} = useProductContex();

    return (
        <div>
            <button onClick={() => navigate(-1)} className="btn btn-secondary mb-3">Go Back</button>
            <ProductForm onSubmit={async (data: any) =>{
                await API.post('/', data);
                fetchProducts();
                navigate('/');
            }}/>
        </div>
    );
};

export default CreateProduct;