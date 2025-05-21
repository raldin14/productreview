import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductContex } from '../context/ProductContext';
import Rating from "./Rating";
import type { Product } from "../types";
import SearchBar from "./SearchBar";

const ProductList = memo(() => {
    const {products, loading, error,currentPage,totalPages,setCurrentPage, deleteProduct, fetchProducts, searchProducts} = useProductContex();
    const [searchTerm, setSearchterm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
    const [searchMode, setSearchMode] = useState(false);

    const categories = Array.from(new Set(products.map(p => p.category)));

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (!searchMode) {
            setDisplayedProducts(products);
        }
    }, [products]);

    useEffect(() => {
        const handleSearch = async () => {
            if (searchTerm) {
                setSearchMode(true);

                const results = await searchProducts(searchTerm,currentPage);
                setDisplayedProducts(results);
            } else {
                setSearchMode(false);
                setDisplayedProducts(products);
            }
        };
    
        handleSearch();
    }, [searchTerm, currentPage]);

    const goToPage = (page: number) => {
        setCurrentPage(page);
        fetchProducts(page);
    };

    const filterProducts = displayedProducts.filter(p => selectedCategory ? p.category === selectedCategory : true);
    
    if(loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Products</h2>
                {!error &&<Link to="/create" className="btn btn-primary">Add Product</Link>}
            </div>
            <div className="d-flex mb-3 gap-3">

                <SearchBar searchTerm={searchTerm} setSearchTerm={(val) => {
                            setSearchterm(val);
                            }} />

                <select className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
            {error ?(<div className="text-danger">Server may not be runnig Error: {error}</div>): filterProducts.map((p) =>(
                <div key={p._id} className="card mb-3">
                    <div className="card-body d-flex justify-content-between">
                        {p.image && (
                            <img src={p.image} alt={p.name} className="me-3" 
                            style={{width: "120px", height:"auto", objectFit:"contain"}}/>
                        )}
                        <div>
                            <h5 className="card-title">
                                <Link to={`/product/${p._id}`}>{p.name}</Link>
                            </h5>
                            <p className="card-text">{p.description}</p>
                            <p className="card-text"><strong>Price:</strong> ${p.price.toFixed(2)}</p>
                            <small className="text-muted">Category: {p.category}</small>
                            <div>Ratings: <Rating rating={p.averageRating ?? 0}/></div>
                        </div>
                        <div className="d-flex flex-column gap-2">
                            <Link to={`/edit/${p._id}`} className="btn btn-sm btn-secondary">Edit</Link>
                            <button onClick={() => deleteProduct(p._id)} className="btn btn-sm btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
            ))}
            {totalPages > 1 &&
            <div className="d-flex justify-content-center mt-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => goToPage(currentPage - 1)}
                >
                    Previous
                </button>
                <span className="align-self-center">Page {currentPage} of {totalPages}</span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => goToPage(currentPage + 1)}
                >
                    Next
                </button>
            </div>
            }
        </div>
    )
});

export default ProductList;