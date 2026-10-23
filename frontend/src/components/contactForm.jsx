import { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Snackbar, 
  Alert, 
  Paper, 
  CircularProgress 
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function ContactForm() {
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simula envío de mensaje al backend
    setTimeout(() => {
      setLoading(false);
      setOpenSnackbar(true);
      setFormData({ nombre: '', email: '', mensaje: '' });
    }, 1000);
  };

  return (
    <Box id="contacto" sx={{ py: 10, backgroundColor: '#0f0f11' }}>
      <Container maxWidth="sm">
        <Paper elevation={0} sx={{ p: 4.5, backgroundColor: '#16161c', borderRadius: 4, border: '1px solid #262632' }}>
          <Box textAlign="center" mb={4}>
            <Typography variant="h4" component="h2" sx={{ color: '#ffffff', fontWeight: 800, mb: 1, fontFamily: 'monospace' }}>
              CONTÁCTANOS
            </Typography>
            <Typography variant="body2" sx={{ color: '#9494a0' }}>
              ¿Quieres sumar a tu empresa como Marca Madrina o coordinar una carrera benéfica? Escríbenos.
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={3}>
              <TextField
                label="Nombre completo"
                variant="outlined"
                fullWidth
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
                InputLabelProps={{ style: { color: '#71717a' } }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    backgroundColor: '#1f1f28',
                    borderRadius: 2,
                    '& fieldset': { borderColor: '#2e2e3a' },
                    '&:hover fieldset': { borderColor: '#fc4c02' },
                    '&.Mui-focused fieldset': { borderColor: '#fc4c02' },
                  }
                }}
              />
              <TextField
                label="Correo electrónico"
                type="email"
                variant="outlined"
                fullWidth
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                InputLabelProps={{ style: { color: '#71717a' } }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    backgroundColor: '#1f1f28',
                    borderRadius: 2,
                    '& fieldset': { borderColor: '#2e2e3a' },
                    '&:hover fieldset': { borderColor: '#fc4c02' },
                    '&.Mui-focused fieldset': { borderColor: '#fc4c02' },
                  }
                }}
              />
              <TextField
                label="Mensaje"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={formData.mensaje}
                onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                required
                InputLabelProps={{ style: { color: '#71717a' } }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    backgroundColor: '#1f1f28',
                    borderRadius: 2,
                    '& fieldset': { borderColor: '#2e2e3a' },
                    '&:hover fieldset': { borderColor: '#fc4c02' },
                    '&.Mui-focused fieldset': { borderColor: '#fc4c02' },
                  }
                }}
              />
              <Button
                type="submit"
                variant="contained"
                disableElevation
                size="large"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                endIcon={!loading ? <SendIcon /> : null}
                sx={{ 
                  backgroundColor: '#fc4c02', 
                  py: 1.8, 
                  borderRadius: 3, 
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  transition: 'all 0.2s ease',
                  '&:hover': { backgroundColor: '#d93d00', transform: 'translateY(-2px)' },
                  '&:focus-visible': { outline: '3px solid #ffffff', outlineOffset: '2px' }
                }}
              >
                {loading ? 'Enviando...' : 'Enviar Mensaje'}
              </Button>
            </Box>
          </form>
        </Paper>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setOpenSnackbar(false)} 
            severity="success" 
            variant="filled" 
            sx={{ width: '100%', backgroundColor: '#15803d', color: '#fff' }}
          >
            ¡Mensaje enviado con éxito! Nos pondremos en contacto pronto. 🚀
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}