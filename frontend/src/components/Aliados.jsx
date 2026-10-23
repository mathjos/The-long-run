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
      icon: <WaterDropIcon sx={{ color: '#00b4d8' }} />,
      iniciales: 'SA'
    },
    { 
      nombre: 'ESPOL Innovación', 
      rubro: 'Academia & Desarrollo Tecnológico',
      desc: 'Impulso tecnológico universitario aplicado a proyectos de impacto social y soluciones para la ciudad.',
      badge: 'Aliado Académico',
      icon: <SchoolIcon sx={{ color: '#0077b6' }} />,
      iniciales: 'ES'
    }
  ];

  return (
    <Box id="aliados" sx={{ py: 8, backgroundColor: '#181818' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Chip label="Impacto Compartido" size="small" sx={{ backgroundColor: '#2a2a2a', color: '#fc4c02', mb: 1.5, fontWeight: 'bold' }} />
          <Typography variant="h4" component="h2" sx={{ color: '#ffffff', fontFamily: 'monospace', fontWeight: 'bold', mb: 1 }}>
            MARCAS MADRINAS
          </Typography>
          <Typography variant="body1" sx={{ color: '#a0a0a0', maxWidth: 600, mx: 'auto' }}>
            Empresas e instituciones comprometidas que transforman los kilómetros recorridos por nuestros atletas en beneficios comunitarios.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {marcas.map((m, index) => (
            <Grid item xs={12} sm={6} md={5} key={index}>
              <Card 
                elevation={3} 
                sx={{ 
                  backgroundColor: '#222222', 
                  color: '#ffffff', 
                  borderRadius: 4, 
                  border: '1px solid #333',
                  transition: 'transform 0.2s, border-color 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: '#fc4c02'
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <Avatar sx={{ bgcolor: '#2a2a2a', border: '1px solid #444' }}>
                        {m.icon}
                      </Avatar>
                      <Box>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                            {m.nombre}
                          </Typography>
                          <Tooltip title="Aliado verificado">
                            <VerifiedIcon sx={{ color: '#fc4c02', fontSize: 18 }} />
                          </Tooltip>
                        </Box>
                        <Typography variant="caption" sx={{ color: '#a0a0a0' }}>
                          {m.rubro}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip label={m.badge} size="small" sx={{ backgroundColor: '#fc4c0215', color: '#fc4c02', border: '1px solid #fc4c0250', fontWeight: 'bold', fontSize: '0.7rem' }} />
                  </Box>

                  <Divider sx={{ borderColor: '#333', my: 1.5 }} />

                  <Typography variant="body2" sx={{ color: '#b0b0b0', lineHeight: 1.6, mt: 1.5 }}>
                    {m.desc}
                  </Typography>
                </CardContent>

                <CardActions sx={{ px: 3, pb: 2, pt: 0, justifyContent: 'space-between' }}>
                  <Button size="small" startIcon={<HandshakeIcon />} sx={{ color: '#fc4c02', fontWeight: 'bold', textTransform: 'none' }}>
                    Ver Alianza
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