// src/components/ProtectedRoute.tsx
import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('access_token');
  if (!token) return <Navigate to="/login" />;
  return children;
}
