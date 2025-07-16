import React, { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Link,
    Alert,
    InputAdornment,
    IconButton,
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    Email,
    Lock,
    School,
} from '@mui/icons-material';
import { useAuth } from '../utils/AuthContext';

interface LoginPageProps {
    onNavigate: (page: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value,
        }));
        setError(''); // Clear error when user types
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Mock login - replace with real API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Kiểm tra demo account
            if (formData.email === 'admin@example.com' && formData.password === 'password') {
                await login({
                    id: 'user1',
                    name: 'Nguyễn Văn Test',
                    email: formData.email,
                    favorites: [],
                    viewHistory: [],
                    avatar: '',
                });
                onNavigate('home');
                return;
            }

            // Kiểm tra tài khoản đã đăng ký
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            const user = registeredUsers.find((u: any) =>
                u.email === formData.email && u.password === formData.password
            );

            if (user) {
                await login({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    favorites: user.favorites || [],
                    viewHistory: user.viewHistory || [],
                    avatar: user.avatar || '',
                });
                onNavigate('home');
            } else {
                setError('Email hoặc mật khẩu không đúng!');
            }
        } catch (err) {
            setError('Đã xảy ra lỗi khi đăng nhập!');
        } finally {
            setLoading(false);
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Logo */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <School sx={{ fontSize: 40, color: 'white', mr: 1 }} />
                    <Typography variant="h4" component="h1" fontWeight="bold" sx={{ color: 'white' }}>
                        EduE-Com
                    </Typography>
                </Box>

                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        width: '100%',
                        borderRadius: 3,
                        background: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(15px)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        color: 'white',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    <Typography variant="h5" component="h2" textAlign="center" fontWeight="bold" sx={{ mb: 3 }}>
                        Đăng nhập
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2, backgroundColor: 'rgba(255,255,255,0.1)' }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formData.email}
                            onChange={handleInputChange('email')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email sx={{ color: 'rgba(255,255,255,0.7)' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    '& fieldset': {
                                        borderColor: 'rgba(255,255,255,0.3)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(255,255,255,0.5)',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'white',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'rgba(255,255,255,0.7)',
                                    '&.Mui-focused': {
                                        color: 'white',
                                    },
                                },
                            }}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mật khẩu"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleInputChange('password')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock sx={{ color: 'rgba(255,255,255,0.7)' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleTogglePasswordVisibility}
                                            edge="end"
                                            sx={{ color: 'rgba(255,255,255,0.7)' }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    '& fieldset': {
                                        borderColor: 'rgba(255,255,255,0.3)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(255,255,255,0.5)',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'white',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'rgba(255,255,255,0.7)',
                                    '&.Mui-focused': {
                                        color: 'white',
                                    },
                                },
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{
                                mt: 3,
                                mb: 2,
                                py: 1.5,
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.3)',
                                },
                                '&:disabled': {
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                },
                                textTransform: 'none',
                                fontWeight: 'bold',
                            }}
                        >
                            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        </Button>

                        <Box sx={{ textAlign: 'center' }}>
                            <Link
                                component="button"
                                variant="body2"
                                onClick={() => onNavigate('register')}
                                sx={{
                                    color: 'rgba(255,255,255,0.8)',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        color: 'white',
                                        textDecoration: 'underline',
                                    },
                                }}
                            >
                                Chưa có tài khoản? Đăng ký ngay
                            </Link>
                        </Box>
                    </Box>
                </Paper>

                {/* Demo credentials */}
                <Paper sx={{
                    mt: 2,
                    p: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                }}>
                    <Typography variant="body2" textAlign="center" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                        <strong>Demo credentials:</strong><br />
                        Email: admin@example.com<br />
                        Password: password<br /><br />
                        <strong>Hoặc đăng nhập với tài khoản vừa đăng ký</strong>
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default LoginPage; 