import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Badge,
    Menu,
    MenuItem,
    Avatar,
    Divider,
} from '@mui/material';
import {
    School,
    Favorite,
    History,
    Person,
    Logout,
    Login,
    ShoppingCart,
} from '@mui/icons-material';
import { useApp } from '../utils/AppContext';
import { useAuth } from '../utils/AuthContext';
import { useCart } from '../utils/CartContext';
import { User } from '../types';

interface HeaderProps {
    onNavigate: (page: string) => void;
    currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
    const { getCurrentUserFavorites } = useApp();
    const { user, isAuthenticated, logout } = useAuth();
    const { cartItems } = useCart();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNavigation = (page: string) => {
        onNavigate(page);
        handleMenuClose();
    };

    const handleLogout = () => {
        logout();
        onNavigate('home');
        handleMenuClose();
    };

    return (
        <AppBar
            position="sticky"
            sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            }}
        >
            <Toolbar>
                {/* Logo */}
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
                    <School sx={{ mr: 1, fontSize: 32 }} />
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            fontWeight: 'bold',
                            cursor: 'pointer',
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
                            backgroundColor: currentPage === 'home' ? 'rgba(255,255,255,0.1)' : 'transparent',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.1)',
                            },
                        }}
                    >
                        Trang chủ
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => onNavigate('favorites')}
                        sx={{
                            textTransform: 'none',
                            fontWeight: currentPage === 'favorites' ? 'bold' : 'normal',
                            backgroundColor: currentPage === 'favorites' ? 'rgba(255,255,255,0.1)' : 'transparent',
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
                            backgroundColor: currentPage === 'history' ? 'rgba(255,255,255,0.1)' : 'transparent',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.1)',
                            },
                        }}
                    >
                        Lịch sử
                    </Button>
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
                                <ShoppingCart />
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
                                <Favorite />
                            </Badge>
                        </IconButton>
                    )}

                    {isAuthenticated ? (
                        <IconButton
                            color="inherit"
                            onClick={handleMenuOpen}
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
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                },
                            }}
                        >
                            Đăng nhập
                        </Button>
                    )}

                    {isAuthenticated && (
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            PaperProps={{
                                sx: {
                                    mt: 1,
                                    minWidth: 200,
                                    borderRadius: 2,
                                },
                            }}
                        >
                            <MenuItem onClick={() => handleNavigation('profile')}>
                                <Person sx={{ mr: 2 }} />
                                Hồ sơ cá nhân
                            </MenuItem>
                            <MenuItem onClick={() => handleNavigation('favorites')}>
                                <Favorite sx={{ mr: 2 }} />
                                Yêu thích ({getCurrentUserFavorites().length})
                            </MenuItem>
                            <MenuItem onClick={() => handleNavigation('history')}>
                                <History sx={{ mr: 2 }} />
                                Lịch sử xem
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleLogout}>
                                <Logout sx={{ mr: 2 }} />
                                Đăng xuất
                            </MenuItem>
                        </Menu>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header; 