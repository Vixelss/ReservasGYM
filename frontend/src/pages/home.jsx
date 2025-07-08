import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Bienvenido al Sistema de Reservas del GYM</h1>
      <p>Agenda tus clases y lleva el control de tus entrenamientos</p>
      <Link to="/login">
        <button style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
          Iniciar sesión
        </button>
      </Link>
    </div>
  );
}
