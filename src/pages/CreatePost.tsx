// src/pages/CreatePost.tsx
import { useState } from 'react';
import api from '../services/api';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const createPost = async () => {
    try {
      await api.post('/posts/', { title, content });
      alert('Post criado!');
    } catch (e) {
      alert('Erro ao criar post. Verifique se está autenticado e tem permissão.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 10 }}>
        <Typography variant="h4" gutterBottom>
          Criar Post
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField label="Título" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
          <TextField label="Conteúdo" fullWidth multiline rows={4} value={content} onChange={(e) => setContent(e.target.value)} />
          <Button variant="contained" onClick={createPost}>
            Criar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
