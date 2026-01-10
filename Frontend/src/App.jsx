import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme, Box, Typography, Container, Link } from '@mui/material';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import UserLookup from './pages/UserLookup';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    }
  },
});

function Home() {
  return (
    <Container sx={{ mt: { xs: 4, md: 8 }, textAlign: 'center' }}>
      <Typography variant="h3" sx={{ fontSize: { xs: '2rem', md: '3rem' } }} gutterBottom>
        Welcome to Docker Web App
      </Typography>
      <Typography variant="h6" color="textSecondary" paragraph sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
        회원가입하고 사용자를 조회해보세요.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Typography variant="body1">
          상단 메뉴를 이용해 기능을 확인할 수 있습니다.
        </Typography>
      </Box>
    </Container>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1, py: 2 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/search" element={<UserLookup />} />
            </Routes>
          </Box>
          <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: '#e0e0e0', textAlign: 'center' }}>
             <Typography variant="body2" color="textSecondary">
                Docker Web App © 2026
             </Typography>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
