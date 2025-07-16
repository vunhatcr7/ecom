import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
    Button,
    Box,
    Chip,
    Rating,
    IconButton,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import {
    Close,
    Favorite,
    FavoriteBorder,
    AccessTime,
    Person,
    School,
    Tag,
} from '@mui/icons-material';
import { Product } from '../types';
import { useApp } from '../utils/AppContext';
import { useCart } from '../utils/CartContext';
import { toast } from 'react-toastify';
import {
    formatPrice,
    hasDiscount,
    calculateDiscount,
    getLevelColor,
    getCategoryColor,
} from '../utils/helpers';

interface ProductModalProps {
    product: Product | null;
    open: boolean;
    onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, open, onClose }) => {
    const { isFavorite, addFavorite, removeFavorite } = useApp();
    const { addToCart, cartItems } = useCart();

    if (!product) return null;

    const handleFavoriteClick = () => {
        if (isFavorite(product.id)) {
            removeFavorite(product.id);
        } else {
            addFavorite(product.id);
        }
    };

    const handleAddToCart = () => {
        if (product) {
            if (cartItems.find(item => item.id === product.id)) {
                toast.warning('Khóa học này đã có trong giỏ hàng!');
            } else {
                addToCart(product);
                toast.success('Đã thêm vào giỏ hàng!');
            }
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    maxHeight: '90vh',
                },
            }}
        >
            <DialogTitle sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" component="h2" fontWeight="bold">
                        Chi tiết khóa học
                    </Typography>
                    <IconButton onClick={onClose} size="large">
                        <Close />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent sx={{ pt: 0 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
                    {/* Product Image */}
                    <Box>
                        <Box sx={{ position: 'relative' }}>
                            <img
                                src={product.image}
                                alt={product.name}
                                style={{
                                    width: '100%',
                                    height: '300px',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                }}
                            />
                            {hasDiscount(product) && (
                                <Chip
                                    label={`-${calculateDiscount(product.originalPrice!, product.price)}%`}
                                    color="error"
                                    sx={{
                                        position: 'absolute',
                                        top: 16,
                                        left: 16,
                                        fontWeight: 'bold',
                                    }}
                                />
                            )}
                        </Box>
                    </Box>

                    {/* Product Info */}
                    <Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            {/* Title and Favorite */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Typography variant="h4" component="h1" fontWeight="bold" sx={{ flex: 1, mr: 2 }}>
                                    {product.name}
                                </Typography>
                                <IconButton
                                    onClick={handleFavoriteClick}
                                    size="large"
                                    sx={{
                                        color: isFavorite(product.id) ? 'error.main' : 'grey.500',
                                    }}
                                >
                                    {isFavorite(product.id) ? <Favorite /> : <FavoriteBorder />}
                                </IconButton>
                            </Box>

                            {/* Category and Level */}
                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                <Chip
                                    label={product.category}
                                    sx={{
                                        backgroundColor: getCategoryColor(product.category),
                                        color: 'white',
                                        fontWeight: 'bold',
                                    }}
                                />
                                {product.level && (
                                    <Chip
                                        label={product.level}
                                        sx={{
                                            backgroundColor: getLevelColor(product.level),
                                            color: 'white',
                                            fontWeight: 'bold',
                                        }}
                                    />
                                )}
                            </Box>

                            {/* Rating */}
                            {product.rating && (
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Rating
                                        value={product.rating}
                                        precision={0.1}
                                        readOnly
                                        sx={{ mr: 1 }}
                                    />
                                    <Typography variant="body1" fontWeight="bold">
                                        {product.rating}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                        ({product.reviewCount} đánh giá)
                                    </Typography>
                                </Box>
                            )}

                            {/* Price */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="h4" color="primary" fontWeight="bold">
                                    {formatPrice(product.price)}
                                </Typography>
                                {hasDiscount(product) && (
                                    <Typography
                                        variant="h6"
                                        color="text.secondary"
                                        sx={{ textDecoration: 'line-through' }}
                                    >
                                        {formatPrice(product.originalPrice!)}
                                    </Typography>
                                )}
                            </Box>

                            {/* Course Details */}
                            <List sx={{ mb: 3 }}>
                                {product.instructor && (
                                    <ListItem sx={{ px: 0 }}>
                                        <ListItemIcon>
                                            <Person color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Giảng viên"
                                            secondary={product.instructor}
                                        />
                                    </ListItem>
                                )}
                                {product.duration && (
                                    <ListItem sx={{ px: 0 }}>
                                        <ListItemIcon>
                                            <AccessTime color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Thời lượng"
                                            secondary={product.duration}
                                        />
                                    </ListItem>
                                )}
                                {product.level && (
                                    <ListItem sx={{ px: 0 }}>
                                        <ListItemIcon>
                                            <School color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Trình độ"
                                            secondary={product.level}
                                        />
                                    </ListItem>
                                )}
                            </List>

                            {/* Tags */}
                            {product.tags && product.tags.length > 0 && (
                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                                        Tags:
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {product.tags.map((tag, index) => (
                                            <Chip
                                                key={index}
                                                label={tag}
                                                size="small"
                                                icon={<Tag />}
                                                variant="outlined"
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            )}

                            {/* Action Buttons */}
                            <Box sx={{ mt: 'auto', display: 'flex', gap: 2 }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    sx={{
                                        textTransform: 'none',
                                        fontWeight: 'bold',
                                        py: 1.5,
                                    }}
                                    onClick={handleAddToCart}
                                >
                                    Đăng ký khóa học
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Long Description */}
                {product.longDescription && (
                    <>
                        <Divider sx={{ my: 3 }} />
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                            Mô tả chi tiết
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                            {product.longDescription}
                        </Typography>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ProductModal; 