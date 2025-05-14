import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductContex } from '../context/ProductContext';
import Rating from "./Rating";
import type { Product } from "../types";

const ProductList = memo(() => {
    const {products, loading, error, deleteProduct, fetchProducts, searchProducts} = useProductContex();
    const [searchTerm, setSearchterm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);

    const categories = Array.from(new Set(products.map(p => p.category)));

    useEffect(() => {
        fetchProducts();
    }, []);
    
    useEffect(() => {
        setDisplayedProducts(products);
    }, [products]);

    useEffect(() => {
        const handleSearch = async () => {
            if (searchTerm) {
                const results = await searchProducts(searchTerm);
                setDisplayedProducts(results);
            } else {
                setDisplayedProducts(products);
            }
        };
    
        handleSearch();
    }, [searchTerm, products]);

    const filterProducts = displayedProducts.filter(p => selectedCategory ? p.category === selectedCategory : true);

    if(loading) return <div>Loading...</div>;
    if(error) return <div className="text-danger">{error}</div>

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Products</h2>
                <Link to="/create" className="btn btn-primary">Add Product</Link>
            </div>
            <div className="d-flex mb-3 gap-3">
                <input type="text" placeholder="Search by name..." className="form-control" value={searchTerm} onChange={(e) => setSearchterm(e.target.value)}/>
                <select className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
            {filterProducts.map((p) =>(
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