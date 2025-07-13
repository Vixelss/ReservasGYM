import { useEffect, useState } from "react";

function OpinionesList() {
  const [opiniones, setOpiniones] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/opiniones")
      .then((res) => res.json())
      .then(setOpiniones);
  }, []);

  return (
    <div className="opiniones">
      <h3>🗣️ Opiniones de nuestros usuarios</h3>
      {opiniones.length === 0 ? (
        <p>Aún no hay opiniones.</p>
      ) : (
        opiniones.map((op, i) => (
          <div key={i} className="opinion-card">
            <strong>{op.usuario}</strong> sobre <b>{op.servicio}</b>:
            <p>{op.comentario}</p>
            <small>⭐ {op.puntuacion}/5 — {op.fecha}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default OpinionesList;
