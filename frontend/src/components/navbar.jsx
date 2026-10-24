import { AppBar, Toolbar, Typography, Box, Button, Avatar, Chip } from '@mui/material';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

export default function Navbar() {
  return (
    <AppBar position="sticky" elevation={0} sx={{ backgroundColor: '#16161c', borderBottom: '1px solid #262632' }}>
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
        
        {/* Logo Branding + Badge PRO */}
        <Box display="flex" alignItems="center" gap={1.5}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 800, 
              color: '#fc4c02', 
              fontFamily: 'monospace', 
              letterSpacing: 1,
              transition: 'transform 0.2s ease',
              '&:hover': { transform: 'scale(1.02)' }
            }}
          >
            THE LONG RUN
          </Typography>
          <Chip 
            label="PRO" 
            size="small" 
            icon={<WorkspacePremiumIcon sx={{ color: '#ffd700 !important', fontSize: '16px !important' }} />} 
            sx={{ backgroundColor: '#262632', color: '#fff', height: 24, fontWeight: 700 }} 
          />
        </Box>

        {/* Links de Navegación y Perfil de Usuario */}
        <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 2 }}>
          <Button 
            href="#inicio" 
            sx={{ 
              color: '#a0a0ab', 
              fontWeight: 600,
              textTransform: 'none',
              transition: 'color 0.2s',
              '&:hover': { color: '#fc4c02' },
              '&:focus-visible': { outline: '2px solid #fc4c02', outlineOffset: '2px' }
            }}
          >
            Inicio
          </Button>

          <Button 
            href="#perfil" 
            sx={{ 
              color: '#a0a0ab', 
              fontWeight: 600,
              textTransform: 'none',
              transition: 'color 0.2s',
              '&:hover': { color: '#fc4c02' },
              '&:focus-visible': { outline: '2px solid #fc4c02', outlineOffset: '2px' }
            }}
          >
            Perfil
          </Button>

          <Button 
            href="#aliados" 
            sx={{ 
              color: '#a0a0ab', 
              fontWeight: 600,
              textTransform: 'none',
              transition: 'color 0.2s',
              '&:hover': { color: '#fc4c02' },
              '&:focus-visible': { outline: '2px solid #fc4c02', outlineOffset: '2px' }
            }}
          >
            Aliados
          </Button>

          <Button 
            href="#contacto" 
            sx={{ 
              color: '#a0a0ab', 
              fontWeight: 600,
              textTransform: 'none',
              transition: 'color 0.2s',
              '&:hover': { color: '#fc4c02' },
              '&:focus-visible': { outline: '2px solid #fc4c02', outlineOffset: '2px' }
            }}
          >
            Contacto
          </Button>

          <Button 
            href="#admin" 
            sx={{ 
              color: '#a0a0ab', 
              fontWeight: 600,
              textTransform: 'none',
              transition: 'color 0.2s',
              '&:hover': { color: '#fc4c02' },
              '&:focus-visible': { outline: '2px solid #fc4c02', outlineOffset: '2px' }
            }}
          >
            Impacto
          </Button>

          {/* Avatar con enlace directo al perfil */}
          <Button href="#perfil" sx={{ p: 0, minWidth: 'auto', borderRadius: '50%' }}>
            <Avatar 
              sx={{ 
                bgcolor: '#fc4c02', 
                width: 36, 
                height: 36, 
                fontSize: 14, 
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': { transform: 'scale(1.08)', boxShadow: '0 0 12px rgba(252, 76, 2, 0.4)' }
              }}
            >
              MC
            </Avatar>
          </Button>
        </Box>

      </Toolbar>
    </AppBar>
  );
}