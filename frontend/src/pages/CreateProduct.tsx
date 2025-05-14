import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import API from "../api";

const CreateProduct = () => {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate(-1)} className="btn btn-secondary mb-3">Go Back</button>
            <ProductForm onSubmit={async (data: any) =>{
                await API.post('/', data);
                navigate('/');
            }}/>
        </div>
    );
};

export default CreateProduct;