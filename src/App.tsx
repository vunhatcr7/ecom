import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import HistoryPage from './pages/HistoryPage';
import { AppProvider } from './utils/AppContext';

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

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'favorites':
        return <FavoritesPage onNavigate={handleNavigate} />;
      case 'history':
        return <HistoryPage onNavigate={handleNavigate} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
          <Header
            currentPage={currentPage}
            onNavigate={handleNavigate}
          />
          <Box sx={{ pt: 1 }}>
            {renderPage()}
          </Box>
        </Box>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
