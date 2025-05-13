export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    dateAdded: string;
    averageRating?: number;
    image?: string;
}

export interface Review{
    id: string;
    productId: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
}