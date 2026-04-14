import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { RouterProvider, createRouter, createRouteManifest } from '@tanstack/react-router';
import { theme } from './theme/theme';
import { RootLayout } from './components/layout/RootLayout';
import { Index } from './routes/index';
import { Comparison } from './routes/comparison';
import './index.css';

const routeManifest = createRouteManifest({
  routes: {
    '/': Index,
    '/comparison': Comparison,
  },
});

const router = createRouter({ routeManifest });

declare module '@tanstack/react-router' {
  register路由(router);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} defaultComponent={RootLayout} />
    </ThemeProvider>
  </React.StrictMode>,
);
