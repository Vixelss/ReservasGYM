import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Clases = () => {
  const [clases, setClases] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/clases");
        const data = await res.json();
        setClases(data);
      } catch (error) {
        console.error("Error cargando clases:", error);
      }
    };

    fetchClases();
  }, []);

  const handleReservar = (clase) => {
    if (!token) {
      navigate("/login");
    } else {
      // Aquí pondrías lógica real para reservar
      alert(`Reservaste la clase de ${clase.nombre} a las ${clase.hora}`);
    }
  };

  return (
    <div className="container">
      <h2>Clases Disponibles</h2>
      <table>
        <thead>
          <tr>
            <th>Clase</th>
            <th>Hora</th>
            <th>Día</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {clases.map((clase) => (
            <tr key={clase.id_horario}>
              <td>{clase.nombre}</td>
              <td>{clase.hora}</td>
              <td>{clase.dia}</td>
              <td>
                <button onClick={() => handleReservar(clase)}>
                  {token ? "Reservar" : "Inicia sesión para reservar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clases;
