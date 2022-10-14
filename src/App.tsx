import { Container } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { MenuBar } from './components/menu-bar';
import { Router } from './pages/router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Container component="main" maxWidth="xl">
          <MenuBar />
          <Router />
        </Container>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
