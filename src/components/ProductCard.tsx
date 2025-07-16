import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Chip,
    Box,
    IconButton,
    Rating,
    Badge,
} from '@mui/material';
import {
    Favorite,
    FavoriteBorder,
    Visibility,
} from '@mui/icons-material';
import { Product } from '../types';
import { useApp } from '../utils/AppContext';
import { useAuth } from '../utils/AuthContext';
import {
    formatPrice,
    hasDiscount,
    calculateDiscount,
    getLevelColor,
    getCategoryColor,
} from '../utils/helpers';
import { toast } from 'react-toastify';

interface ProductCardProps {
    product: Product;
    onViewDetail: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetail }) => {
    const { isFavorite, addFavorite, removeFavorite, addToHistory } = useApp();
    const { isAuthenticated } = useAuth();

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();

        // Kiểm tra nếu chưa đăng nhập
        if (!isAuthenticated) {
            toast.warning('Bạn cần đăng nhập để thêm sản phẩm vào mục yêu thích!');
            return;
        }

        if (isFavorite(product.id)) {
            removeFavorite(product.id);
            toast.info('Đã xóa khỏi yêu thích!');
        } else {
            addFavorite(product.id);
            toast.success('Đã thêm vào yêu thích!');
        }
    };

    const handleViewDetail = () => {
        // Chỉ lưu vào history nếu đã đăng nhập
        if (isAuthenticated) {
            addToHistory(product.id);
        }
        onViewDetail(product);
    };

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                },
                position: 'relative',
                overflow: 'visible',
            }}
        >
            {/* Discount Badge */}
            {hasDiscount(product) && (
                <Badge
                    badgeContent={`-${calculateDiscount(product.originalPrice!, product.price)}%`}
                    color="error"
                    sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        zIndex: 1,
                    }}
                />
            )}

            {/* Favorite Button */}
            <IconButton
                onClick={handleFavoriteClick}
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    zIndex: 1,
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    '&:hover': {
                        backgroundColor: 'rgba(255,255,255,1)',
                    },
                }}
            >
                {!isAuthenticated ? (
                    <FavoriteBorder sx={{ color: 'text.secondary' }} />
                ) : isFavorite(product.id) ? (
                    <Favorite color="error" />
                ) : (
                    <FavoriteBorder />
                )}
            </IconButton>

            {/* Product Image */}
            <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
                sx={{
                    objectFit: 'cover',
                    cursor: 'pointer',
                }}
                onClick={handleViewDetail}
            />

            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Category and Level Chips */}
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <Chip
                        label={product.category}
                        size="small"
                        sx={{
                            backgroundColor: getCategoryColor(product.category),
                            color: 'white',
                            fontSize: '0.7rem',
                        }}
                    />
                    {product.level && (
                        <Chip
                            label={product.level}
                            size="small"
                            sx={{
                                backgroundColor: getLevelColor(product.level),
                                color: 'white',
                                fontSize: '0.7rem',
                            }}
                        />
                    )}
                </Box>

                {/* Product Name */}
                <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                        fontWeight: 600,
                        mb: 1,
                        cursor: 'pointer',
                        '&:hover': {
                            color: 'primary.main',
                        },
                    }}
                    onClick={handleViewDetail}
                >
                    {product.name}
                </Typography>

                {/* Description */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        flexGrow: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {product.description}
                </Typography>

                {/* Rating */}
                {product.rating && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Rating
                            value={product.rating}
                            precision={0.1}
                            size="small"
                            readOnly
                        />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                            {product.rating} ({product.reviewCount})
                        </Typography>
                    </Box>
                )}

                {/* Instructor and Duration */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    {product.instructor && (
                        <Typography variant="body2" color="text.secondary">
                            {product.instructor}
                        </Typography>
                    )}
                    {product.duration && (
                        <Typography variant="body2" color="text.secondary">
                            {product.duration}
                        </Typography>
                    )}
                </Box>

                {/* Price */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                        {formatPrice(product.price)}
                    </Typography>
                    {hasDiscount(product) && (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ textDecoration: 'line-through' }}
                        >
                            {formatPrice(product.originalPrice!)}
                        </Typography>
                    )}
                </Box>

                {/* View Detail Button */}
                <Button
                    variant="contained"
                    fullWidth
                    startIcon={<Visibility />}
                    onClick={handleViewDetail}
                    sx={{
                        mt: 'auto',
                        textTransform: 'none',
                        fontWeight: 600,
                    }}
                >
                    Xem chi tiết
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductCard; 