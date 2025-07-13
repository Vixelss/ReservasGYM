import { useEffect, useState } from "react";

function LogsAdmin() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/logs")
      .then((res) => res.json())
      .then(setLogs);
  }, []);

  return (
    <div>
      <h2>📜 Logs de acceso</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Fecha</th>
            <th>IP</th>
            <th>Navegador</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id_log}>
              <td>{log.usuario_email}</td>
              <td>{log.fecha_hora}</td>
              <td>{log.ip}</td>
              <td>{log.navegador}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LogsAdmin;
