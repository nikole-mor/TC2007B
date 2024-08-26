// src/LoginPage.tsx
import React from 'react';
import { useLogin, useNotify, Notification } from 'react-admin';
import { useState } from 'react';
import { Button, TextField, Card, CardContent, CardActions, CircularProgress } from '@mui/material';

export const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const login = useLogin();
  const notify = useNotify();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    login({ username: email, password })
      .then(() => setLoading(false))
      .catch((error) => {
        setLoading(false);
        notify('Invalid email or password', { type: 'warning' });
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              type="email"
            />
            <TextField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              type="password"
              style={{ marginTop: '1rem' }}
            />
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
          </CardActions>
        </form>
      </Card>
      <Notification />
    </div>
  );
};