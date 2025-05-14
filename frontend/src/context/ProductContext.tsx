import { createContext, useContext, useEffect,useState, useCallback } from "react";
import type { Product } from "../types";
import API from "../api";

interface ProductContextType{
    products: Product[];
    loading: boolean;
    error: string | null;
    fetchProducts: () => void;
    deleteProduct: (id: string) => void;
    searchProducts: (query: string) => Promise<Product[]>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async () =>{
        try {
            setLoading(true);
            const res = await API.get('/');
            setProducts(res.data);
            setError(null);
        } catch (error) {
            setError('failed to get product');
        }finally{
            setLoading(false);
        }
    },[]);

    const deleteProduct = useCallback(async (id: string) =>{
        try {
            await API.delete(`/${id}`);
            fetchProducts();
        } catch (error) {
            setError('Failed to delete product');
        }
    },[fetchProducts]);

    const searchProducts = useCallback(async (query:string): Promise<Product[]> => {
        try {
            // setLoading(true);
            const res = await API.get(`/search?q=${encodeURIComponent(query)}`);
            setError(null);
            return res.data;
        } catch (error) {
            setError('Failed to search products');
            return [];
        }
        // finally{
        //     setLoading(false);
        // }
    },[]);

    useEffect(() =>{
        fetchProducts();
    },[fetchProducts]);

    return (
        <ProductContext.Provider value={{products, loading, error, fetchProducts, deleteProduct, searchProducts}}>
            {children}
        </ProductContext.Provider>
    )
};

export const useProductContex = () => {
    const context = useContext(ProductContext);
    if(!context) throw new Error('UseProductContext must be used within a ProductProvider');
    return context;
}