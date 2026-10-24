import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

export default function InitScreen({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Duración total de la pantalla de carga inicial (2.2 segundos)
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        onFinish(); // Oculta el init screen y muestra la app
      }, 600); // Tiempo de la transición de salida
    }, 2200);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0f0f11',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        opacity: fadeOut ? 0 : 1,
        visibility: fadeOut ? 'hidden' : 'visible',
        transition: 'opacity 0.6s ease, visibility 0.6s ease',
      }}
    >
      {/* Contenedor del Logo con Animación de Entrada */}
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        sx={{
          animation: 'pulseLogo 1.5s infinite ease-in-out',
          '@keyframes pulseLogo': {
            '0%': { transform: 'scale(0.95)', opacity: 0.8 },
            '50%': { transform: 'scale(1.05)', opacity: 1 },
            '100%': { transform: 'scale(0.95)', opacity: 0.8 },
          }
        }}
      >
        <Box 
          sx={{ 
            backgroundColor: 'rgba(252, 76, 2, 0.15)', 
            p: 3, 
            borderRadius: '50%', 
            border: '2px solid #fc4c02',
            boxShadow: '0 0 30px rgba(252, 76, 2, 0.4)',
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <DirectionsRunIcon sx={{ color: '#fc4c02', fontSize: 56 }} />
        </Box>

        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 900, 
            color: '#fff', 
            fontFamily: 'monospace', 
            letterSpacing: 2,
            mb: 1
          }}
        >
          THE LONG RUN
        </Typography>
        
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#a0a0ab', 
            letterSpacing: 3, 
            textTransform: 'uppercase',
            fontWeight: 600,
            mb: 4
          }}
        >
          Comunidad & Impacto Social
        </Typography>

        <CircularProgress 
          size={32} 
          thickness={5} 
          sx={{ color: '#fc4c02' }} 
        />
      </Box>
    </Box>
  );
}