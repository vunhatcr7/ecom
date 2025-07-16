import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '../types';
import { useAuth } from './AuthContext';

interface CartItem extends Product {
    addedAt: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Load cart from localStorage (per user)
    useEffect(() => {
        if (user?.id) {
            const saved = localStorage.getItem(`cart_${user.id}`);
            if (saved) setCartItems(JSON.parse(saved));
            else setCartItems([]);
        }
    }, [user?.id]);

    // Save cart to localStorage (per user)
    useEffect(() => {
        if (user?.id) {
            localStorage.setItem(`cart_${user.id}`, JSON.stringify(cartItems));
        }
    }, [cartItems, user?.id]);

    const addToCart = (product: Product) => {
        if (!cartItems.find(item => item.id === product.id)) {
            setCartItems([...cartItems, { ...product, addedAt: new Date().toISOString() }]);
        }
    };

    const removeFromCart = (productId: string) => {
        setCartItems(cartItems.filter(item => item.id !== productId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
}; 