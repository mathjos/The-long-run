import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Chip, 
  Button, 
  IconButton, 
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function Dashboard() {
  const [registros, setRegistros] = useState([]);
  const [filtro, setFiltro] = useState('Todos');

  // Estados para el Modal de Nuevo Registro
  const [openDialog, setOpenDialog] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [nuevoCorredor, setNuevoCorredor] = useState({
    corredor: '',
    km: '',
    causa: '',
    fecha: new Date().toISOString().split('T')[0],
    estado: 'Pendiente'
  });

  const cargarRegistros = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/registros');
      const data = await res.json();
      setRegistros(data);
    } catch (err) {
      console.log('Error al conectar con la API de registros:', err);
    }
  };

  useEffect(() => {
    cargarRegistros();
  }, []);

  const toggleEstado = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/registros/${id}/estado`, {
        method: 'PATCH'
      });
      if (res.ok) cargarRegistros();
    } catch (err) {
      console.error(err);
    }
  };

  const eliminarRegistro = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/registros/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) cargarRegistros();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCrearRegistro = async (e) => {
    e.preventDefault();
    setLoadingModal(true);
    try {
      const res = await fetch('http://localhost:5000/api/registros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoCorredor)
      });
      if (res.ok) {
        await cargarRegistros();
        setOpenDialog(false);
        setNuevoCorredor({
          corredor: '',
          km: '',
          causa: '',
          fecha: new Date().toISOString().split('T')[0],
          estado: 'Pendiente'
        });
      }
    } catch (err) {
      console.error('Error al guardar el nuevo registro:', err);
    } finally {
      setLoadingModal(false);
    }
  };

  const registrosFiltrados = registros.filter(r => {
    if (filtro === 'Todos') return true;
    return r.estado === filtro;
  });

  return (
    <Box id="admin" sx={{ py: 8, backgroundColor: '#0f0f11' }}>
      <Container maxWidth="lg">
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} gap={2} mb={4}>
          <Box>
            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800, fontFamily: 'monospace' }}>
              PANEL DE CONTROL & GESTIÓN
            </Typography>
            <Typography variant="body2" sx={{ color: '#9494a0' }}>
              Administración de carreras validadas e impacto social en Guayaquil
            </Typography>
          </Box>

          <Box display="flex" gap={2} alignItems="center" width={{ xs: '100%', md: 'auto' }}>
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel sx={{ color: '#a0a0ab' }}>Filtrar Estado</InputLabel>
              <Select
                value={filtro}
                label="Filtrar Estado"
                onChange={(e) => setFiltro(e.target.value)}
                sx={{ 
                  color: '#fff', 
                  '.MuiOutlinedInput-notchedOutline': { borderColor: '#2e2e3a' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#fc4c02' },
                  '.MuiSvgIcon-root': { color: '#a0a0ab' }
                }}
              >
                <MenuItem value="Todos">Todos</MenuItem>
                <MenuItem value="Aprobado">Aprobados</MenuItem>
                <MenuItem value="Pendiente">Pendientes</MenuItem>
              </Select>
            </FormControl>

            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
              sx={{ backgroundColor: '#fc4c02', '&:hover': { backgroundColor: '#d93d00' }, fontWeight: 700, textTransform: 'none' }}
            >
              Nuevo Registro
            </Button>
          </Box>
        </Box>

        {/* Tabla de Registros */}
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
              {registrosFiltrados.length > 0 ? (
                registrosFiltrados.map((row) => (
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
                          <RefreshIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton onClick={() => eliminarRegistro(row.id)} sx={{ color: '#a0a0ab', '&:hover': { color: '#ef4444' } }}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ color: '#71717a', py: 4 }}>
                    No hay registros con el estado seleccionado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal Formulario Dialog */}
        <Dialog 
          open={openDialog} 
          onClose={() => setOpenDialog(false)}
          PaperProps={{
            sx: { backgroundColor: '#16161c', color: '#fff', borderRadius: 3, border: '1px solid #262632', width: '100%', maxWidth: 500 }
          }}
        >
          <form onSubmit={handleCrearRegistro}>
            <DialogTitle sx={{ fontWeight: 800, borderBottom: '1px solid #262632', fontFamily: 'monospace' }}>
              AGREGAR NUEVO REGISTRO DE CARRERA
            </DialogTitle>
            
            <DialogContent sx={{ pt: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField
                label="Nombre del Corredor"
                variant="outlined"
                fullWidth
                required
                value={nuevoCorredor.corredor}
                onChange={(e) => setNuevoCorredor({ ...nuevoCorredor, corredor: e.target.value })}
                InputLabelProps={{ style: { color: '#71717a' } }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    backgroundColor: '#1f1f28',
                    '& fieldset': { borderColor: '#2e2e3a' },
                    '&:hover fieldset': { borderColor: '#fc4c02' },
                    '&.Mui-focused fieldset': { borderColor: '#fc4c02' },
                  }
                }}
              />

              <TextField
                label="Distancia (KM)"
                type="number"
                variant="outlined"
                fullWidth
                required
                inputProps={{ min: 1 }}
                value={nuevoCorredor.km}
                onChange={(e) => setNuevoCorredor({ ...nuevoCorredor, km: e.target.value })}
                InputLabelProps={{ style: { color: '#71717a' } }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    backgroundColor: '#1f1f28',
                    '& fieldset': { borderColor: '#2e2e3a' },
                    '&:hover fieldset': { borderColor: '#fc4c02' },
                    '&.Mui-focused fieldset': { borderColor: '#fc4c02' },
                  }
                }}
              />

              <TextField
                label="Causa Beneficiada"
                variant="outlined"
                fullWidth
                required
                value={nuevoCorredor.causa}
                onChange={(e) => setNuevoCorredor({ ...nuevoCorredor, causa: e.target.value })}
                InputLabelProps={{ style: { color: '#71717a' } }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    backgroundColor: '#1f1f28',
                    '& fieldset': { borderColor: '#2e2e3a' },
                    '&:hover fieldset': { borderColor: '#fc4c02' },
                    '&.Mui-focused fieldset': { borderColor: '#fc4c02' },
                  }
                }}
              />

              <FormControl fullWidth>
                <InputLabel sx={{ color: '#71717a' }}>Estado Inicial</InputLabel>
                <Select
                  value={nuevoCorredor.estado}
                  label="Estado Inicial"
                  onChange={(e) => setNuevoCorredor({ ...nuevoCorredor, estado: e.target.value })}
                  sx={{ 
                    color: '#fff', 
                    backgroundColor: '#1f1f28',
                    '.MuiOutlinedInput-notchedOutline': { borderColor: '#2e2e3a' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#fc4c02' },
                    '.MuiSvgIcon-root': { color: '#a0a0ab' }
                  }}
                >
                  <MenuItem value="Aprobado">Aprobado</MenuItem>
                  <MenuItem value="Pendiente">Pendiente</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>

            <DialogActions sx={{ p: 2.5, borderTop: '1px solid #262632' }}>
              <Button onClick={() => setOpenDialog(false)} sx={{ color: '#a0a0ab', textTransform: 'none' }}>
                Cancelar
              </Button>
              <Button 
                type="submit" 
                variant="contained"
                disabled={loadingModal}
                startIcon={loadingModal ? <CircularProgress size={18} color="inherit" /> : null}
                sx={{ backgroundColor: '#fc4c02', '&:hover': { backgroundColor: '#d93d00' }, fontWeight: 700, textTransform: 'none' }}
              >
                {loadingModal ? 'Guardando...' : 'Guardar Carrera'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Container>
    </Box>
  );
}