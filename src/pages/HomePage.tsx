import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    CircularProgress,
    Alert,
    Button,
} from '@mui/material';
import {
    Refresh,
    Search,
} from '@mui/icons-material';
import { Product, FilterOptions } from '../types';
import { getProducts, searchProducts, filterProducts, handleApiError } from '../utils/api';
import { mockProducts } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import SearchAndFilter from '../components/SearchAndFilter';
import AISuggestions from '../components/AISuggestions';


interface HomePageProps {
    onNavigate?: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [filters, setFilters] = useState<FilterOptions>({
        priceRange: 'All',
        category: 'All',
        level: 'All',
        searchQuery: '',
    });

    // Load products on component mount
    useEffect(() => {
        loadProducts();
    }, []);

    // Apply filters when filters change
    useEffect(() => {
        applyFilters();
    }, [filters, products]);

    const loadProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getProducts();
            setProducts(data);
        } catch (err) {
            setError(handleApiError(err));
            // Fallback to mock data
            setProducts(mockProducts);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = async () => {
        if (products.length === 0) return;

        try {
            let filtered = [...products];

            // Apply search filter
            if (filters.searchQuery) {
                const searchResults = await searchProducts(filters.searchQuery);
                filtered = searchResults;
            }

            // Apply other filters
            if (filters.category !== 'All' || filters.level !== 'All' || filters.priceRange !== 'All') {
                const filterResults = await filterProducts({
                    category: filters.category !== 'All' ? filters.category : undefined,
                    level: filters.level !== 'All' ? filters.level : undefined,
                    priceRange: filters.priceRange !== 'All' ? filters.priceRange : undefined,
                });

                // Intersect search results with filter results
                const searchIds = new Set(filtered.map(p => p.id));
                filtered = filterResults.filter(p => searchIds.has(p.id));
            }

            setFilteredProducts(filtered);
        } catch (err) {
            console.error('Error applying filters:', err);
            setFilteredProducts(products);
        }
    };

    const handleSearch = (query: string) => {
        setFilters(prev => ({ ...prev, searchQuery: query }));
    };

    const handleFiltersChange = (newFilters: FilterOptions) => {
        setFilters(newFilters);
    };

    const handleClearFilters = () => {
        setFilters({
            priceRange: 'All',
            category: 'All',
            level: 'All',
            searchQuery: '',
        });
    };

    const handleViewDetail = (product: Product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedProduct(null);
    };

    const handleRetry = () => {
        loadProducts();
    };

    return (
        <Container maxWidth="xl" sx={{ py: 3 }}>

            {/* Search and Filter */}
            <SearchAndFilter
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onSearch={handleSearch}
                onClearFilters={handleClearFilters}
            />

            {/* AI Suggestions */}
            <AISuggestions onViewDetail={handleViewDetail} />

            {/* Products Section */}
            <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h5" fontWeight="bold">
                        Tất cả khóa học
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {filteredProducts.length > 0 && (
                            <Typography variant="body2" color="text.secondary">
                                {filteredProducts.length} khóa học
                            </Typography>
                        )}
                        <Button
                            startIcon={<Refresh />}
                            onClick={handleRetry}
                            disabled={loading}
                            size="small"
                        >
                            Làm mới
                        </Button>
                    </Box>
                </Box>

                {/* Loading State */}
                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress />
                    </Box>
                )}

                {/* Error State */}
                {error && !loading && (
                    <Alert
                        severity="error"
                        action={
                            <Button color="inherit" size="small" onClick={handleRetry}>
                                Thử lại
                            </Button>
                        }
                        sx={{ mb: 2 }}
                    >
                        {error}
                    </Alert>
                )}

                {/* Products Grid */}
                {!loading && filteredProducts.length > 0 && (
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
                        {filteredProducts.map((product) => (
                            <Box key={product.id}>
                                <ProductCard
                                    product={product}
                                    onViewDetail={handleViewDetail}
                                />
                            </Box>
                        ))}
                    </Box>
                )}

                {/* Empty State */}
                {!loading && filteredProducts.length === 0 && !error && (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Search sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                            Không tìm thấy khóa học nào
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                        </Typography>
                        <Button
                            variant="outlined"
                            onClick={handleClearFilters}
                        >
                            Xóa bộ lọc
                        </Button>
                    </Box>
                )}
            </Box>

            {/* Product Detail Modal */}
            <ProductModal
                product={selectedProduct}
                open={modalOpen}
                onClose={handleCloseModal}
            />
        </Container>
    );
};

export default HomePage; 