import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Paper,
    Card,
    // CardContent,
    Avatar,
    Chip,
    Button,
    // Divider,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    // IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    // Alert,
} from '@mui/material';
import {
    Person,
    School,
    AccessTime,
    AccountBalance,
    Edit,
    PlayArrow,
    Star,
    // TrendingUp,
    // Book,
    // CalendarToday,
    // MonetizationOn,
} from '@mui/icons-material';
import { Product, User } from '../types';
import { mockProducts } from '../data/mockData';
import { useAuth } from '../utils/AuthContext';
// import { useApp } from '../utils/AppContext';
// import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import CourseProgress from '../components/CourseProgress';

interface ProfilePageProps {
    onNavigate: (page: string) => void;
}

interface PurchasedCourse extends Product {
    purchaseDate: string;
    progress: number; // 0-100
    totalTimeSpent: number; // minutes
    lastAccessed: string;
}

interface UserProfile {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    joinDate: string;
    totalCourses: number;
    totalTimeSpent: number; // minutes
    balance: number;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    achievements: string[];
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
    const { user, login } = useAuth();
    // const { getCurrentUserFavorites } = useApp();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editForm, setEditForm] = useState({
        name: user?.name || '',
        email: user?.email || '',
        avatar: user?.avatar || '',
    });
    const [avatarPreview, setAvatarPreview] = useState<string>(user?.avatar || '');
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setAvatarPreview(ev.target?.result as string);
                setEditForm((prev) => ({ ...prev, avatar: ev.target?.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Mock data cho profile
    const userProfile: UserProfile = {
        id: user?.id || 'user1',
        name: user?.name || 'Nguyễn Văn Test',
        email: user?.email || 'test@example.com',
        joinDate: '2024-01-15',
        totalCourses: 3,
        totalTimeSpent: 1240, // 20 hours 40 minutes
        balance: 2500000, // 2.5M VND
        level: 'Intermediate',
        achievements: [
            'Hoàn thành 5 khóa học',
            'Học liên tục 7 ngày',
            'Đạt điểm cao nhất lớp',
        ],
    };

    // Mock data cho khóa học đã mua
    const purchasedCourses: PurchasedCourse[] = [
        {
            ...mockProducts[0],
            purchaseDate: '2024-01-20',
            progress: 75,
            totalTimeSpent: 480, // 8 hours
            lastAccessed: '2024-01-25',
        },
        {
            ...mockProducts[2],
            purchaseDate: '2024-01-22',
            progress: 45,
            totalTimeSpent: 360, // 6 hours
            lastAccessed: '2024-01-24',
        },
        {
            ...mockProducts[4],
            purchaseDate: '2024-01-25',
            progress: 20,
            totalTimeSpent: 120, // 2 hours
            lastAccessed: '2024-01-25',
        },
    ];

    const handleViewDetail = (product: Product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedProduct(null);
    };

    const handleEditProfile = () => {
        setEditDialogOpen(true);
    };

    const handleSaveProfile = async () => {
        // Mock save - trong thực tế sẽ gọi API
        const updatedUser: User = {
            id: user?.id ?? 'user1',
            name: editForm.name,
            email: editForm.email,
            avatar: editForm.avatar,
            favorites: user?.favorites ?? [],
            viewHistory: user?.viewHistory ?? [],
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        await login(updatedUser);
        setEditDialogOpen(false);
    };

    const formatTime = (minutes: number): string => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'Beginner': return 'success';
            case 'Intermediate': return 'warning';
            case 'Advanced': return 'info';
            case 'Expert': return 'error';
            default: return 'default';
        }
    };

    return (
        <Container maxWidth="xl" sx={{ py: 3 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Button
                    startIcon={<Person />}
                    onClick={() => onNavigate('home')}
                    sx={{ mr: 2 }}
                >
                    Quay lại
                </Button>
                <Typography variant="h4" fontWeight="bold">
                    Hồ sơ cá nhân
                </Typography>
            </Box>

            {/* Stats Cards */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                gap: 2,
                mb: 3
            }}>
                <Card sx={{ textAlign: 'center', p: 2 }}>
                    <School sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h4" fontWeight="bold">
                        {userProfile.totalCourses}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Khóa học đã mua
                    </Typography>
                </Card>
                <Card sx={{ textAlign: 'center', p: 2 }}>
                    <AccessTime sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                    <Typography variant="h4" fontWeight="bold">
                        {formatTime(userProfile.totalTimeSpent)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Thời gian học
                    </Typography>
                </Card>
                <Card sx={{ textAlign: 'center', p: 2 }}>
                    <AccountBalance sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                    <Typography variant="h4" fontWeight="bold">
                        {formatCurrency(userProfile.balance)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Số dư tài khoản
                    </Typography>
                </Card>
            </Box>

            {/* Grid 2 cột: Profile Card + Achievements */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 3,
                mb: 3
            }}>
                {/* Profile Card */}
                <Box>
                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                        <Avatar
                            src={user?.avatar}
                            sx={{
                                width: 120,
                                height: 120,
                                mx: 'auto',
                                mb: 2,
                                fontSize: '3rem',
                                backgroundColor: 'primary.main',
                            }}
                        >
                            {(!user?.avatar && userProfile.name.charAt(0))}
                        </Avatar>
                        <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                            {userProfile.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {userProfile.email}
                        </Typography>
                        <Chip
                            label={userProfile.level}
                            color={getLevelColor(userProfile.level) as any}
                            sx={{ mb: 2 }}
                        />
                        <Box sx={{ textAlign: 'left', mb: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                Tham gia: {formatDate(userProfile.joinDate)}
                            </Typography>
                        </Box>
                        <Button
                            variant="outlined"
                            startIcon={<Edit />}
                            onClick={handleEditProfile}
                            fullWidth
                        >
                            Chỉnh sửa hồ sơ
                        </Button>
                    </Paper>
                </Box>
                {/* Achievements */}
                <Box>
                    <Paper sx={{ p: 11, textAlign: 'center' }}>
                        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                            Thành tích
                        </Typography>
                        <List>
                            {userProfile.achievements.map((achievement, index) => (
                                <ListItem key={index} sx={{ px: 0 }}>
                                    <ListItemAvatar>
                                        <Star sx={{ color: 'warning.main' }} />
                                    </ListItemAvatar>
                                    <ListItemText primary={achievement} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Box>
            </Box>

            {/* Box Khóa học đã mua - Đặt ngay dưới, chiếm toàn bộ chiều ngang */}
            <Box sx={{ mb: 3 }}>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                        Khóa học đã mua ({purchasedCourses.length})
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {purchasedCourses.map((course) => (
                            <Card key={course.id} sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                    <Avatar
                                        src={course.image}
                                        sx={{ width: 60, height: 60, mr: 2 }}
                                    />
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="h6" fontWeight="bold">
                                            {course.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Mua ngày: {formatDate(course.purchaseDate)}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Truy cập lần cuối: {formatDate(course.lastAccessed)}
                                        </Typography>
                                        <CourseProgress progress={course.progress} size="small" />
                                    </Box>
                                </Box>
                                <Box sx={{ textAlign: 'right', ml: 2 }}>
                                    <Typography variant="h6" color="primary" fontWeight="bold">
                                        {course.progress}%
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {formatTime(course.totalTimeSpent)}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        startIcon={<PlayArrow />}
                                        size="small"
                                        sx={{ mt: 1 }}
                                        onClick={() => handleViewDetail(course)}
                                    >
                                        Tiếp tục học
                                    </Button>
                                </Box>
                            </Card>
                        ))}
                    </Box>
                </Paper>
            </Box>

            {/* Edit Profile Dialog */}
            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Chỉnh sửa hồ sơ</DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 1 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                            <Avatar
                                src={avatarPreview}
                                sx={{ width: 80, height: 80, mb: 1 }}
                            >
                                {(!avatarPreview && userProfile.name.charAt(0))}
                            </Avatar>
                            <Button
                                variant="outlined"
                                component="label"
                                size="small"
                            >
                                Chọn ảnh đại diện
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={handleAvatarChange}
                                />
                            </Button>
                        </Box>
                        <TextField
                            fullWidth
                            label="Họ và tên"
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            value={editForm.email}
                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                            type="email"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)}>
                        Hủy
                    </Button>
                    <Button onClick={handleSaveProfile} variant="contained">
                        Lưu thay đổi
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Product Detail Modal */}
            <ProductModal
                product={selectedProduct}
                open={modalOpen}
                onClose={handleCloseModal}
            />
        </Container>
    );
};

export default ProfilePage; 