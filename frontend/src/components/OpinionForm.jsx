import { useState } from "react";

function OpinionForm() {
  const [form, setForm] = useState({
    usuario: "",
    servicio: "",
    comentario: "",
    puntuacion: 5,
    fecha: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const enviar = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:4000/api/opiniones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    alert("Gracias por tu opinión!");
    setForm({ ...form, usuario: "", servicio: "", comentario: "" });
  };

  return (
    <form onSubmit={enviar} className="opinion-form">
      <h3>📝 Deja tu opinión</h3>
      <input name="usuario" value={form.usuario} onChange={handleChange} placeholder="Tu nombre" required />
      <input name="servicio" value={form.servicio} onChange={handleChange} placeholder="Clase o servicio" required />
      <textarea name="comentario" value={form.comentario} onChange={handleChange} placeholder="Comentario" required />
      <input type="number" name="puntuacion" min="1" max="5" value={form.puntuacion} onChange={handleChange} />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default OpinionForm;
