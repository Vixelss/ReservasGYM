import { useState } from "react";
import ServiciosAdmin from "./ServiciosAdmin";
import UsuariosAdmin from "./UsuariosAdmin";
import HorariosAdmin from "./HorariosAdmin";
import ReservasAdmin from "./ReservasAdmin";
import ContactoAdmin from "./ContactoAdmin";
import LogsAdmin from "./LogsAdmin";
import EstadisticasAdmin from "./EstadisticasAdmin";
import '../../styles/admin.css'; // Ajusta la ruta si es necesario

const AdminPanel = () => {
  const [seccion, setSeccion] = useState("servicios");

  const renderContenido = () => {
    switch (seccion) {
      case "servicios":
        return <ServiciosAdmin />;
      case "usuarios":
        return <UsuariosAdmin />;
      case "horarios":
        return <HorariosAdmin />;
      case "reservas":
        return <ReservasAdmin />;
      case "contacto":
        return <ContactoAdmin />;
      case "logs":
        return <LogsAdmin />;
      case "estadisticas":
        return <EstadisticasAdmin />;
      default:
        return <div>Sección no encontrada</div>;
    }
  };

  return (
    <div className="admin-container">
      <h2>Panel de Administración</h2>
      <nav className="admin-nav">
        <button onClick={() => setSeccion("servicios")}>Servicios</button>
        <button onClick={() => setSeccion("usuarios")}>Usuarios</button>
        <button onClick={() => setSeccion("horarios")}>Horarios</button>
        <button onClick={() => setSeccion("reservas")}>Reservas</button>
        <button onClick={() => setSeccion("contacto")}>Contacto</button>
        <button onClick={() => setSeccion("logs")}>Logs</button>
        <button onClick={() => setSeccion("estadisticas")}>Estadísticas</button>
      </nav>
      <hr />
      {renderContenido()}
    </div>
  );
};

export default AdminPanel;
