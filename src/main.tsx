import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import { theme } from './theme/theme';
import { RootLayout } from './components/layout/RootLayout';
import { Index } from './routes/index';
import { Comparison } from './routes/comparison';
import './index.css';

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
});

const comparisonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/comparison',
  component: Comparison,
});

const routeTree = rootRoute.addChildren([indexRoute, comparisonRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
