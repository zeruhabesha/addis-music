import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import SongsList from './pages/SongsList';
import SongForm from './pages/SongForm';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="songs" element={<SongsList />} />
              <Route path="songs/new" element={<SongForm />} />
              <Route path="songs/edit/:id" element={<SongForm />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;