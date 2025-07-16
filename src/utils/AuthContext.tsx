import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-toastify';
import { User } from '../types';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: User) => Promise<void>;
    logout: () => void;
    register: (userData: { name: string; email: string; password: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if user is logged in on app start
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                const userData = JSON.parse(savedUser);
                setUser(userData);
                setIsAuthenticated(true);
            } catch (error) {
                localStorage.removeItem('user');
            }
        }
    }, []);

    const login = async (userData: User) => {
        try {
            // Mock API call - replace with real authentication
            await new Promise(resolve => setTimeout(resolve, 1000));

            setUser(userData);
            setIsAuthenticated(true);
            localStorage.setItem('user', JSON.stringify(userData));
            toast.success(`Chào mừng trở lại, ${userData.name}!`);
        } catch (error) {
            toast.error('Đăng nhập thất bại!');
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        toast.info('Đã đăng xuất thành công!');
    };

    const register = async (userData: { name: string; email: string; password: string }) => {
        try {
            // Mock API call - replace with real registration
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Lưu thông tin tài khoản mới (có thể lưu vào localStorage hoặc database)
            const newUser: User = {
                id: `user_${Date.now()}`,
                name: userData.name,
                email: userData.email,
                favorites: [],
                viewHistory: [],
                avatar: '',
            };

            // Lưu danh sách tài khoản đã đăng ký (mock data)
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            registeredUsers.push({
                ...newUser,
                password: userData.password, // Trong thực tế nên hash password
            });
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

            // Không tự động đăng nhập, chỉ thông báo thành công
            toast.success('Đăng ký thành công! Vui lòng đăng nhập để tiếp tục.');
        } catch (error) {
            toast.error('Đăng ký thất bại!');
            throw error;
        }
    };

    const value: AuthContextType = {
        user,
        isAuthenticated,
        login,
        logout,
        register,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 