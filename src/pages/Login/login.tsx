import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Grid,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Send } from '@mui/icons-material';
import { FormEvent, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import {
  STORAGE_CURRENT_USER,
  STORAGE_USERS_KEY,
} from '../../services/constants';

export const Login = () => {
  const navigate = useNavigate();
  const [storage, setStorage] = useLocalStorage(STORAGE_CURRENT_USER, {
    isLogged: false,
    email: '',
  });
  useEffect(() => {
    const getLogged = localStorage.getItem(STORAGE_CURRENT_USER);
    setStorage(storage);
  }, []);

  const mutation = useMutation(
    ({ email, password }: { email: string; password: string }) => {
      return new Promise((resolve, reject) => {
        const getUsers = localStorage.getItem(STORAGE_USERS_KEY);
        const parseUsers = JSON.parse(getUsers!);

        if (parseUsers === null) {
          return setTimeout(
            () => reject({ success: false, message: 'Something went wrong' }),
            1000
          );
        }

        const filteredUsers = parseUsers.filter(
          (el: any) => el.email === email && el.password === password
        );

        if (!filteredUsers.length) {
          return setTimeout(
            () => reject({ success: false, message: 'Something went wrong' }),
            5000
          );
        }

        setTimeout(
          () => resolve({ success: true, message: 'Login successfull', email }),
          5000
        );
      });
    },
    {
      onSuccess: async (res: any) => {
        setStorage({
          isLogged: true,
          email: res.email,
        });

        setTimeout(() => {
          navigate('/series');
        }, 6000);
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

  if (storage.isLogged) {
    return <Navigate to="/series" />;
  }

  return (
    <>
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link to="/register">Register</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};
