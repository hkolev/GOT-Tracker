import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Grid,
  Snackbar,
} from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';
import { Send } from '@mui/icons-material';
import { FormEvent, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { STORAGE_USERS_KEY } from '../../services/constants';
import { AlertColor } from '@material-ui/core';
import { Alert } from '../../components/Alert';

export const Register = () => {
  const navigate = useNavigate();
  const [snackbar, setStanckbar] = useState<{
    isOpen: boolean;
    severity: AlertColor;
    msg: string;
  }>({
    isOpen: false,
    severity: 'success',
    msg: '',
  });

  const mutation = useMutation(
    ({ email, password }: { email: string; password: string }) => {
      return new Promise((resolve, reject) => {
        const getUsers = localStorage.getItem(STORAGE_USERS_KEY);
        const parsedUsers = JSON.parse(getUsers!);

        if (email === '' || password === '') {
          return setTimeout(
            () =>
              reject({
                success: false,
                message: 'Please provide email or password',
              }),
            500
          );
        }

        if (getUsers === null) {
          localStorage.setItem(
            STORAGE_USERS_KEY,
            JSON.stringify([
              {
                email,
                password,
                favourites: [],
              },
            ])
          );

          return setTimeout(() => resolve({ success: true }), 500);
        }

        const hasSuchUser = parsedUsers.filter((el: any) => el.email === email);

        if (hasSuchUser.length > 0) {
          return setTimeout(
            () => reject({ success: false, message: 'User already exists' }),
            500
          );
        }

        parsedUsers.push({
          email,
          password,
          favourites: [],
        });

        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(parsedUsers));

        return setTimeout(
          () =>
            resolve({
              success: true,
              message:
                'A user is created. Will be redirected to the Login page in 5 seconds!',
            }),
          500
        );
      });
    },
    {
      onSuccess: async (res: any) => {
        setStanckbar({
          isOpen: true,
          severity: 'success',
          msg: res.message,
        });

        setTimeout(() => {
          navigate('/login');
        }, 5000);
      },
      onError: async (res: any) => {
        setStanckbar({
          isOpen: true,
          severity: 'error',
          msg: res.message,
        });
      },
    }
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    mutation.mutate({
      email: data.get('email') as string,
      password: data.get('password') as string,
    });
  };

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <LoadingButton
            endIcon={<Send />}
            loading={mutation.isLoading}
            loadingPosition="end"
            variant="contained"
            sx={{ width: '100%' }}
            type="submit"
          >
            Register
          </LoadingButton>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link to="/login">Login</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Snackbar open={snackbar.isOpen} autoHideDuration={6000}>
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.msg}
        </Alert>
      </Snackbar>
    </Container>
  );
};
