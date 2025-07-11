// Format giá tiền VND
export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
};

// Format rating với số sao
export const formatRating = (rating: number): string => {
    return rating.toFixed(1);
};

// Tính phần trăm giảm giá
export const calculateDiscount = (originalPrice: number, currentPrice: number): number => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

// Kiểm tra sản phẩm có giảm giá không
export const hasDiscount = (product: { originalPrice?: number; price: number }): boolean => {
    return product.originalPrice ? product.originalPrice > product.price : false;
};

// Format thời gian
export const formatDuration = (duration: string): string => {
    return duration;
};

// Tạo màu cho level
export const getLevelColor = (level: string): string => {
    switch (level) {
        case 'Beginner':
            return '#4caf50';
        case 'Intermediate':
            return '#ff9800';
        case 'Advanced':
            return '#f44336';
        default:
            return '#757575';
    }
};

// Tạo màu cho category
export const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
        'Programming': '#2196f3',
        'Data Science': '#9c27b0',
        'Design': '#ff5722',
        'Marketing': '#4caf50',
        'Business': '#ff9800'
    };
    return colors[category] || '#757575';
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number
): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}; 