import { useEffect, useState } from "react";

function EstadisticasAdmin() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/estadisticas")
      .then((res) => res.json())
      .then(setDatos);
  }, []);

  return (
    <div>
      <h2>📊 Estadísticas de uso</h2>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Reservas</th>
            <th>Usuarios nuevos</th>
            <th>Servicio más usado</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((d) => (
            <tr key={d.id_estadistica}>
              <td>{d.fecha}</td>
              <td>{d.reservas_totales}</td>
              <td>{d.usuarios_nuevos}</td>
              <td>{d.servicio_mas_usado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EstadisticasAdmin;
