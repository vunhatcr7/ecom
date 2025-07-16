import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import BackgroundPattern from './components/BackgroundPattern';
import { AppProvider } from './utils/AppContext';
import { AuthProvider, useAuth } from './utils/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './utils/CartContext';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

// Tạo theme tùy chỉnh
const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const { isAuthenticated } = useAuth();

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'register':
        return <RegisterPage onNavigate={handleNavigate} />;
      case 'profile':
        return (
          <ProtectedRoute isAuthenticated={isAuthenticated} onNavigate={handleNavigate}>
            <ProfilePage onNavigate={handleNavigate} />
          </ProtectedRoute>
        );
      case 'favorites':
        return (
          <ProtectedRoute isAuthenticated={isAuthenticated} onNavigate={handleNavigate}>
            <FavoritesPage onNavigate={handleNavigate} />
          </ProtectedRoute>
        );
      case 'history':
        return (
          <ProtectedRoute isAuthenticated={isAuthenticated} onNavigate={handleNavigate}>
            <HistoryPage onNavigate={handleNavigate} />
          </ProtectedRoute>
        );
      case 'cart':
        return <CartPage onNavigate={handleNavigate} />;
      case 'checkout':
        return <CheckoutPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      {/* Only show background for login/register pages */}
      {(currentPage === 'login' || currentPage === 'register') && <BackgroundPattern />}
      <ToastContainer position="top-right" autoClose={2000} />
      <Box sx={{
        minHeight: '100vh',
        position: 'relative',
        zIndex: 1,
        backgroundColor: (currentPage === 'login' || currentPage === 'register') ? 'transparent' : '#f5f5f5'
      }}>
        {/* Show Header for all pages except login/register */}
        {(currentPage !== 'login' && currentPage !== 'register') && (
          <Header
            currentPage={currentPage}
            onNavigate={handleNavigate}
          />
        )}
        <Box sx={{ pt: (currentPage === 'login' || currentPage === 'register') ? 2 : 1 }}>
          {renderPage()}
        </Box>
      </Box>
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
