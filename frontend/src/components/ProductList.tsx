import { memo } from "react";
import { Link } from "react-router-dom";
import { useProductContex } from '../context/ProductContext';
import Rating from "./Rating";

const ProductList = memo(() => {
    const {products, loading, error, deleteProduct} = useProductContex();

    if(loading) return <div>Loading...</div>;
    if(error) return <div className="text-danger">{error}</div>

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Products</h2>
                <Link to="/create" className="btn btn-primary">Add Product</Link>
            </div>
            {products.map((p) =>(
                <div key={p.id} className="card mb-3">
                    <div className="card-body d-flex justify-content-between">
                        {p.image && (
                            <img src={p.image} alt={p.name} className="me-3" 
                            style={{width: "120px", height:"auto", objectFit:"contain"}}/>
                        )}
                        <div>
                            <h5 className="card-title">
                                <Link to={`/product/${p.id}`}>{p.name}</Link>
                            </h5>
                            <p className="card-text">{p.description}</p>
                            <p className="card-text"><strong>Price:</strong> ${p.price.toFixed(2)}</p>
                            <small className="text-muted">Category: {p.category}</small>
                            <div>Ratings: <Rating rating={p.averageRating ?? 0}/></div>
                        </div>
                        <div className="d-flex flex-column gap-2">
                            <Link to={`/edit/${p.id}`} className="btn btn-sm btn-secondary">Edit</Link>
                            <button onClick={() => deleteProduct(p.id)} className="btn btn-sm btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
});

export default ProductList;