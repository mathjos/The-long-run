import { useState, useEffect } from 'react';
import { Container, Typography, Box, Slider, Button, Paper, LinearProgress } from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

export default function Hero({ onKilometrosChange }) {
  const [kmRegistrados, setKmRegistrados] = useState(0);
  const [meta] = useState(500);
  const [kmInput, setKmInput] = useState(5);
  const [cargando, setCargando] = useState(false);

  const obtenerKilometros = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/kilometros');
      const data = await res.json();
      setKmRegistrados(data.acumulado || 0);
    } catch (err) {
      console.error('Error al obtener kilómetros:', err);
    }
  };

  useEffect(() => {
    obtenerKilometros();
  }, []);

  const handleSumarKilometros = async () => {
    if (kmInput <= 0) return;
    setCargando(true);
    try {
      const res = await fetch('http://localhost:5000/api/kilometros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ km: Number(kmInput) })
      });
      const data = await res.json();
      if (res.ok) {
        setKmRegistrados(data.acumulado);
        if (onKilometrosChange) onKilometrosChange(); // Notifica al Dashboard o componentes padres
      }
    } catch (err) {
      console.error('Error al registrar kilómetros:', err);
    } finally {
      setCargando(false);
    }
  };

  const porcentaje = Math.min(Math.round((kmRegistrados / meta) * 100), 100);

  return (
    <Box sx={{ pt: 12, pb: 8, backgroundColor: '#0f0f11', color: '#fff' }}>
      <Container maxWidth="md">
        <Box textAlign="center" mb={6}>
          <Typography variant="h2" sx={{ fontWeight: 900, fontFamily: 'monospace', letterSpacing: -1, mb: 2 }}>
            CADA KILÓMETRO <Box component="span" sx={{ color: '#fc4c02' }}>CUENTA</Box>
          </Typography>
          <Typography variant="h6" sx={{ color: '#a0a0ab', maxWidth: 600, mx: 'auto' }}>
            Únete a la maratón con propósito social en Guayaquil. Convierte tu esfuerzo físico en donaciones reales.
          </Typography>
        </Box>

        {/* Métrica Global */}
        <Paper elevation={0} sx={{ p: 4, backgroundColor: '#16161c', border: '1px solid #262632', borderRadius: 4, mb: 4 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <DirectionsRunIcon sx={{ color: '#fc4c02' }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>META COMUNITARIA</Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#fc4c02' }}>
              {kmRegistrados} / {meta} KM
            </Typography>
          </Box>

          <LinearProgress 
            variant="determinate" 
            value={porcentaje} 
            sx={{ 
              height: 12, 
              borderRadius: 6, 
              backgroundColor: '#262632',
              '& .MuiLinearProgress-bar': { backgroundColor: '#fc4c02' }
            }} 
          />
          <Typography variant="caption" sx={{ color: '#71717a', mt: 1, display: 'block', textAlign: 'right' }}>
            {porcentaje}% de la meta alcanzada
          </Typography>
        </Paper>

        {/* Controles de Registro de KM */}
        <Paper elevation={0} sx={{ p: 4, backgroundColor: '#16161c', border: '1px solid #262632', borderRadius: 4 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocalFireDepartmentIcon sx={{ color: '#fc4c02' }} /> REGISTRA TU ENTRENAMIENTO
          </Typography>

          <Box sx={{ px: 2, mb: 3 }}>
            <Slider
              value={kmInput}
              min={1}
              max={42}
              valueLabelDisplay="auto"
              onChange={(e, val) => setKmInput(val)}
              sx={{
                color: '#fc4c02',
                '& .MuiSlider-thumb': { backgroundColor: '#fff' },
                '& .MuiSlider-track': { backgroundColor: '#fc4c02' },
                '& .MuiSlider-rail': { backgroundColor: '#262632' }
              }}
            />
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Distancia a sumar: <Box component="span" sx={{ color: '#fc4c02' }}>{kmInput} KM</Box>
            </Typography>

            <Button
              variant="contained"
              onClick={handleSumarKilometros}
              disabled={cargando}
              sx={{ backgroundColor: '#fc4c02', '&:hover': { backgroundColor: '#d93d00' }, fontWeight: 700, px: 4, textTransform: 'none' }}
            >
              {cargando ? 'Guardando...' : 'Sumar Kilómetros'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}