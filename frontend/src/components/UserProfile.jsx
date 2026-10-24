import { useState } from 'react';
import { Container, Typography, Box, Paper, Avatar, Button, TextField, Grid } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PersonIcon from '@mui/icons-material/Person';

export default function UserProfile() {
  const [perfil, setPerfil] = useState({
    nombre: 'Mathias Mina Cedeño',
    email: 'mathias.mina@espol.edu.ec',
    ciudad: 'Guayaquil, Ecuador',
    avatarUrl: ''
  });

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPerfil(prev => ({ ...prev, avatarUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box id="perfil" sx={{ py: 8, backgroundColor: '#0f0f11', color: '#fff' }}>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ p: 4, backgroundColor: '#16161c', border: '1px solid #262632', borderRadius: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: 'monospace', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonIcon sx={{ color: '#fc4c02' }} /> PERFIL DEL CORREDOR
          </Typography>

          <Grid container spacing={4} alignItems="center">
            {/* Foto de Perfil y Botón de Carga */}
            <Grid item xs={12} sm={4} display="flex" flexDirection="column" alignItems="center">
              <Avatar 
                src={perfil.avatarUrl} 
                sx={{ width: 120, height: 120, mb: 2, bgcolor: '#262632', border: '2px solid #fc4c02', fontSize: 40 }}
              >
                {perfil.nombre.charAt(0)}
              </Avatar>

              <Button
                variant="outlined"
                component="label"
                startIcon={<PhotoCameraIcon />}
                sx={{ color: '#fc4c02', borderColor: '#fc4c02', '&:hover': { borderColor: '#d93d00', backgroundColor: 'rgba(252,76,2,0.08)' }, textTransform: 'none', fontWeight: 700 }}
              >
                Cambiar Foto
                <input type="file" hidden accept="image/*" onChange={handleImagenChange} />
              </Button>
            </Grid>

            {/* Formulario de Datos */}
            <Grid item xs={12} sm={8}>
              <Box display="flex" flexDirection="column" gap={2.5}>
                <TextField
                  label="Nombre Completo"
                  value={perfil.nombre}
                  onChange={(e) => setPerfil({ ...perfil, nombre: e.target.value })}
                  slotProps={{ inputLabel: { style: { color: '#71717a' } } }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#fff',
                      backgroundColor: '#1f1f28',
                      '& fieldset': { borderColor: '#2e2e3a' },
                      '&:hover fieldset': { borderColor: '#fc4c02' },
                      '&.Mui-focused fieldset': { borderColor: '#fc4c02' }
                    }
                  }}
                />

                <TextField
                  label="Correo Electrónico"
                  value={perfil.email}
                  onChange={(e) => setPerfil({ ...perfil, email: e.target.value })}
                  slotProps={{ inputLabel: { style: { color: '#71717a' } } }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#fff',
                      backgroundColor: '#1f1f28',
                      '& fieldset': { borderColor: '#2e2e3a' },
                      '&:hover fieldset': { borderColor: '#fc4c02' },
                      '&.Mui-focused fieldset': { borderColor: '#fc4c02' }
                    }
                  }}
                />

                <TextField
                  label="Ciudad / Ubicación"
                  value={perfil.ciudad}
                  onChange={(e) => setPerfil({ ...perfil, ciudad: e.target.value })}
                  slotProps={{ inputLabel: { style: { color: '#71717a' } } }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#fff',
                      backgroundColor: '#1f1f28',
                      '& fieldset': { borderColor: '#2e2e3a' },
                      '&:hover fieldset': { borderColor: '#fc4c02' },
                      '&.Mui-focused fieldset': { borderColor: '#fc4c02' }
                    }
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}