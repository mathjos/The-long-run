import { AppBar, Toolbar, Typography, Box, Button, Avatar, Chip } from '@mui/material';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

export default function Navbar() {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#181818', borderBottom: '1px solid #333' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fc4c02', fontFamily: 'monospace', letterSpacing: 1 }}>
            THE LONG RUN
          </Typography>
          <Chip label="PRO" size="small" icon={<WorkspacePremiumIcon sx={{ color: '#ffd700 !important' }} />} sx={{ backgroundColor: '#2a2a2a', color: '#fff', height: 24 }} />
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          <Button href="#inicio" sx={{ color: '#fff' }}>Inicio</Button>
          <Button href="#aliados" sx={{ color: '#fff' }}>Aliados</Button>
          <Button href="#contacto" sx={{ color: '#fff' }}>Contacto</Button>
          <Avatar sx={{ bgcolor: '#fc4c02', width: 36, height: 36, fontSize: 14, fontWeight: 'bold' }}>
            MC
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}