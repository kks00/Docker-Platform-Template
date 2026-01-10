import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Card, 
  CardContent, 
  Avatar, 
  Grid,
  Alert,
  Paper
} from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PersonIcon from '@mui/icons-material/Person';
import api from '../api';

const UserLookup = () => {
  const [username, setUsername] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setUserInfo(null);

    try {
      // GET /api/user/:username
      const response = await api.get(`/user/${username}`);
      setUserInfo(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('사용자를 찾을 수 없습니다.');
      } else {
        setError('사용자 조회 중 오류가 발생했습니다.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom display="flex" alignItems="center" gap={1}>
           <PersonSearchIcon fontSize="large" /> 사용자 조회
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          아이디를 입력하여 사용자 정보를 검색하세요.
        </Typography>

        <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: 'center' }}>
          <TextField
            fullWidth
            label="아이디 (Username)"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="검색할 아이디 입력"
          />
          <Button 
            variant="contained" 
            size="large" 
            type="submit" 
            disabled={loading}
            sx={{ minWidth: 100, height: '56px', width: { xs: '100%', sm: 'auto' } }}
          >
            {loading ? '검색 중...' : '조회'}
          </Button>
        </Box>
      </Paper>

      {error && (
        <Alert severity="warning">{error}</Alert>
      )}

      {userInfo && (
        <Card elevation={4} sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
          <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: 'primary.main' }}>
            <PersonIcon fontSize="large" />
          </Avatar>
          <CardContent sx={{ width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" align="center" gutterBottom>
                  {userInfo.name}
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
                  @{userInfo.username}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                 <Typography variant="body1"><strong>성별:</strong> {userInfo.gender}</Typography>
              </Grid>
              <Grid item xs={6}>
                 <Typography variant="body1"><strong>나이:</strong> {userInfo.age}세</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default UserLookup;
