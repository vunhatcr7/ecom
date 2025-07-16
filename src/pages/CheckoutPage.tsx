import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Button, Divider, Avatar, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useCart } from '../utils/CartContext';
import { formatPrice } from '../utils/helpers';

const paymentMethods = [
    { value: 'credit', label: 'Thẻ tín dụng/ghi nợ' },
    { value: 'momo', label: 'Momo' },
    { value: 'vnpay', label: 'VNPay' },
];

const CheckoutPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
    const { cartItems, clearCart } = useCart();
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    const [paymentMethod, setPaymentMethod] = useState('credit');
    const [loading, setLoading] = useState(false);

    const handleCheckout = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            clearCart();
            onNavigate('home');
        }, 1200);
    };

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" fontWeight="bold" color="primary.main" sx={{ flex: 1 }}>
                    Thanh toán
                </Typography>
                <Button variant="outlined" color="secondary" onClick={() => onNavigate('cart')}>
                    Quay lại giỏ hàng
                </Button>
            </Box>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
                {cartItems.length === 0 ? (
                    <Typography color="text.secondary" align="center">Không có sản phẩm nào để thanh toán.</Typography>
                ) : (
                    <>
                        {cartItems.map((item) => (
                            <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 1, borderRadius: 2, background: '#f7f8fa' }}>
                                <Avatar src={item.image} sx={{ width: 48, height: 48, mr: 2, border: '2px solid #667eea' }} />
                                <Box sx={{ flex: 1 }}>
                                    <Typography fontWeight="bold">{item.name}</Typography>
                                    <Typography color="text.secondary">{formatPrice(item.price)}</Typography>
                                </Box>
                            </Box>
                        ))}
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography fontWeight="bold">Thành tiền:</Typography>
                            <Typography variant="h5" color="primary" fontWeight="bold">
                                {formatPrice(total)}
                            </Typography>
                        </Box>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                            Phương thức thanh toán
                        </Typography>
                        <RadioGroup
                            row
                            value={paymentMethod}
                            onChange={e => setPaymentMethod(e.target.value)}
                            sx={{ mb: 2 }}
                        >
                            {paymentMethods.map(method => (
                                <FormControlLabel
                                    key={method.value}
                                    value={method.value}
                                    control={<Radio color="primary" />}
                                    label={method.label}
                                />
                            ))}
                        </RadioGroup>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            sx={{ fontWeight: 'bold', borderRadius: 2, mt: 2 }}
                            onClick={handleCheckout}
                            disabled={loading || cartItems.length === 0}
                        >
                            {loading ? 'Đang xử lý...' : 'Xác nhận thanh toán'}
                        </Button>
                    </>
                )}
            </Paper>
        </Container>
    );
};

export default CheckoutPage; 