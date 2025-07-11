import React, { useState } from 'react';
import {
    Paper,
    Typography,
    Button,
    Box,
    Skeleton,
    Alert,
    Chip,
} from '@mui/material';
import {
    Psychology,
    Refresh,
    TrendingUp,
} from '@mui/icons-material';
import { Product } from '../types';
import { getSuggestions, handleApiError } from '../utils/api';
import ProductCard from './ProductCard';

interface AISuggestionsProps {
    onViewDetail: (product: Product) => void;
}

const AISuggestions: React.FC<AISuggestionsProps> = ({ onViewDetail }) => {
    const [suggestions, setSuggestions] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [reason, setReason] = useState<string>('');

    const fetchSuggestions = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await getSuggestions('user1');
            setSuggestions(response.products);
            setReason(response.reason);
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setLoading(false);
        }
    };

    const handleGetSuggestions = () => {
        fetchSuggestions();
    };

    return (
        <Paper
            elevation={2}
            sx={{
                p: 3,
                mb: 3,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Psychology sx={{ mr: 1, fontSize: 28 }} />
                <Typography variant="h6" fontWeight="bold">
                    Gợi ý thông minh từ AI
                </Typography>
            </Box>

            <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                Khám phá các khóa học phù hợp dựa trên sở thích và hành vi của bạn
            </Typography>

            {!loading && suggestions.length === 0 && !error && (
                <Button
                    variant="contained"
                    startIcon={<TrendingUp />}
                    onClick={handleGetSuggestions}
                    sx={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.3)',
                        },
                        textTransform: 'none',
                        fontWeight: 'bold',
                    }}
                >
                    Nhận gợi ý ngay
                </Button>
            )}

            {loading && (
                <Box>
                    <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                        AI đang phân tích và tìm kiếm khóa học phù hợp...
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2 }}>
                        {[1, 2, 3, 4].map((item) => (
                            <Box key={item}>
                                <Skeleton
                                    variant="rectangular"
                                    height={200}
                                    sx={{ borderRadius: 1, mb: 1 }}
                                />
                                <Skeleton variant="text" width="80%" />
                                <Skeleton variant="text" width="60%" />
                                <Skeleton variant="text" width="40%" />
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}

            {error && (
                <Alert
                    severity="error"
                    action={
                        <Button
                            color="inherit"
                            size="small"
                            onClick={handleGetSuggestions}
                            startIcon={<Refresh />}
                        >
                            Thử lại
                        </Button>
                    }
                    sx={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }}
                >
                    {error}
                </Alert>
            )}

            {suggestions.length > 0 && !loading && (
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Chip
                            label={reason}
                            size="small"
                            sx={{
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                color: 'white',
                                mr: 2,
                            }}
                        />
                        <Button
                            size="small"
                            startIcon={<Refresh />}
                            onClick={handleGetSuggestions}
                            sx={{
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                },
                            }}
                        >
                            Làm mới
                        </Button>
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2 }}>
                        {suggestions.map((product) => (
                            <Box key={product.id}>
                                <ProductCard
                                    product={product}
                                    onViewDetail={onViewDetail}
                                />
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}
        </Paper>
    );
};

export default AISuggestions; 