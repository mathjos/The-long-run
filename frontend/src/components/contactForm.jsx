import { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Snackbar, Alert, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function ContactForm() {
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenSnackbar(true);
    setFormData({ nombre: '', email: '', mensaje: '' });
  };

  return (
    <Box id="contacto" sx={{ py: 8, backgroundColor: '#121212' }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, backgroundColor: '#1a1a1a', borderRadius: 4, border: '1px solid #333' }}>
          <Box textAlign="center" mb={3}>
            <Typography variant="h4" component="h2" sx={{ color: '#ffffff', fontFamily: 'monospace', fontWeight: 'bold', mb: 1 }}>
              CONTÁCTANOS
            </Typography>
            <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
              ¿Quieres sumar a tu empresa como Marca Madrina o coordinar una carrera benéfica? Escríbenos.
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={2.5}>
              <TextField
                label="Nombre completo"
                variant="outlined"
                fullWidth
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
                InputLabelProps={{ style: { color: '#a0a0a0' } }}
                InputProps={{ style: { color: '#ffffff', backgroundColor: '#222' } }}
              />
              <TextField
                label="Correo electrónico"
                type="email"
                variant="outlined"
                fullWidth
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                InputLabelProps={{ style: { color: '#a0a0a0' } }}
                InputProps={{ style: { color: '#ffffff', backgroundColor: '#222' } }}
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
                InputLabelProps={{ style: { color: '#a0a0a0' } }}
                InputProps={{ style: { color: '#ffffff', backgroundColor: '#222' } }}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                endIcon={<SendIcon />}
                sx={{ backgroundColor: '#fc4c02', '&:hover': { backgroundColor: '#e04302' }, py: 1.5, borderRadius: 2, fontWeight: 'bold' }}
              >
                Enviar Mensaje
              </Button>
            </Box>
          </form>
        </Paper>

        {/* Notificación flotante MUI Snackbar */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
            ¡Mensaje enviado con éxito! Nos pondremos en contacto pronto. 🚀
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}