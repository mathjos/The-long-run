import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  LinearProgress, 
  Paper, 
  Grid, 
  Chip, 
  Slider, 
  Alert, 
  AlertTitle,
  CircularProgress,
  Stack
} from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import VerifiedIcon from '@mui/icons-material/Verified';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [kilometers, setKilometers] = useState(124);
  const [kmToAdd, setKmToAdd] = useState(5);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const targetKm = 500;
  const progress = Math.min((kilometers / targetKm) * 100, 100);

  // Obtener kilómetros acumulados del servidor al cargar la página
  useEffect(() => {
    fetch('http://localhost:5000/api/kilometros')
      .then(res => res.json())
      .then(data => {
        if (data.acumulado !== undefined) setKilometers(data.acumulado);
      })
      .catch(err => console.log('El servidor backend no está activo aún:', err));
  }, []);

  // Registrar nuevos kilómetros mediante petición POST a Express
  const handleRegisterKm = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/kilometros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ km: kmToAdd })
      });
      const data = await response.json();
      if (response.ok) {
        setKilometers(data.acumulado);
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    } finally {
      setLoading(false);
    }
  };
   return (
    <Box id="inicio" sx={{ py: 10, background: 'radial-gradient(circle at top, #1c1c24 0%, #0f0f11 100%)' }}>
      <Container maxWidth="md">
        <Box textAlign="center" mb={5}>
          <Chip 
            icon={<VerifiedIcon sx={{ color: '#fc4c02 !important', fontSize: 18 }} />} 
            label="Iniciativa de Impacto Social — Guayaquil" 
            sx={{ 
              color: '#e0e0e0', 
              backgroundColor: '#1f1f28', 
              mb: 3, 
              px: 1, 
              py: 2, 
              fontWeight: 500, 
              border: '1px solid #2e2e3a',
              transition: 'transform 0.2s ease, border-color 0.2s ease',
              '&:hover': { transform: 'scale(1.03)', borderColor: '#fc4c02' }
            }} 
          />
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              color: '#ffffff', 
              fontWeight: 800, 
              mb: 2, 
              fontSize: { xs: '2.5rem', md: '3.8rem' },
              transition: 'color 0.3s ease',
              '&:hover': { color: '#fc4c02' }
            }}
          >
            THE LONG RUN
          </Typography>
          <Typography variant="h6" sx={{ color: '#9494a0', fontWeight: 400, maxWidth: 620, mx: 'auto', lineHeight: 1.6 }}>
            Plataforma de seguimiento de actividad física para la gestión de donaciones e impacto en causas sociales comunitarias.
          </Typography>
        </Box>

        {/* Tarjeta Dashboard */}
        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, backgroundColor: '#16161c', border: '1px solid #262632' }}>
          
          {/* Alerta de confirmación con MUI Alert */}
          {showAlert && (
            <Alert 
              severity="success" 
              onClose={() => setShowAlert(false)}
              sx={{ mb: 3, backgroundColor: '#122e1a', color: '#81c784', border: '1px solid #2e7d32' }}
            >
              <AlertTitle sx={{ fontWeight: 'bold' }}>¡Actividad Registrada!</AlertTitle>
              Has sumado exitosamente <strong>{kmToAdd} km</strong> a la meta comunitaria.
            </Alert>
          )}

          <Grid container spacing={3} alignItems="center" mb={4}>
            <Grid item xs={12} sm={4} textAlign="center">
              <Typography variant="caption" sx={{ color: '#71717a', fontWeight: 600, letterSpacing: 1 }}>
                ACUMULADO ACTUAL
              </Typography>
              <Typography variant="h3" sx={{ color: '#fc4c02', fontWeight: 800, mt: 0.5 }}>
                {kilometers} <Typography component="span" variant="h6" sx={{ color: '#a1a1aa' }}>KM</Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} textAlign="center">
              <Typography variant="caption" sx={{ color: '#71717a', fontWeight: 600, letterSpacing: 1 }}>
                META MENSUAL
              </Typography>
              <Typography variant="h3" sx={{ color: '#ffffff', fontWeight: 800, mt: 0.5 }}>
                {targetKm} <Typography component="span" variant="h6" sx={{ color: '#a1a1aa' }}>KM</Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} textAlign="center">
              <Typography variant="caption" sx={{ color: '#71717a', fontWeight: 600, letterSpacing: 1 }}>
                CUMPLIMIENTO
              </Typography>
              <Typography variant="h3" sx={{ color: '#22c55e', fontWeight: 800, mt: 0.5 }}>
                {progress.toFixed(0)}%
              </Typography>
            </Grid>
          </Grid>

          {/* Barra de Progreso MUI */}
          <Box mb={4} px={1}>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ 
                height: 10, 
                borderRadius: 5, 
                backgroundColor: '#272730', 
                '& .MuiLinearProgress-bar': { backgroundColor: '#fc4c02', borderRadius: 5 } 
              }} 
            />
          </Box>

          {/* Control Deslizante (MUI Slider) */}
          <Box sx={{ px: 3, mb: 4 }}>
            <Typography variant="body2" sx={{ color: '#a0a0ab', mb: 1, textAlign: 'center', fontWeight: 600 }}>
              Distancia a registrar: <span style={{ color: '#fc4c02' }}>{kmToAdd} KM</span>
            </Typography>
            <Slider
              value={kmToAdd}
              min={1}
              max={25}
              step={1}
              onChange={(e, newValue) => setKmToAdd(newValue)}
              valueLabelDisplay="auto"
              sx={{
                color: '#fc4c02',
                '& .MuiSlider-thumb': {
                  transition: 'box-shadow 0.2s, transform 0.2s',
                  '&:hover, &.Mui-focusVisible': {
                    boxShadow: '0px 0px 0px 8px rgba(252, 76, 2, 0.2)',
                  },
                },
                '& .Mui-focusVisible': {
                  outline: '2px solid #fc4c02',
                  outlineOffset: '2px',
                }
              }}
            />
          </Box>

          {/* Botones con Íconos, Texto y Carga */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center">
            <Button
              variant="contained"
              disableElevation
              size="large"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <DirectionsRunIcon />}
              endIcon={!loading && <EmojiEventsIcon />}
              onClick={handleRegisterKm}
              sx={{ 
                backgroundColor: '#fc4c02', 
                color: '#fff',
                px: 4, 
                py: 1.8, 
                borderRadius: 3, 
                fontWeight: 700, 
                fontSize: '0.95rem',
                textTransform: 'none',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  backgroundColor: '#d93d00',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(252, 76, 2, 0.3)'
                },
                '&:focus-visible': {
                  outline: '3px solid #ffffff',
                  outlineOffset: '2px',
                }
              }}
            >
              {loading ? 'Procesando...' : `Registrar +${kmToAdd} KM`}
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<RestartAltIcon />}
              onClick={() => {
                setKilometers(124);
                setKmToAdd(5);
                setShowAlert(false);
              }}
              sx={{ 
                color: '#a0a0ab', 
                borderColor: '#2e2e3a',
                py: 1.8, 
                px: 3,
                borderRadius: 3, 
                fontWeight: 600,
                textTransform: 'none',
                transition: 'all 0.2s ease',
                '&:hover': { 
                  borderColor: '#fc4c02', 
                  color: '#fff',
                  backgroundColor: 'rgba(252, 76, 2, 0.05)'
                },
                '&:focus-visible': {
                  outline: '2px solid #fc4c02',
                  outlineOffset: '2px',
                }
              }}
            >
              Reiniciar
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}