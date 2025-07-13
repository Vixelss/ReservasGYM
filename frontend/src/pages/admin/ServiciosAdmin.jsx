import { useEffect, useState } from "react";

const ServiciosAdmin = () => {
  const [servicios, setServicios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [duracion, setDuracion] = useState("");
  const [editando, setEditando] = useState(null); // id_servicio

  const token = localStorage.getItem("token");

  const cargarServicios = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/servicios");
      const data = await res.json();
      setServicios(data);
    } catch (err) {
      console.error("Error al cargar servicios:", err);
    }
  };

  useEffect(() => {
    cargarServicios();
  }, []);

  const limpiarFormulario = () => {
    setNombre("");
    setDescripcion("");
    setDuracion("");
    setEditando(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { nombre, descripcion, duracion_min: Number(duracion) };

    try {
      const url = editando
        ? `http://localhost:4000/api/servicios/${editando}`
        : `http://localhost:4000/api/servicios`;

      const method = editando ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        cargarServicios();
        limpiarFormulario();
      } else {
        console.error("Error al guardar servicio");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditar = (servicio) => {
    setEditando(servicio.id_servicio);
    setNombre(servicio.nombre);
    setDescripcion(servicio.descripcion);
    setDuracion(servicio.duracion_min);
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este servicio?");
    if (!confirmar) return;

    try {
      const res = await fetch(`http://localhost:4000/api/servicios/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) cargarServicios();
      else console.error("Error al eliminar servicio");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Servicios</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <input
          type="number"
          placeholder="Duración (min)"
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
          required
        />
        <button type="submit">{editando ? "Actualizar" : "Agregar"}</button>
        {editando && <button onClick={limpiarFormulario}>Cancelar</button>}
      </form>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Duración</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((s) => (
            <tr key={s.id_servicio}>
              <td>{s.nombre}</td>
              <td>{s.descripcion}</td>
              <td>{s.duracion_min} min</td>
              <td>
                <button onClick={() => handleEditar(s)}>Editar</button>
                <button onClick={() => handleEliminar(s.id_servicio)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiciosAdmin;
