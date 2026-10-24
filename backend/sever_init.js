const express = require('express');
const cors = require('cors');
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba inicial
app.get('/', (req, res) => {
    res.json({ mensaje: "¡El backend de The Long Run está funcionando correctamente! 🚀" });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})

// Middlewares
app.use(cors());
app.use(express.json());

// Base de datos en memoria para el prototipo
let kilometrosTotales = 124;
let registros = [
  { id: 1, corredor: 'Carlos Mendoza', km: 12, causa: 'Agua Potable Mapasingue', estado: 'Aprobado', fecha: '2026-10-20' },
  { id: 2, corredor: 'María Fernanda Gómez', km: 8, causa: 'Salud Comunitaria', estado: 'Pendiente', fecha: '2026-10-22' },
  { id: 3, corredor: 'Andrea Silva', km: 15, causa: 'Innovación ESPOL', estado: 'Aprobado', fecha: '2026-10-23' },
];

// --- ENDPOINTS PARA EL HERO ---

// Obtener los kilómetros acumulados
app.get('/api/kilometros', (req, res) => {
  res.json({ acumulado: kilometrosTotales, meta: 500 });
});

// Sumar nuevos kilómetros desde el Hero
app.post('/api/kilometros', (req, res) => {
  const { km } = req.body;
  if (!km || typeof km !== 'number') {
    return res.status(400).json({ error: 'Debes enviar un número válido de kilómetros.' });
  }
  kilometrosTotales += km;

  // Se añade también como un registro automático
  const nuevoRegistro = {
    id: Date.now(),
    corredor: 'Atleta Registrado',
    km,
    causa: 'Causa Comunitaria Guayaquil',
    estado: 'Aprobado',
    fecha: new Date().toISOString().split('T')[0]
  };
  registros.unshift(nuevoRegistro);

  res.json({ 
    mensaje: 'Kilómetros registrados correctamente', 
    acumulado: kilometrosTotales,
    registros 
  });
});

// --- ENDPOINTS PARA EL DASHBOARD ---

// Obtener la lista completa de registros
app.get('/api/registros', (req, res) => {
  res.json(registros);
});

// Cambiar estado de un registro (Aprobado / Pendiente)
app.patch('/api/registros/:id/estado', (req, res) => {
  const { id } = req.params;
  const reg = registros.find(r => r.id === parseInt(id));
  if (!reg) {
    return res.status(404).json({ error: 'Registro no encontrado' });
  }
  reg.estado = reg.estado === 'Aprobado' ? 'Pendiente' : 'Aprobado';
  res.json({ mensaje: 'Estado actualizado', registro: reg });
});

// Eliminar un registro
app.delete('/api/registros/:id', (req, res) => {
  const { id } = req.params;
  registros = registros.filter(r => r.id !== parseInt(id));
  res.json({ mensaje: 'Registro eliminado', registros });
});

// Iniciar Servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend de The Long Run corriendo en http://localhost:${PORT}`);
});

// Crear un nuevo registro manualmente desde el Dashboard
app.post('/api/registros', (req, res) => {
  const { corredor, km, causa, fecha, estado } = req.body;
  if (!corredor || !km || !causa) {
    return res.status(400).json({ error: 'Por favor completa los campos obligatorios.' });
  }

  const nuevoRegistro = {
    id: Date.now(),
    corredor,
    km: Number(km),
    causa,
    fecha: fecha || new Date().toISOString().split('T')[0],
    estado: estado || 'Pendiente'
  };

  registros.unshift(nuevoRegistro);
  kilometrosTotales += Number(km); // Opcional: suma los km a la meta global

  res.status(201).json({ 
    mensaje: 'Registro creado con éxito', 
    registro: nuevoRegistro,
    acumulado: kilometrosTotales 
  });
});

// Crear un nuevo registro desde el Dashboard Modal
app.post('/api/registros', (req, res) => {
  const { corredor, km, causa, fecha, estado } = req.body;
  
  if (!corredor || !km || !causa) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  const datos = leerDatos();
  const kmNum = Number(km);

  const nuevoRegistro = {
    id: Date.now(),
    corredor: String(corredor).trim(),
    km: kmNum,
    causa: String(causa).trim(),
    fecha: fecha || new Date().toISOString().split('T')[0],
    estado: estado || 'Pendiente'
  };

  datos.registros.unshift(nuevoRegistro);
  datos.kilometrosTotales += kmNum;
  
  guardarDatos(datos);

  // Devolvemos el registro creado y la lista completa actualizada
  res.status(201).json({ 
    mensaje: 'Registro guardado con éxito', 
    registro: nuevoRegistro,
    registros: datos.registros,
    acumulado: datos.kilometrosTotales 
  });
});