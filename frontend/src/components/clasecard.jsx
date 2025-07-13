import { Link } from "react-router-dom";

// ya NO se importa ningún css aquí; todo viene de home.css
const ClaseCard = ({ clase, onReservar, logueado, yaReservada }) => (
  <div className="card">
    <h3>{clase.Servicio?.nombre}</h3>

    <ul>
      <li><b>Fecha:</b> {clase.fecha}</li>
      <li><b>Inicio:</b> {clase.hora_inicio}</li>
      <li><b>Fin:</b> {clase.hora_fin}</li>
      <li><b>Cupos:</b> {clase.cupo_max}</li>
    </ul>

    {logueado ? (
      yaReservada ? (
        <button disabled style={{ opacity: 0.6 }}>Ya reservado</button>
      ) : (
        <button onClick={() => onReservar(clase.id_horario)}>Reservar</button>
      )
    ) : (
      <Link to="/login" className="btn-primary">Iniciar sesión</Link>
    )}
  </div>
);

export default ClaseCard;
