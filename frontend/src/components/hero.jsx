import { useState } from 'react';
import { Box, Container, Typography, Button, TextField, Paper, Slider } from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import EditIcon from '@mui/icons-material/Edit';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckIcon from '@mui/icons-material/Check';

export default function Hero() {
  const [currentKm, setCurrentKm] = useState(204);
  const [goalKm, setGoalKm] = useState(500);
  
  // Estados para la edición de la meta
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [tempGoal, setTempGoal] = useState(goalKm);

  const progressPercentage = Math.min(Math.round((currentKm / goalKm) * 100), 100);

  // Manejador del cambio en la barra deslizadora
  const handleSliderChange = (event, newValue) => {
    setCurrentKm(newValue);
  };

  // Guardar nueva meta
  const handleSaveGoal = () => {
    const num = Number(tempGoal);
    if (num > 0) {
      setGoalKm(num);
      setIsEditingGoal(false);
    }
  };

  // Reiniciar contador a 0
  const handleResetKm = () => {
    setCurrentKm(0);
  };

  return (
    <Box sx={{ py: 6, backgroundColor: '#0f0f11', textAlign: 'center', color: '#fff' }}>
      <Container maxWidth="md">
        <Typography variant="body1" sx={{ color: '#a0a0ab', mb: 3, fontWeight: 500 }}>
          Convierte tu esfuerzo físico en donaciones reales.
        </Typography>

        {/* Tarjeta de Meta Comunitaria */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            backgroundColor: '#16161c', 
            border: '1px solid #262632', 
            borderRadius: 4,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
            <DirectionsRunIcon sx={{ color: '#fc4c02', fontSize: 40 }} />
          </Box>

          <Typography variant="subtitle2" sx={{ color: '#a0a0ab', letterSpacing: 2, fontWeight: 700, mb: 1 }}>
            META COMUNITARIA
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <Typography variant="h4" sx={{ color: '#fc4c02', fontWeight: 900, fontFamily: 'monospace' }}>
              {currentKm} / {goalKm} KM
            </Typography>
          </Box>

          {/* Barra Deslizadora Interactiva para Modificar los KM directamente */}
          <Box sx={{ px: 2, my: 2 }}>
            <Slider
              value={currentKm}
              min={0}
              max={goalKm}
              onChange={handleSliderChange}
              aria-label="Kilómetros recorridos"
              sx={{
                color: '#fc4c02',
                height: 10,
                '& .MuiSlider-track': {
                  border: 'none',
                  backgroundColor: '#fc4c02',
                },
                '& .MuiSlider-rail': {
                  backgroundColor: '#262632',
                  opacity: 1,
                },
                '& .MuiSlider-thumb': {
                  height: 22,
                  width: 22,
                  backgroundColor: '#fff',
                  border: '3px solid #fc4c02',
                  '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                    boxShadow: '0 0 0 8px rgba(252, 76, 2, 0.2)',
                  },
                },
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mt: 1 }}>
            <Typography variant="caption" sx={{ color: '#71717a', fontWeight: 600 }}>
              {progressPercentage}% de la meta alcanzada
            </Typography>

            {/* Panel de Controles: Cambiar Meta y Reiniciar */}
            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexWrap: 'wrap' }}>
              
              {/* Botón para Cambiar la Meta */}
              {isEditingGoal ? (
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <TextField 
                    size="small"
                    type="number"
                    value={tempGoal}
                    onChange={(e) => setTempGoal(e.target.value)}
                    sx={{ 
                      width: 90,
                      '& .MuiOutlinedInput-root': { color: '#fff', backgroundColor: '#1f1f28', '& fieldset': { borderColor: '#fc4c02' } } 
                    }}
                  />
                  <Button variant="contained" size="small" onClick={handleSaveGoal} sx={{ backgroundColor: '#fc4c02', minWidth: 'auto', p: 1 }}>
                    <CheckIcon />
                  </Button>
                </Box>
              ) : (
                <Button 
                  variant="outlined" 
                  size="small" 
                  startIcon={<EditIcon />}
                  onClick={() => { setTempGoal(goalKm); setIsEditingGoal(true); }}
                  sx={{ borderColor: '#262632', color: '#a0a0ab', textTransform: 'none', '&:hover': { borderColor: '#fc4c02', color: '#fc4c02' } }}
                >
                  Cambiar Meta
                </Button>
              )}

              {/* Botón para Reiniciar a 0 */}
              <Button 
                variant="outlined" 
                size="small" 
                startIcon={<RefreshIcon />}
                onClick={handleResetKm}
                sx={{ 
                  borderColor: '#3a2522', 
                  color: '#ff6b6b', 
                  textTransform: 'none', 
                  '&:hover': { borderColor: '#ff6b6b', backgroundColor: 'rgba(255,107,107,0.08)' } 
                }}
              >
                Reiniciar a 0 km
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}