// src/pages/PostList.tsx
import { useEffect, useState } from 'react';
import api from '../services/api';
import { Container, Typography, Card, CardContent, Box } from '@mui/material';

export default function PostList() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    api.get('/posts/').then((res) => setPosts(res.data.results));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom mt={4}>
        Lista de Posts
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        {posts.map((post, index) => (
          <Card key={index}>
            <CardContent>
              <Typography variant="h6">{post.title}</Typography>
              <Typography variant="body2">{post.content}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
