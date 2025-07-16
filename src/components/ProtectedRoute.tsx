import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { School } from '@mui/icons-material';

interface ProtectedRouteProps {
    children: React.ReactNode;
    isAuthenticated: boolean;
    onNavigate: (page: string) => void;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    isAuthenticated,
    onNavigate,
}) => {
    if (!isAuthenticated) {
        return (
            <Container maxWidth="sm" sx={{ py: 8 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <School sx={{ fontSize: 60, color: 'primary.main', mr: 2 }} />
                        <Typography variant="h3" component="h1" fontWeight="bold" color="primary">
                            EduE-Com
                        </Typography>
                    </Box>

                    <Typography variant="h5" component="h2" sx={{ mb: 2, color: 'text.secondary' }}>
                        Vui lòng đăng nhập để tiếp tục
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
                        Bạn cần đăng nhập để truy cập tính năng này
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => onNavigate('login')}
                            sx={{
                                px: 4,
                                py: 1.5,
                                textTransform: 'none',
                                fontWeight: 'bold',
                            }}
                        >
                            Đăng nhập
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => onNavigate('register')}
                            sx={{
                                px: 4,
                                py: 1.5,
                                textTransform: 'none',
                                fontWeight: 'bold',
                            }}
                        >
                            Đăng ký
                        </Button>
                    </Box>
                </Box>
            </Container>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute; 