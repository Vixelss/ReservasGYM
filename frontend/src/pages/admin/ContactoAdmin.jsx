import { useEffect, useState } from "react";

function ContactoAdmin() {
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/contacto")
      .then((res) => res.json())
      .then(setMensajes);
  }, []);

  return (
    <div>
      <h2>📩 Mensajes de contacto</h2>
      {mensajes.length === 0 ? (
        <p>No hay mensajes todavía.</p>
      ) : (
        mensajes.map((m) => (
          <div key={m.id_mensaje}>
            <p><strong>{m.nombre}</strong> ({m.correo})</p>
            <p><b>{m.asunto}:</b> {m.contenido}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default ContactoAdmin;
