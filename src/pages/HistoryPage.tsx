import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Button,
    Paper,
} from '@mui/material';
import {
    History,
    ArrowBack,
    Clear,
} from '@mui/icons-material';
import { Product } from '../types';
import { mockProducts } from '../data/mockData';
import { useApp } from '../utils/AppContext';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';

interface HistoryPageProps {
    onNavigate: (page: string) => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ onNavigate }) => {
    const { getHistoryProducts, clearHistory } = useApp();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const historyProducts = getHistoryProducts(mockProducts);

    const handleViewDetail = (product: Product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedProduct(null);
    };

    const handleClearHistory = () => {
        clearHistory();
    };

    return (
        <Container maxWidth="xl" sx={{ py: 3 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        startIcon={<ArrowBack />}
                        onClick={() => onNavigate('home')}
                        sx={{ mr: 2 }}
                    >
                        Quay lại
                    </Button>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <History sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="h4" fontWeight="bold">
                            Lịch sử xem
                        </Typography>
                    </Box>
                </Box>

                {historyProducts.length > 0 && (
                    <Button
                        startIcon={<Clear />}
                        onClick={handleClearHistory}
                        variant="outlined"
                        color="error"
                    >
                        Xóa lịch sử
                    </Button>
                )}
            </Box>

            {/* Content */}
            {historyProducts.length > 0 ? (
                <>
                    <Paper
                        elevation={1}
                        sx={{
                            p: 2,
                            mb: 3,
                            backgroundColor: 'info.light',
                            color: 'white',
                        }}
                    >
                        <Typography variant="body1">
                            Bạn đã xem {historyProducts.length} khóa học gần đây
                        </Typography>
                    </Paper>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
                        {historyProducts.map((product) => (
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
                    <History sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
                        Chưa có lịch sử xem nào
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        Lịch sử xem sẽ được cập nhật khi bạn xem chi tiết các khóa học
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

export default HistoryPage; 