import { Product, SuggestionResponse } from '../types';
import { mockProducts } from '../data/mockData';

// Mock API cho suggestions
export const getSuggestions = async (userId: string): Promise<SuggestionResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock logic: dựa trên lịch sử xem và favorites
    const userHistory = ['1', '2', '4', '6']; // Mock user history
    const userFavorites = ['1', '3', '5']; // Mock user favorites

    // Lọc sản phẩm dựa trên hành vi người dùng
    const suggestedProducts = mockProducts.filter(product => {
        // Không hiển thị sản phẩm đã thích
        if (userFavorites.includes(product.id)) return false;

        // Ưu tiên sản phẩm cùng category với sản phẩm đã xem
        const viewedCategories = userHistory.map(id =>
            mockProducts.find(p => p.id === id)?.category
        );

        return viewedCategories.includes(product.category) ||
            product.category === 'Programming' || // Default suggestions
            product.category === 'Data Science';
    }).slice(0, 4); // Giới hạn 4 sản phẩm

    return {
        products: suggestedProducts,
        reason: 'Dựa trên khóa học bạn đã xem và yêu thích'
    };
};

// Mock API cho products
export const getProducts = async (): Promise<Product[]> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockProducts;
};

// Mock API cho product detail
export const getProductById = async (id: string): Promise<Product | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockProducts.find(product => product.id === id) || null;
};

// Mock API cho search products
export const searchProducts = async (query: string): Promise<Product[]> => {
    await new Promise(resolve => setTimeout(resolve, 600));

    const filteredProducts = mockProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );

    return filteredProducts;
};

// Mock API cho filter products
export const filterProducts = async (filters: {
    priceRange?: string;
    category?: string;
    level?: string;
}): Promise<Product[]> => {
    await new Promise(resolve => setTimeout(resolve, 700));

    let filteredProducts = [...mockProducts];

    if (filters.category && filters.category !== 'All') {
        filteredProducts = filteredProducts.filter(p => p.category === filters.category);
    }

    if (filters.level && filters.level !== 'All') {
        filteredProducts = filteredProducts.filter(p => p.level === filters.level);
    }

    if (filters.priceRange && filters.priceRange !== 'All') {
        switch (filters.priceRange) {
            case '< 500K':
                filteredProducts = filteredProducts.filter(p => p.price < 500000);
                break;
            case '500K - 1M':
                filteredProducts = filteredProducts.filter(p => p.price >= 500000 && p.price <= 1000000);
                break;
            case '1M - 2M':
                filteredProducts = filteredProducts.filter(p => p.price > 1000000 && p.price <= 2000000);
                break;
            case '> 2M':
                filteredProducts = filteredProducts.filter(p => p.price > 2000000);
                break;
        }
    }

    return filteredProducts;
};

// Error handler
export const handleApiError = (error: any): string => {
    if (error.response) {
        return `Lỗi server: ${error.response.status}`;
    } else if (error.request) {
        return 'Không thể kết nối đến server';
    } else {
        return 'Đã xảy ra lỗi không xác định';
    }
}; 