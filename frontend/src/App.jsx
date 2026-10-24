import { useState } from 'react';
import InitScreen from './components/InitScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UserProfile from './components/UserProfile';
import Aliados from './components/Aliados';
import ContactForm from './components/ContactForm';
import Dashboard from './components/Dashboard';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fc4c02',
    },
    background: {
      default: '#0f0f11',
      paper: '#18181c',
    },
    text: {
      primary: '#ffffff',
      secondary: '#a0a0ab',
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
});

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      
      {/* Pantalla de Carga Inicial Profesional */}
      {loading && <InitScreen onFinish={() => setLoading(false)} />}

      <div style={{ backgroundColor: '#0f0f11', minHeight: '100vh' }}>
        <Navbar />
        <Hero />
        <UserProfile />
        <Aliados />
        <ContactForm />
        <Dashboard />
      </div>
    </ThemeProvider>
  );
}