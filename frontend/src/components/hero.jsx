import { useState } from 'react';
import { Container, Typography, Box, Button, LinearProgress, Paper, Grid, Chip } from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export default function Hero() {
  const [kilometers, setKilometers] = useState(124);
  const targetKm = 500;
  const progress = Math.min((kilometers / targetKm) * 100, 100);

  const handleAddKm = () => {
    setKilometers((prev) => prev + 5);
  };

  return (
    <Box id="inicio" sx={{ py: 8, background: 'linear-gradient(180deg, #121212 0%, #1e1e1e 100%)', color: '#fff' }}>
      <Container maxWidth="md">
        <Box textAlign="center" mb={5}>
          <Chip icon={<VolunteerActivismIcon sx={{ color: '#fc4c02 !important' }} />} label="Causa Social Guayaquil 2026" sx={{ color: '#fff', backgroundColor: '#2a2a2a', mb: 2 }} />
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', fontFamily: 'monospace', color: '#fc4c02', mb: 2 }}>
            THE LONG RUN 🏃‍♂️
          </Typography>
          <Typography variant="h6" sx={{ color: '#a0a0a0', fontWeight: 300, maxWidth: 650, mx: 'auto' }}>
            Cada paso cuenta. Convierte tus kilómetros recorridos en aportes reales para programas comunitarios de agua potable e innovación.
          </Typography>
        </Box>

        {/* Tarjeta de Progreso */}
        <Paper elevation={4} sx={{ p: 4, borderRadius: 4, backgroundColor: '#1e1e1e', border: '1px solid #333' }}>
          <Grid container spacing={3} alignItems="center" mb={3}>
            <Grid item xs={12} sm={4} textAlign="center">
              <Typography variant="caption" sx={{ color: '#a0a0a0' }}>KILÓMETROS ACTUALES</Typography>
              <Typography variant="h3" sx={{ color: '#fc4c02', fontWeight: 'bold' }}>
                {kilometers} <Typography component="span" variant="h6">km</Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} textAlign="center">
              <Typography variant="caption" sx={{ color: '#a0a0a0' }}>META DEL MES</Typography>
              <Typography variant="h3" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                {targetKm} <Typography component="span" variant="h6">km</Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} textAlign="center">
              <Typography variant="caption" sx={{ color: '#a0a0a0' }}>LOGRO COMUNITARIO</Typography>
              <Typography variant="h3" sx={{ color: '#4caf50', fontWeight: 'bold' }}>
                {progress.toFixed(0)}%
              </Typography>
            </Grid>
          </Grid>

          {/* Barra de Progreso MUI */}
          <Box mb={3}>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ height: 12, borderRadius: 6, backgroundColor: '#333', '& .MuiLinearProgress-bar': { backgroundColor: '#fc4c02' } }} 
            />
          </Box>

          <Box textAlign="center">
            <Button
              variant="contained"
              size="large"
              startIcon={<DirectionsRunIcon />}
              onClick={handleAddKm}
              sx={{ backgroundColor: '#fc4c02', '&:hover': { backgroundColor: '#e04302' }, px: 4, py: 1.5, borderRadius: 3, fontWeight: 'bold' }}
            >
              Registrar +5 km Recorridos
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}