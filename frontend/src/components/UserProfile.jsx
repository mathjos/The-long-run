import { useState, useRef } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Avatar, 
  Button, 
  TextField, 
  Snackbar, 
  Alert 
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SaveIcon from '@mui/icons-material/Save';

export default function UserProfile() {
  const fileInputRef = useRef(null);

  const [perfil, setPerfil] = useState({
    nombre: 'Mathias Mina',
    email: 'mathias.mina@espol.edu.ec',
    ciudad: 'Guayaquil',
    avatar: ''
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setSnackbar({
          open: true,
          message: 'La imagen excede el límite de 2MB',
          severity: 'error'
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPerfil((prev) => ({ ...prev, avatar: reader.result }));
        setSnackbar({
          open: true,
          message: 'Foto de perfil actualizada correctamente',
          severity: 'success'
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSnackbar({
      open: true,
      message: 'Perfil guardado con éxito',
      severity: 'success'
    });
  };

  return (
    <Box id="perfil" sx={{ py: 8, backgroundColor: '#0f0f11' }}>
      <Container maxWidth="md">
        <Typography 
          variant="h4" 
          sx={{ 
            color: '#fff', 
            fontWeight: 800, 
            mb: 1, 
            textAlign: 'center' 
          }}
        >
          Perfil del Corredor
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#a0a0ab', 
            mb: 5, 
            textAlign: 'center' 
          }}
        >
          Gestiona tu información personal y personaliza tu avatar en la plataforma
        </Typography>

        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 3, md: 5 }, 
            backgroundColor: '#16161c', 
            border: '1px solid #262632', 
            borderRadius: 3 
          }}
        >
          <form onSubmit={handleSave}>
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' }, 
                gap: 4, 
                alignItems: 'center' 
              }}
            >
              {/* Sección de Avatar */}
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  minWidth: 200 
                }}
              >
                <Avatar 
                  src={perfil.avatar} 
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    bgcolor: '#fc4c02', 
                    fontSize: 40, 
                    fontWeight: 800,
                    boxShadow: '0 0 20px rgba(252, 76, 2, 0.3)',
                    border: '2px solid #fc4c02',
                    mb: 2 
                  }}
                >
                  {!perfil.avatar && perfil.nombre.split(' ').map(n => n[0]).join('')}
                </Avatar>

                <input 
                  type="file" 
                  accept="image/*" 
                  hidden 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                />

                <Button 
                  variant="outlined" 
                  startIcon={<PhotoCameraIcon />} 
                  onClick={() => fileInputRef.current.click()}
                  sx={{ 
                    borderColor: '#fc4c02', 
                    color: '#fc4c02', 
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': { 
                      borderColor: '#ff6622', 
                      backgroundColor: 'rgba(252, 76, 2, 0.08)' 
                    } 
                  }}
                >
                  Cambiar Foto
                </Button>
              </Box>

              {/* Formulario */}
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 3, 
                  flexGrow: 1, 
                  width: '100%' 
                }}
              >
                <TextField
                  fullWidth
                  label="Nombre Completo"
                  value={perfil.nombre}
                  onChange={(e) => setPerfil({ ...perfil, nombre: e.target.value })}
                  InputLabelProps={{ style: { color: '#a0a0ab' } }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#fff',
                      backgroundColor: '#1f1f28',
                      '& fieldset': { borderColor: '#262632' },
                      '&:hover fieldset': { borderColor: '#fc4c02' },
                      '&.Mui-focused fieldset': { borderColor: '#fc4c02' }
                    }
                  }}
                />

                <TextField
                  fullWidth
                  label="Correo Electrónico"
                  type="email"
                  value={perfil.email}
                  onChange={(e) => setPerfil({ ...perfil, email: e.target.value })}
                  InputLabelProps={{ style: { color: '#a0a0ab' } }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#fff',
                      backgroundColor: '#1f1f28',
                      '& fieldset': { borderColor: '#262632' },
                      '&:hover fieldset': { borderColor: '#fc4c02' },
                      '&.Mui-focused fieldset': { borderColor: '#fc4c02' }
                    }
                  }}
                />

                <TextField
                  fullWidth
                  label="Ciudad / Ubicación"
                  value={perfil.ciudad}
                  onChange={(e) => setPerfil({ ...perfil, ciudad: e.target.value })}
                  InputLabelProps={{ style: { color: '#a0a0ab' } }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#fff',
                      backgroundColor: '#1f1f28',
                      '& fieldset': { borderColor: '#262632' },
                      '&:hover fieldset': { borderColor: '#fc4c02' },
                      '&.Mui-focused fieldset': { borderColor: '#fc4c02' }
                    }
                  }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    startIcon={<SaveIcon />}
                    sx={{ 
                      backgroundColor: '#fc4c02', 
                      color: '#fff', 
                      fontWeight: 700,
                      px: 4,
                      py: 1.2,
                      textTransform: 'none',
                      '&:hover': { backgroundColor: '#e04300' } 
                    }}
                  >
                    Guardar Cambios
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
        </Paper>
      </Container>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ width: '100%', color: '#fff' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}