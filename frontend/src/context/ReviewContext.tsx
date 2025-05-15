import { createContext, useCallback, useContext, useState } from "react";
import type { Review } from "../types";
import API from "../api";

interface ReviewContextType {
    reviews: Review[];
    loading: boolean;
    error: string | null;
    fetchReviews: (productId: string) => Promise<void>;
    createReview: (productId: string, review: Omit<Review, "id" |"date">) => Promise<void>;
    updateReview: (productId: string, reviewId: string, review: Partial<Review>) => Promise<void>;
    deleteReview: (productId: string, reviewId: string) => Promise<void>;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [reviews,setReviews] = useState<Review[]>([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState<string | null>(null);

    const fetchReviews = useCallback(async (productId: string) => {
        try {
            setLoading(true);
            const res = await API.get(`/${productId}/reviews`);
            setReviews(res.data);
            setError(null);
        } catch (error) {
            setError("Failed to fetch reviews");
        }finally{
            setLoading(false);
        }
    },[]);

    const createReview = useCallback(
        async (productId: string, review: Omit<Review, "id"|"date">) => {
            try {
                setLoading(true);
                const res = await API.post(`/${productId}/reviews`,review);
                setReviews((prev) => [...prev, res.data]);
                setError(null);
            } catch (error) {
                setError('Failed to create review');
            }finally{
                setLoading(false);
            }
    },[]);

    const updateReview = useCallback(
        async (productId: string, reviewId: string, updated: Partial<Review>) => {
            try {
                setLoading(true);
                const res = await API.put(`/${productId}/reviews/${reviewId}`,updated);
                setReviews((prev) => prev.map((rev) => (rev._id === reviewId ? res.data : rev)));
                setError(null);
            } catch (error) {
                setError("Failed to update review");
            }finally{
                setLoading(false);
            }        
    },[]);

    const deleteReview = useCallback(async (productId: string, reviewId: string) => {
        try {
            setLoading(true);
            await API.delete(`/${productId}/reviews/${reviewId}`);
            setReviews((prev) => prev.filter((r) => r._id !== reviewId));
            setError(null);
        } catch (error) {
            setError("Failed to delete review")
        }finally{
            setLoading(false);
        }
    },[]);
    return (
        <ReviewContext.Provider value={{reviews, loading, error,fetchReviews,createReview,updateReview,deleteReview}}>
            {children}
        </ReviewContext.Provider>
    )
}

export const useReviewContext = () => {
    const context = useContext(ReviewContext);
    if(!context){
        throw new Error("UseReviewContext must be used within a ReviewProvider");
    }
    return context;
}