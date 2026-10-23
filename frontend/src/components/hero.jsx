import { useState } from 'react';
import { Container, Typography, Box, Button, LinearProgress, Paper, Grid, Chip } from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import VerifiedIcon from '@mui/icons-material/Verified';

export default function Hero() {
  const [kilometers, setKilometers] = useState(124);
  const targetKm = 500;
  const progress = Math.min((kilometers / targetKm) * 100, 100);

  return (
    <Box id="inicio" sx={{ py: 10, background: 'radial-gradient(circle at top, #1c1c24 0%, #0f0f11 100%)' }}>
      <Container maxWidth="md">
        <Box textAlign="center" mb={6}>
          <Chip 
            icon={<VerifiedIcon sx={{ color: '#fc4c02 !important', fontSize: 18 }} />} 
            label="Iniciativa de Impacto Social — Guayaquil" 
            sx={{ color: '#e0e0e0', backgroundColor: '#1f1f28', mb: 3, px: 1, py: 2, fontWeight: 500, border: '1px solid #2e2e3a' }} 
          />
          <Typography variant="h2" component="h1" sx={{ color: '#ffffff', fontWeight: 800, mb: 2, fontSize: { xs: '2.5rem', md: '3.8rem' } }}>
            THE LONG RUN
          </Typography>
          <Typography variant="h6" sx={{ color: '#9494a0', fontWeight: 400, maxWidth: 620, mx: 'auto', lineHeight: 1.6 }}>
            Plataforma de seguimiento de actividad física para la gestión de donaciones e impacto en causas sociales comunitarias.
          </Typography>
        </Box>

        {/* Tarjeta Dashboard */}
        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, backgroundColor: '#16161c', border: '1px solid #262632' }}>
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

          <Box textAlign="center">
            <Button
              variant="contained"
              disableElevation
              size="large"
              startIcon={<DirectionsRunIcon />}
              onClick={() => setKilometers(prev => prev + 5)}
              sx={{ 
                backgroundColor: '#fc4c02', 
                '&:hover': { backgroundColor: '#d93d00' }, 
                px: 4, 
                py: 1.8, 
                borderRadius: 3, 
                fontWeight: 700, 
                fontSize: '0.95rem',
                textTransform: 'none'
              }}
            >
              Registrar +5 KM Recorridos
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}