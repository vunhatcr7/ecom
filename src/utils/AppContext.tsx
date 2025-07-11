import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '../types';

interface AppState {
    favorites: string[];
    viewHistory: string[];
    user: {
        id: string;
        name: string;
        email: string;
    };
}

type AppAction =
    | { type: 'ADD_FAVORITE'; payload: string }
    | { type: 'REMOVE_FAVORITE'; payload: string }
    | { type: 'ADD_TO_HISTORY'; payload: string }
    | { type: 'CLEAR_HISTORY' };

const initialState: AppState = {
    favorites: ['1', '3', '5'], // Mock favorites
    viewHistory: ['1', '2', '4', '6'], // Mock view history
    user: {
        id: 'user1',
        name: 'Nguyễn Văn Test',
        email: 'test@example.com',
    },
};

const appReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
        case 'ADD_FAVORITE':
            return {
                ...state,
                favorites: state.favorites.includes(action.payload)
                    ? state.favorites
                    : [...state.favorites, action.payload],
            };
        case 'REMOVE_FAVORITE':
            return {
                ...state,
                favorites: state.favorites.filter(id => id !== action.payload),
            };
        case 'ADD_TO_HISTORY':
            return {
                ...state,
                viewHistory: state.viewHistory.includes(action.payload)
                    ? state.viewHistory
                    : [action.payload, ...state.viewHistory.slice(0, 9)], // Giữ tối đa 10 items
            };
        case 'CLEAR_HISTORY':
            return {
                ...state,
                viewHistory: [],
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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

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
        return state.favorites.includes(productId);
    };

    const getFavoriteProducts = (products: Product[]): Product[] => {
        return products.filter(product => state.favorites.includes(product.id));
    };

    const getHistoryProducts = (products: Product[]): Product[] => {
        return products.filter(product => state.viewHistory.includes(product.id));
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