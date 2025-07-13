import '../styles/register.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';

export default function RegisterForm() {
  const [f, setF] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const h = e => setF({ ...f, [e.target.name]: e.target.value });

  const s = async e => {
    e.preventDefault();
    try {
      await api.post('/auth/register', f);
      nav('/login');
    } catch {
      setErr('Error al registrar');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={s} className="register-form">
        <h1>Crear cuenta</h1>
        {err && <p style={{ color: 'tomato', fontSize: '14px' }}>{err}</p>}

        <label>Nombre completo</label>
        <input name="name" value={f.name} onChange={h} required />

        <label>Correo</label>
        <input name="email" type="email" value={f.email} onChange={h} required />

        <label>Contraseña</label>
        <input name="password" type="password" value={f.password} onChange={h} required />

        <button>Registrarse</button>

        <div className="extra">
          <Link to="/login">← Volver</Link>
          <span>¿Ya tienes cuenta?
            <Link to="/login"> Iniciar sesión</Link>
          </span>
        </div>
      </form>
    </div>
  );
}
