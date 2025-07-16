import React from 'react';
import { Container, Typography, Box, Paper, Button, Divider, Avatar } from '@mui/material';
import { useCart } from '../utils/CartContext';
import { formatPrice } from '../utils/helpers';

const CartPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" fontWeight="bold" color="primary.main" sx={{ flex: 1 }}>
                    Giỏ hàng
                </Typography>
                <Button variant="outlined" color="secondary" onClick={clearCart} disabled={cartItems.length === 0}>
                    Xóa tất cả
                </Button>
            </Box>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
                {cartItems.length === 0 ? (
                    <Typography color="text.secondary" align="center">Giỏ hàng của bạn đang trống.</Typography>
                ) : (
                    <>
                        {cartItems.map((item) => (
                            <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 1, borderRadius: 2, background: '#f7f8fa' }}>
                                <Avatar src={item.image} sx={{ width: 56, height: 56, mr: 2, border: '2px solid #667eea' }} />
                                <Box sx={{ flex: 1 }}>
                                    <Typography fontWeight="bold">{item.name}</Typography>
                                    <Typography color="text.secondary">{formatPrice(item.price)}</Typography>
                                </Box>
                                <Button variant="outlined" color="error" onClick={() => removeFromCart(item.id)}>
                                    Xóa
                                </Button>
                            </Box>
                        ))}
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography fontWeight="bold">Tổng cộng:</Typography>
                            <Typography variant="h5" color="primary" fontWeight="bold">
                                {formatPrice(total)}
                            </Typography>
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            sx={{ mt: 3, fontWeight: 'bold', borderRadius: 2 }}
                            onClick={() => onNavigate('checkout')}
                            disabled={cartItems.length === 0}
                        >
                            Thanh toán
                        </Button>
                    </>
                )}
            </Paper>
        </Container>
    );
};

export default CartPage; 