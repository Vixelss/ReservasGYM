import { useNavigate, Link } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const logueado = !!localStorage.getItem("token");

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <nav className="nav">
      <span className="nav-brand">ReservasGYM</span>
      <ul className="nav-links">
        <li><Link to="/">Inicio</Link></li>

        {!logueado && <li><Link to="/login">Iniciar sesión</Link></li>}

        {logueado && usuario && (
          <>
            <li className="sesion-text">Sesión: <strong>{usuario.nombre}</strong></li>
            <li><button onClick={cerrarSesion}>Cerrar sesión</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}
