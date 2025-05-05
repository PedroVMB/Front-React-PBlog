import { useState, useEffect } from 'react';
import api from '../services/api';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

interface User {
  id: number;
  username: string;
  email: string;
}

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [authorId, setAuthorId] = useState<number | ''>('');
  useEffect(() => {
    api
      .get('/users/')
      .then((response) => setUsers(response.data.results))
      .catch((error) => {
        console.error('Erro ao buscar usuários:', error);
        alert('Erro ao carregar usuários.');
      });
  }, []);
  

  const createPost = async () => {
    if (!authorId) {
      alert('Selecione um autor para o post.');
      return;
    }

    try {
      await api.post('/posts/', {
        title,
        content,
        published,
        author: authorId,
      });
      alert('Post criado!');
      setTitle('');
      setContent('');
      setPublished(false);
      setAuthorId('');
    } catch (e) {
      console.error(e);
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
          <TextField
            label="Título"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Conteúdo"
            fullWidth
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="author-label">Autor</InputLabel>
            <Select
              labelId="author-label"
              value={authorId}
              onChange={(e) => setAuthorId(Number(e.target.value))}
              label="Autor"
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.username} ({user.email})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
              />
            }
            label="Publicar"
          />
          <Button variant="contained" onClick={createPost}>
            Criar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
