import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Product } from '../types';
import { useAuth } from './AuthContext';

interface UserData {
    favorites: string[];
    viewHistory: string[];
}

interface AppState {
    userData: { [userId: string]: UserData };
    currentUserId: string | null;
}

type AppAction =
    | { type: 'SET_CURRENT_USER'; payload: string | null }
    | { type: 'ADD_FAVORITE'; payload: string }
    | { type: 'REMOVE_FAVORITE'; payload: string }
    | { type: 'ADD_TO_HISTORY'; payload: string }
    | { type: 'CLEAR_HISTORY' };

const initialState: AppState = {
    userData: {},
    currentUserId: null,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUserId: action.payload,
            };
        case 'ADD_FAVORITE':
            if (!state.currentUserId) return state;
            const currentUserData = state.userData[state.currentUserId] || { favorites: [], viewHistory: [] };
            return {
                ...state,
                userData: {
                    ...state.userData,
                    [state.currentUserId]: {
                        ...currentUserData,
                        favorites: currentUserData.favorites.includes(action.payload)
                            ? currentUserData.favorites
                            : [...currentUserData.favorites, action.payload],
                    },
                },
            };
        case 'REMOVE_FAVORITE':
            if (!state.currentUserId) return state;
            const userDataForRemove = state.userData[state.currentUserId] || { favorites: [], viewHistory: [] };
            return {
                ...state,
                userData: {
                    ...state.userData,
                    [state.currentUserId]: {
                        ...userDataForRemove,
                        favorites: userDataForRemove.favorites.filter(id => id !== action.payload),
                    },
                },
            };
        case 'ADD_TO_HISTORY':
            if (!state.currentUserId) return state;
            const userDataForHistory = state.userData[state.currentUserId] || { favorites: [], viewHistory: [] };
            return {
                ...state,
                userData: {
                    ...state.userData,
                    [state.currentUserId]: {
                        ...userDataForHistory,
                        viewHistory: userDataForHistory.viewHistory.includes(action.payload)
                            ? userDataForHistory.viewHistory
                            : [action.payload, ...userDataForHistory.viewHistory.slice(0, 9)], // Giữ tối đa 10 items
                    },
                },
            };
        case 'CLEAR_HISTORY':
            if (!state.currentUserId) return state;
            const userDataForClear = state.userData[state.currentUserId] || { favorites: [], viewHistory: [] };
            return {
                ...state,
                userData: {
                    ...state.userData,
                    [state.currentUserId]: {
                        ...userDataForClear,
                        viewHistory: [],
                    },
                },
            };
        default:
            return state;
    }
};

interface AppContextType {
    state: AppState;
    addFavorite: (productId: string) => void;
    removeFavorite: (productId: string) => void;
    addToHistory: (productId: string) => void;
    clearHistory: () => void;
    isFavorite: (productId: string) => boolean;
    getFavoriteProducts: (products: Product[]) => Product[];
    getHistoryProducts: (products: Product[]) => Product[];
    getCurrentUserFavorites: () => string[];
    getCurrentUserHistory: () => string[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Load data từ localStorage
    const loadInitialState = (): AppState => {
        try {
            const savedData = localStorage.getItem('appState');
            if (savedData) {
                const parsed = JSON.parse(savedData);
                return {
                    userData: parsed.userData || {},
                    currentUserId: null, // Sẽ được set bởi useEffect
                };
            }
        } catch (error) {
            console.error('Error loading app state:', error);
        }
        return initialState;
    };

    const [state, dispatch] = useReducer(appReducer, loadInitialState());
    const { user } = useAuth();

    // Lưu state vào localStorage khi có thay đổi
    useEffect(() => {
        localStorage.setItem('appState', JSON.stringify({
            userData: state.userData,
        }));
    }, [state.userData]);

    // Tự động set current user khi user đăng nhập/đăng xuất
    useEffect(() => {
        dispatch({ type: 'SET_CURRENT_USER', payload: user?.id || null });
    }, [user?.id]);

    const addFavorite = (productId: string) => {
        dispatch({ type: 'ADD_FAVORITE', payload: productId });
    };

    const removeFavorite = (productId: string) => {
        dispatch({ type: 'REMOVE_FAVORITE', payload: productId });
    };

    const addToHistory = (productId: string) => {
        dispatch({ type: 'ADD_TO_HISTORY', payload: productId });
    };

    const clearHistory = () => {
        dispatch({ type: 'CLEAR_HISTORY' });
    };

    const isFavorite = (productId: string): boolean => {
        if (!state.currentUserId) return false;
        const userData = state.userData[state.currentUserId];
        return userData ? userData.favorites.includes(productId) : false;
    };

    const getFavoriteProducts = (products: Product[]): Product[] => {
        if (!state.currentUserId) return [];
        const userData = state.userData[state.currentUserId];
        const favorites = userData ? userData.favorites : [];
        return products.filter(product => favorites.includes(product.id));
    };

    const getHistoryProducts = (products: Product[]): Product[] => {
        if (!state.currentUserId) return [];
        const userData = state.userData[state.currentUserId];
        const viewHistory = userData ? userData.viewHistory : [];
        return products.filter(product => viewHistory.includes(product.id));
    };

    const getCurrentUserFavorites = (): string[] => {
        if (!state.currentUserId) return [];
        const userData = state.userData[state.currentUserId];
        return userData ? userData.favorites : [];
    };

    const getCurrentUserHistory = (): string[] => {
        if (!state.currentUserId) return [];
        const userData = state.userData[state.currentUserId];
        return userData ? userData.viewHistory : [];
    };

    const value: AppContextType = {
        state,
        addFavorite,
        removeFavorite,
        addToHistory,
        clearHistory,
        isFavorite,
        getFavoriteProducts,
        getHistoryProducts,
        getCurrentUserFavorites,
        getCurrentUserHistory,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}; 