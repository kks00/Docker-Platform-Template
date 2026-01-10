import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Paper, 
  MenuItem, 
  Alert,
  Grid
} from '@mui/material';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    gender: '',
    age: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Basic Validation
    if (!formData.username || !formData.password || !formData.name || !formData.gender || !formData.age) {
        setError('모든 필드를 입력해주세요.');
        return;
    }

    try {
      const response = await api.post('/auth/register', {
        ...formData,
        age: parseInt(formData.age, 10) // Ensure age is a number
      });
      
      setSuccess(true);
      // Optional: Clear form or redirect
      // setFormData({ username: '', password: '', name: '', gender: '', age: '' });
      setTimeout(() => {
          navigate('/search');
      }, 1500);

    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('회원가입 중 오류가 발생했습니다.');
      }
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          회원가입
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>회원가입 성공! 사용자 조회 페이지로 이동합니다.</Alert>}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="아이디 (Username)"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호 (Password)"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="이름 (Name)"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
          
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                  select
                  required
                  fullWidth
                  label="성별"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
              >
                  <MenuItem value="Male">남성</MenuItem>
                  <MenuItem value="Female">여성</MenuItem>
                  <MenuItem value="Other">그 외</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                  required
                  fullWidth
                  label="나이"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  inputProps={{ min: 0 }}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            size="large"
          >
            가입하기
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
