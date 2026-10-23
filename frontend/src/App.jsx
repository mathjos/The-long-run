import navbar from './components/navbar';
import hero from './components/hero';
import Aliados from './components/Aliados';
import contactForm from './components/contactForm';
import Dashboard from './components/Dashboard'; // <--- Importamos el Dashboard
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

// Configuración del tema oscuro profesional
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
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontWeight: 700 },
  },
  shape: {
    borderRadius: 12,
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div style={{ backgroundColor: '#0f0f11', minHeight: '100vh' }}>
        <Navbar />
        <Hero />
        <Aliados />
        <ContactForm />
        <Dashboard /> {/* <--- Aquí se renderiza el Panel de Control */}
      </div>
    </ThemeProvider>
  );
}

export default App;