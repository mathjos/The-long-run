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
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Avatar,
  Snackbar,
  Alert
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

export default function Dashboard() {
  const [registros, setRegistros] = useState([]);
  const [filtro, setFiltro] = useState('Todos');

  // Estados para el Modal
  const [openDialog, setOpenDialog] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [nuevoCorredor, setNuevoCorredor] = useState({
    corredor: '',
    km: '',
    causa: '',
    fecha: new Date().toISOString().split('T')[0],
    estado: 'Pendiente'
  });

  // Estado para las notificaciones Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const mostrarAlerta = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

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
      if (res.ok) {
        await cargarRegistros();
        mostrarAlerta('Estado del registro actualizado con éxito', 'info');
      }
    } catch (err) {
      console.error(err);
      mostrarAlerta('Error al actualizar el estado', 'error');
    }
  };

  const eliminarRegistro = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/registros/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        await cargarRegistros();
        mostrarAlerta('Registro eliminado correctamente', 'warning');
      }
    } catch (err) {
      console.error(err);
      mostrarAlerta('Error al eliminar el registro', 'error');
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
        mostrarAlerta('¡Carrera registrada y guardada con éxito!', 'success');
      }
    } catch (err) {
      console.error('Error al guardar el nuevo registro:', err);
      mostrarAlerta('No se pudo conectar con el servidor', 'error');
    } finally {
      setLoadingModal(false);
    }
  };

  const totalKmAprobados = registros
    .filter(r => r.estado === 'Aprobado')
    .reduce((acc, r) => acc + Number(r.km), 0);

  const totalPendientes = registros.filter(r => r.estado === 'Pendiente').length;

  const registrosFiltrados = registros.filter(r => {
    if (filtro === 'Todos') return true;
    return r.estado === filtro;
  });

  return (
    <Box id="admin" sx={{ py: 8, backgroundColor: '#0f0f11' }}>
      <Container maxWidth="lg">
        {/* Encabezado y Acción */}
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

        {/* Tarjetas de Resumen KPI */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={4}>
            <Card elevation={0} sx={{ backgroundColor: '#16161c', border: '1px solid #262632', borderRadius: 3 }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'rgba(252, 76, 2, 0.1)', color: '#fc4c02', width: 48, height: 48 }}>
                  <DirectionsRunIcon />
                </Avatar>
                <Box>
                  <Typography variant="caption" sx={{ color: '#71717a', fontWeight: 700 }}>
                    REGISTROS TOTALES
                  </Typography>
                  <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 800 }}>
                    {registros.length}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card elevation={0} sx={{ backgroundColor: '#16161c', border: '1px solid #262632', borderRadius: 3 }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', width: 48, height: 48 }}>
                  <QueryStatsIcon />
                </Avatar>
                <Box>
                  <Typography variant="caption" sx={{ color: '#71717a', fontWeight: 700 }}>
                    KM VALIDADOS
                  </Typography>
                  <Typography variant="h5" sx={{ color: '#22c55e', fontWeight: 800 }}>
                    {totalKmAprobados} KM
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card elevation={0} sx={{ backgroundColor: '#16161c', border: '1px solid #262632', borderRadius: 3 }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'rgba(234, 179, 8, 0.1)', color: '#eab308', width: 48, height: 48 }}>
                  <HourglassTopIcon />
                </Avatar>
                <Box>
                  <Typography variant="caption" sx={{ color: '#71717a', fontWeight: 700 }}>
                    POR REVISAR
                  </Typography>
                  <Typography variant="h5" sx={{ color: '#eab308', fontWeight: 800 }}>
                    {totalPendientes}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

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
          slotProps={{
            paper: {
              sx: { backgroundColor: '#16161c', color: '#fff', borderRadius: 3, border: '1px solid #262632', width: '100%', maxWidth: 500 }
            }
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
                slotProps={{
                  inputLabel: { style: { color: '#71717a' } }
                }}
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
                slotProps={{
                  htmlInput: { min: 1 },
                  inputLabel: { style: { color: '#71717a' } }
                }}
                value={nuevoCorredor.km}
                onChange={(e) => setNuevoCorredor({ ...nuevoCorredor, km: e.target.value })}
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
                slotProps={{
                  inputLabel: { style: { color: '#71717a' } }
                }}
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

        {/* Notificaciones flotantes Snackbar */}
        <Snackbar 
          open={snackbar.open} 
          autoHideDuration={4000} 
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%', fontWeight: 600 }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}