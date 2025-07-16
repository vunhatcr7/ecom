export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    description: string;
    longDescription?: string;
    category: string;
    instructor?: string;
    duration?: string;
    level?: 'Beginner' | 'Intermediate' | 'Advanced';
    rating?: number;
    reviewCount?: number;
    isFavorite?: boolean;
    tags?: string[];
}

export interface User {
    id: string;
    name: string;
    email: string;
    favorites: string[]; // Product IDs
    viewHistory: string[]; // Product IDs
    avatar?: string;
}

export interface FilterOptions {
    priceRange: string;
    category: string;
    level: string;
    searchQuery: string;
}

export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
}

export interface SuggestionResponse {
    products: Product[];
    reason: string;
} 