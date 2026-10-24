# The Long Run - Plataforma de Gestion Atletica Comunitaria

> Convierte tu esfuerzo fisico en donaciones reales.

The Long Run es una aplicacion full-stack interactiva disenada para registrar, visualizar y sincronizar el progreso de corredores y deportistas en beneficio de causas comunitarias. Integra una interfaz moderna en React con un backend persistente en Node.js para hacer un seguimiento en tiempo real del progreso colectivo.

---

## Caracteristicas Principales

* Meta Comunitaria Interactiva: Visualizacion del progreso colectivo mediante barras dinamicas e integraciones con deslizadores interactivos (MUI Slider).
* Sincronizacion en Tiempo Real: Persistencia automatica de kilometros totales y objetivos comunitarios conectados a la API backend.
* Control Visual Completo: Permite modificar metas globales, registrar metricas y reiniciar contadores con controles rapidos.
* Diseno Moderno y Responsive: Interfaz oscura, elegante e intuitiva optimizada con Material UI.

---

## Tecnologia Utilizada

### Frontend
* React (Vite)
* Material UI (MUI)
* JavaScript (ES6+)

### Backend
* Node.js y Express
* CORS y File System (fs) para lectura y escritura de datos JSON
* Persistencia de Datos: backend/data/registros.json

---

## Estructura del Proyecto

The long run/
├── backend/
│   ├── data/
│   │   └── registros.json       # Persistencia de datos (KM totales y registros)
│   └── sever_init.js            # Servidor Express y endpoints API
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Hero.jsx         # Componente principal con Slider y Meta Comunitaria
│   │   │   ├── Dashboard.jsx    # Modulo de metricas
│   │   │   ├── contactForm.jsx  # Formulario interactivo
│   │   │   └── Aliados.jsx      # Aliados y marcas participantes
│   │   └── App.jsx
│   └── package.json
└── README.md

---

## Instalacion y Configuracion Local

Sigue estos pasos para ejecutar el proyecto en tu maquina local:

### 1. Clona el repositorio
git clone https://github.com/mathjos/the-long-run.git
cd the-long-run

### 2. Configurar y arrancar el Backend
cd backend
npm install
node sever_init.js

El servidor backend quedara escuchando en http://localhost:5000.

### 3. Configurar y arrancar el Frontend
Abre una nueva terminal:

cd frontend
npm install
npm run dev

Abre la direccion http://localhost:5173 en tu navegador.

---

## API Endpoints

| Metodo | Endpoint | Descripcion |
| :--- | :--- | :--- |
| GET | /api/meta | Obtiene los kilometros acumulados y la meta actual |
| POST | /api/meta | Actualiza la meta comunitaria y los kilometros totales |

---

## Autor

Desarrollado por Gemma Andrade
Desarrollado por Mathias Mina (@mathjos)

Estudiante de Ingenieria en Telematica - ESPOL
