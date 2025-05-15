export interface Product {
    _id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    dateAdded: string;
    averageRating?: number;
    image?: string;
}

export interface Review{
    _id: string;
    productId: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
}