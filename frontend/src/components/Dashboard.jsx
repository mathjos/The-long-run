import { useState } from 'react';
import { Container, Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button, IconButton, Tooltip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function Dashboard() {
  const [registros, setRegistros] = useState([
    { id: 1, corredor: 'Carlos Mendoza', km: 12, causa: 'Agua Potable Mapasingue', estado: 'Aprobado', fecha: '2026-10-20' },
    { id: 2, corredor: 'María Fernanda Gómez', km: 8, causa: 'Salud Comunitaria', estado: 'Pendiente', fecha: '2026-10-22' },
    { id: 3, corredor: 'Andrea Silva', km: 15, causa: 'Innovación ESPOL', estado: 'Aprobado', fecha: '2026-10-23' },
  ]);

  const toggleEstado = (id) => {
    setRegistros(registros.map(r => 
      r.id === id ? { ...r, estado: r.estado === 'Aprobado' ? 'Pendiente' : 'Aprobado' } : r
    ));
  };

  const eliminarRegistro = (id) => {
    setRegistros(registros.filter(r => r.id !== id));
  };

  return (
    <Box id="admin" sx={{ py: 8, backgroundColor: '#0f0f11' }}>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Box>
            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800, fontFamily: 'monospace' }}>
              PANEL DE CONTROL & GESTIÓN
            </Typography>
            <Typography variant="body2" sx={{ color: '#9494a0' }}>
              Administración de carreras validadas e impacto social en Guayaquil
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            sx={{ backgroundColor: '#fc4c02', '&:hover': { backgroundColor: '#d93d00' }, fontWeight: 700 }}
          >
            Nuevo Registro
          </Button>
        </Box>

        <TableContainer component={Paper} elevation={0} sx={{ backgroundColor: '#16161c', border: '1px solid #262632', borderRadius: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#1f1f28' }}>
              <TableRow>
                <TableCell sx={{ color: '#9494a0', fontWeight: 700 }}>CORREDOR</TableCell>
                <TableCell sx={{ color: '#9494a0', fontWeight: 700 }}>DISTANCIA</TableCell>
                <TableCell sx={{ color: '#9494a0', fontWeight: 700 }}>CAUSA BENEFICIADA</TableCell>
                <TableCell sx={{ color: '#9494a0', fontWeight: 700 }}>FECHA</TableCell>
                <TableCell sx={{ color: '#9494a0', fontWeight: 700 }}>ESTADO</TableCell>
                <TableCell align="right" sx={{ color: '#9494a0', fontWeight: 700 }}>ACCIONES</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {registros.map((row) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, borderColor: '#262632' }}>
                  <TableCell sx={{ color: '#fff', fontWeight: 600 }}>{row.corredor}</TableCell>
                  <TableCell sx={{ color: '#fc4c02', fontWeight: 700 }}>{row.km} KM</TableCell>
                  <TableCell sx={{ color: '#a0a0ab' }}>{row.causa}</TableCell>
                  <TableCell sx={{ color: '#a0a0ab' }}>{row.fecha}</TableCell>
                  <TableCell>
                    <Chip 
                      icon={row.estado === 'Aprobado' ? <CheckCircleIcon sx={{ fontSize: '16px !important' }} /> : <PendingIcon sx={{ fontSize: '16px !important' }} />}
                      label={row.estado} 
                      size="small"
                      color={row.estado === 'Aprobado' ? 'success' : 'warning'} 
                      variant="outlined" 
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Cambiar Estado">
                      <IconButton onClick={() => toggleEstado(row.id)} sx={{ color: '#a0a0ab', '&:hover': { color: '#fc4c02' } }}>
                        <CheckCircleIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton onClick={() => eliminarRegistro(row.id)} sx={{ color: '#a0a0ab', '&:hover': { color: '#ef4444' } }}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}