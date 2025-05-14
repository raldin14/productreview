import { useParams } from "react-router-dom";
import { useProductContex } from "../context/ProductContext";
import ProductDetail from "../components/ProductDetail";

const SingleProductView = () =>{
    const {id} = useParams();
    const { products, loading} = useProductContex();

    const product = products.find(p => p.id === id);

    if (loading) return <div>Loading product...</div>;
    if(!product) return <div>Product not found.</div>
    
    return (
        <div className="container mt-4">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <img src={product.image} alt={product.name} style={{width: "150px"}} />
            <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
            <p><strong>Category:</strong> {product.category}</p>

            <hr />
            <ProductDetail productId={product.id}/>
        </div>
    )
}

export default SingleProductView;