import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Button,
    Paper,
} from '@mui/material';
import {
    Favorite,
    FavoriteBorder,
    ArrowBack,
} from '@mui/icons-material';
import { Product } from '../types';
import { mockProducts } from '../data/mockData';
import { useApp } from '../utils/AppContext';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';

interface FavoritesPageProps {
    onNavigate: (page: string) => void;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ onNavigate }) => {
    const { getFavoriteProducts } = useApp();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const favoriteProducts = getFavoriteProducts(mockProducts);

    const handleViewDetail = (product: Product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedProduct(null);
    };



    return (
        <Container maxWidth="xl" sx={{ py: 3 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => onNavigate('home')}
                    sx={{ mr: 2 }}
                >
                    Quay lại
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Favorite sx={{ mr: 1, color: 'error.main' }} />
                    <Typography variant="h4" fontWeight="bold">
                        Khóa học yêu thích
                    </Typography>
                </Box>
            </Box>

            {/* Content */}
            {favoriteProducts.length > 0 ? (
                <>
                    <Paper
                        elevation={1}
                        sx={{
                            p: 2,
                            mb: 3,
                            backgroundColor: 'primary.light',
                            color: 'white',
                        }}
                    >
                        <Typography variant="body1">
                            Bạn có {favoriteProducts.length} khóa học trong danh sách yêu thích
                        </Typography>
                    </Paper>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
                        {favoriteProducts.map((product) => (
                            <Box key={product.id}>
                                <ProductCard
                                    product={product}
                                    onViewDetail={handleViewDetail}
                                />
                            </Box>
                        ))}
                    </Box>
                </>
            ) : (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <FavoriteBorder sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
                        Chưa có khóa học yêu thích nào
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        Khám phá và thêm các khóa học vào danh sách yêu thích của bạn
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => onNavigate('home')}
                        sx={{ textTransform: 'none' }}
                    >
                        Khám phá khóa học
                    </Button>
                </Box>
            )}

            {/* Product Detail Modal */}
            <ProductModal
                product={selectedProduct}
                open={modalOpen}
                onClose={handleCloseModal}
            />
        </Container>
    );
};

export default FavoritesPage; 