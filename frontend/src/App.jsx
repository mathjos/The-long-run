import { useState } from 'react';
import './App.css';

function App() {
  const [kilometers, setKilometers] = useState(0);

  const handleAddKm = () => {
    setKilometers(prev => prev + 1);
  };

  return (
    <div style={{ backgroundColor: '#121212', color: '#ffffff', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ color: '#fc4c02', fontSize: '3rem', fontFamily: 'monospace' }}>THE LONG RUN 🏃‍♂️</h1>
        <p style={{ color: '#a0a0a0' }}>Plataforma de seguimiento de actividad física para causas sociales en Guayaquil</p>
      </header>

      <main style={{ maxWidth: '600px', margin: '0 auto', background: '#1e1e1e', padding: '2rem', borderRadius: '15px', border: '1px solid #333' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Registro de Kilómetros Solidarios</h2>
        <p style={{ fontSize: '2rem', color: '#fc4c02', margin: '1rem 0' }}>{kilometers} km acumulados</p>
        <button 
          onClick={handleAddKm}
          style={{ backgroundColor: '#fc4c02', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer' }}
        >
          Registrar 1 km recorrido
        </button>
      </main>
    </div>
  );
}

export default App;