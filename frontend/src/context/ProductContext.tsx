import { createContext, useContext, useEffect,useState, useCallback, type Dispatch, type SetStateAction } from "react";
import type { Product } from "../types";
import API from "../api";

interface ProductContextType{
    products: Product[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    totalPages: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    fetchProducts: (page?: number) => void;
    deleteProduct: (id: string) => void;
    searchProducts: (query: string, page?:number) => Promise<Product[]>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async (page = 1) =>{
        try {
            setLoading(true);
            const res = await API.get(`/?page=${page}`);
            setProducts(res.data.data);
            setTotalPages(res.data.totalPages);
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

    const searchProducts = useCallback(async (query:string, page = 1): Promise<Product[]> => {
        try {
            const res = await API.get(`/search?q=${encodeURIComponent(query)}&page=${page}`);
            setError(null);
            setCurrentPage(res.data.currentPage);
            setTotalPages(res.data.totalPages);
            return res.data.data;
        } catch (error) {
            setError('Failed to search products');
            return [];
        }
    },[]);

    useEffect(() =>{
        fetchProducts();
    },[fetchProducts]);

    return (
        <ProductContext.Provider value={{products, loading, error,currentPage,totalPages,setCurrentPage, fetchProducts, deleteProduct, searchProducts}}>
            {children}
        </ProductContext.Provider>
    )
};

export const useProductContex = () => {
    const context = useContext(ProductContext);
    if(!context) throw new Error('UseProductContext must be used within a ProductProvider');
    return context;
}