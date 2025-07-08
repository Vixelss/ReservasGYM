import React, { useState } from 'react';
import { login } from '../api/api';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(correo, password);
    console.log(res); // aquí puedes guardar el token o redirigir si quieres
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Correo" value={correo} onChange={e => setCorreo(e.target.value)} />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await login(correo, password);

  if (res.token) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('rol', res.rol); // guardamos el rol

    // Redirige o muestra botones según el rol
    if (res.rol === 'admin') {
      window.location.href = '/admin-dashboard';
    } else {
      window.location.href = '/cliente-dashboard';
    }
  } else {
    alert("Credenciales inválidas");
  }
};
