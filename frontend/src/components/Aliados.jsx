import { Container, Typography, Box, Grid, Card, CardContent, CardActions, Button, Chip, Avatar, Tooltip, Divider } from '@mui/material';
import HandshakeIcon from '@mui/icons-material/Handshake';
import VerifiedIcon from '@mui/icons-material/Verified';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import SchoolIcon from '@mui/icons-material/School';

export default function Aliados() {
  const marcas = [
    { 
      nombre: 'SurtiAgua', 
      rubro: 'Hidratación & Sostenibilidad',
      desc: 'Comprometidos con la provisión de agua segura e infraestructura de hidratación sostenible para la comunidad.',
      badge: 'Sponsor Principal',
      icon: <WaterDropIcon sx={{ color: '#00b4d8' }} />
    },
    { 
      nombre: 'ESPOL Innovación', 
      rubro: 'Academia & Desarrollo Tecnológico',
      desc: 'Impulso tecnológico universitario aplicado a proyectos de impacto social y soluciones para la ciudad.',
      badge: 'Aliado Académico',
      icon: <SchoolIcon sx={{ color: '#3b82f6' }} />
    }
  ];

  return (
    <Box id="aliados" sx={{ py: 10, backgroundColor: '#0f0f11' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Chip 
            label="Impacto Compartido" 
            size="small" 
            sx={{ backgroundColor: '#1f1f28', color: '#fc4c02', mb: 2, fontWeight: 700, border: '1px solid #2e2e3a' }} 
          />
          <Typography variant="h3" component="h2" sx={{ color: '#ffffff', fontWeight: 800, mb: 1 }}>
            MARCAS MADRINAS
          </Typography>
          <Typography variant="body1" sx={{ color: '#9494a0', maxWidth: 600, mx: 'auto' }}>
            Empresas e instituciones comprometidas que transforman los kilómetros recorridos en beneficios comunitarios.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {marcas.map((m, index) => (
            <Grid item xs={12} sm={6} md={5} key={index}>
              <Card 
                elevation={0} 
                sx={{ 
                  backgroundColor: '#16161c', 
                  color: '#ffffff', 
                  borderRadius: 4, 
                  border: '1px solid #262632',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    borderColor: '#fc4c02',
                    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)'
                  }
                }}
              >
                <CardContent sx={{ p: 3.5 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <Avatar sx={{ bgcolor: '#1f1f28', border: '1px solid #2e2e3a', width: 44, height: 44 }}>
                        {m.icon}
                      </Avatar>
                      <Box>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 700 }}>
                            {m.nombre}
                          </Typography>
                          <Tooltip title="Aliado Oficial Verificado">
                            <VerifiedIcon sx={{ color: '#fc4c02', fontSize: 18 }} />
                          </Tooltip>
                        </Box>
                        <Typography variant="caption" sx={{ color: '#71717a' }}>
                          {m.rubro}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip 
                      label={m.badge} 
                      size="small" 
                      sx={{ backgroundColor: 'rgba(252, 76, 2, 0.1)', color: '#fc4c02', border: '1px solid rgba(252, 76, 2, 0.3)', fontWeight: 700, fontSize: '0.7rem' }} 
                    />
                  </Box>

                  <Divider sx={{ borderColor: '#262632', my: 2 }} />

                  <Typography variant="body2" sx={{ color: '#a0a0ab', lineHeight: 1.6 }}>
                    {m.desc}
                  </Typography>
                </CardContent>

                <CardActions sx={{ px: 3.5, pb: 3, pt: 0 }}>
                  <Button 
                    size="small" 
                    startIcon={<HandshakeIcon />} 
                    sx={{ 
                      color: '#fc4c02', 
                      fontWeight: 700, 
                      textTransform: 'none',
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'translateX(4px)', backgroundColor: 'transparent' },
                      '&:focus-visible': { outline: '2px solid #fc4c02', outlineOffset: '2px' }
                    }}
                  >
                    Ver Convenio
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}