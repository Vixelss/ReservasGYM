import { useState } from "react";

function ContactoForm() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    asunto: "",
    contenido: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const enviar = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:4000/api/contacto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    alert("Mensaje enviado correctamente");
    setForm({ nombre: "", correo: "", asunto: "", contenido: "" });
  };

  return (
    <form onSubmit={enviar} className="contacto-form">
      <h3>📬 Contáctanos</h3>
      <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Tu nombre" required />
      <input name="correo" type="email" value={form.correo} onChange={handleChange} placeholder="Tu correo" required />
      <input name="asunto" value={form.asunto} onChange={handleChange} placeholder="Asunto" required />
      <textarea name="contenido" value={form.contenido} onChange={handleChange} placeholder="Mensaje" required />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default ContactoForm;
