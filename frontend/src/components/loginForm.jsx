import '../styles/login.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

export default function LoginForm() {
  const [form, setForm] = useState({ correo: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));

      // ✅ Forzar redirección basada en el rol
      if (data.usuario.rol === 'admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/';
      }
    } catch {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Iniciar sesión</h1>
        {error && <p style={{ color: 'tomato', fontSize: '14px' }}>{error}</p>}

        <label>Correo</label>
        <input
          name="correo"
          type="email"
          value={form.correo}
          onChange={handleChange}
          required
        />

        <label>Contraseña</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button>Entrar</button>

        <div className="extra">
          ¿No tienes cuenta?
          <Link to="/register">Crear cuenta</Link>
        </div>
      </form>
    </div>
  );
}
