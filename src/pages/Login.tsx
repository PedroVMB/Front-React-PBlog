// src/pages/Login.tsx
import { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await api.post('/token/', {
        username: email,
        password: password,
      });
      localStorage.setItem('access_token', response.data.access);
      navigate('/posts');
    } catch (error) {
      alert('Credenciais inválidas');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Login
          </Typography>
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              label="Usuário"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Senha"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              fullWidth
              onClick={login}
              sx={{ mt: 1 }}
            >
              Entrar
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
