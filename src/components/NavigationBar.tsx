import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Badge,
    Avatar,
} from '@mui/material';
import {
    School,
    Favorite,
    History,
    Person,
    Login,
    ShoppingCart,
} from '@mui/icons-material';
import { useAuth } from '../utils/AuthContext';
import { useApp } from '../utils/AppContext';
import { useCart } from '../utils/CartContext';
import { User } from '../types';

interface NavigationBarProps {
    onNavigate: (page: string) => void;
    currentPage: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ onNavigate, currentPage }) => {
    const { isAuthenticated, user, logout } = useAuth();
    const { getCurrentUserFavorites } = useApp();
    const { cartItems } = useCart();

    return (
        <AppBar
            position="sticky"
            sx={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
        >
            <Toolbar>
                {/* Logo */}
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
                    <School sx={{ mr: 1, fontSize: 32, color: 'white' }} />
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            color: 'white',
                        }}
                        onClick={() => onNavigate('home')}
                    >
                        EduE-Com
                    </Typography>
                </Box>

                {/* Navigation */}
                <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
                    <Button
                        color="inherit"
                        onClick={() => onNavigate('home')}
                        sx={{
                            textTransform: 'none',
                            fontWeight: currentPage === 'home' ? 'bold' : 'normal',
                            backgroundColor: currentPage === 'home' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.2)',
                            },
                        }}
                    >
                        Trang chủ
                    </Button>
                    {isAuthenticated && (
                        <>
                            <Button
                                color="inherit"
                                onClick={() => onNavigate('profile')}
                                sx={{
                                    textTransform: 'none',
                                    fontWeight: currentPage === 'profile' ? 'bold' : 'normal',
                                    backgroundColor: currentPage === 'profile' ? 'rgba(255,255,255,0.2)' : 'transparent',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                    },
                                }}
                            >
                                Hồ sơ
                            </Button>
                            <Button
                                color="inherit"
                                onClick={() => onNavigate('favorites')}
                                sx={{
                                    textTransform: 'none',
                                    fontWeight: currentPage === 'favorites' ? 'bold' : 'normal',
                                    backgroundColor: currentPage === 'favorites' ? 'rgba(255,255,255,0.2)' : 'transparent',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                    },
                                }}
                            >
                                Yêu thích
                            </Button>
                            <Button
                                color="inherit"
                                onClick={() => onNavigate('history')}
                                sx={{
                                    textTransform: 'none',
                                    fontWeight: currentPage === 'history' ? 'bold' : 'normal',
                                    backgroundColor: currentPage === 'history' ? 'rgba(255,255,255,0.2)' : 'transparent',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                    },
                                }}
                            >
                                Lịch sử
                            </Button>
                        </>
                    )}
                </Box>

                {/* User Menu */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {isAuthenticated && (
                        <IconButton
                            color="inherit"
                            onClick={() => onNavigate('cart')}
                            sx={{ position: 'relative' }}
                        >
                            <Badge badgeContent={cartItems.length} color="primary">
                                <ShoppingCart sx={{ color: 'white' }} />
                            </Badge>
                        </IconButton>
                    )}
                    {isAuthenticated && (
                        <IconButton
                            color="inherit"
                            onClick={() => onNavigate('favorites')}
                            sx={{ position: 'relative' }}
                        >
                            <Badge badgeContent={getCurrentUserFavorites().length} color="error">
                                <Favorite sx={{ color: 'white' }} />
                            </Badge>
                        </IconButton>
                    )}

                    {isAuthenticated ? (
                        <IconButton
                            color="inherit"
                            onClick={() => logout()}
                            sx={{ ml: 1 }}
                        >
                            <Avatar
                                src={user?.avatar}
                                sx={{ width: 32, height: 32, backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                            >
                                {(!user?.avatar && user?.name?.charAt(0)) || <Person />}
                            </Avatar>
                        </IconButton>
                    ) : (
                        <Button
                            color="inherit"
                            startIcon={<Login />}
                            onClick={() => onNavigate('login')}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 'bold',
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                },
                            }}
                        >
                            Đăng nhập
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar; 