const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'data', 'registros.json');

// Middlewares
app.use(cors());
app.use(express.json());

// --- FUNCIONES DE PERSISTENCIA (JSON) ---
const leerDatos = () => {
  try {
    const dataDir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      const dataInicial = {
        kilometrosTotales: 124,
        registros: [
          { id: 1, corredor: 'Carlos Mendoza', km: 12, causa: 'Agua Potable Mapasingue', estado: 'Aprobado', fecha: '2026-10-20' },
          { id: 2, corredor: 'María Fernanda Gómez', km: 8, causa: 'Salud Comunitaria', estado: 'Pendiente', fecha: '2026-10-22' },
          { id: 3, corredor: 'Andrea Silva', km: 15, causa: 'Innovación ESPOL', estado: 'Aprobado', fecha: '2026-10-23' }
        ]
      };
      fs.writeFileSync(DATA_FILE, JSON.stringify(dataInicial, null, 2));
      return dataInicial;
    }
    const contenido = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(contenido);
  } catch (error) {
    console.error('Error al leer el archivo de datos:', error);
    return { kilometrosTotales: 124, registros: [] };
  }
};

const guardarDatos = (datos) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(datos, null, 2));
  } catch (error) {
    console.error('Error al guardar datos en el archivo:', error);
  }
};

// --- RUTA DE PRUEBA ---
app.get('/', (req, res) => {
  res.json({ mensaje: "¡El backend de The Long Run está funcionando correctamente! 🚀" });
});

// --- ENDPOINTS PARA EL HERO ---
app.get('/api/kilometros', (req, res) => {
  const datos = leerDatos();
  res.json({ acumulado: datos.kilometrosTotales, meta: 500 });
});

app.post('/api/kilometros', (req, res) => {
  const { km } = req.body;
  if (!km || typeof km !== 'number') {
    return res.status(400).json({ error: 'Debes enviar un número válido de kilómetros.' });
  }

  const datos = leerDatos();
  datos.kilometrosTotales += km;

  const nuevoRegistro = {
    id: Date.now(),
    corredor: 'Atleta Registrado',
    km,
    causa: 'Causa Comunitaria Guayaquil',
    estado: 'Aprobado',
    fecha: new Date().toISOString().split('T')[0]
  };
  
  datos.registros.unshift(nuevoRegistro);
  guardarDatos(datos);

  res.json({ 
    mensaje: 'Kilómetros registrados correctamente', 
    acumulado: datos.kilometrosTotales,
    registros: datos.registros 
  });
});

// --- ENDPOINTS PARA EL DASHBOARD ---
app.get('/api/registros', (req, res) => {
  const datos = leerDatos();
  res.json(datos.registros);
});

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

  res.status(201).json({ 
    mensaje: 'Registro guardado con éxito', 
    registro: nuevoRegistro,
    registros: datos.registros,
    acumulado: datos.kilometrosTotales 
  });
});

app.patch('/api/registros/:id/estado', (req, res) => {
  const { id } = req.params;
  const datos = leerDatos();
  const reg = datos.registros.find(r => r.id === parseInt(id));

  if (!reg) {
    return res.status(404).json({ error: 'Registro no encontrado' });
  }

  reg.estado = reg.estado === 'Aprobado' ? 'Pendiente' : 'Aprobado';
  guardarDatos(datos);

  res.json({ mensaje: 'Estado actualizado', registro: reg, registros: datos.registros });
});

app.delete('/api/registros/:id', (req, res) => {
  const { id } = req.params;
  const datos = leerDatos();
  
  datos.registros = datos.registros.filter(r => r.id !== parseInt(id));
  guardarDatos(datos);

  res.json({ mensaje: 'Registro eliminado', registros: datos.registros });
});

// --- INICIAR SERVIDOR ---
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend de The Long Run corriendo en http://localhost:${PORT}`);
});