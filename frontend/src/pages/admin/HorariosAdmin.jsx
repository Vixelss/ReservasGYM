import { useEffect, useState } from "react";

const HorariosAdmin = () => {
  const [horarios, setHorarios] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [form, setForm] = useState({ id_servicio: "", fecha: "", hora_inicio: "", hora_fin: "", cupo_max: 0 });
  const [editando, setEditando] = useState(null);
  const [editData, setEditData] = useState({ id_servicio: "", fecha: "", hora_inicio: "", hora_fin: "", cupo_max: 0 });

  const token = localStorage.getItem("token");

  const cargarDatos = async () => {
    try {
      const [resHor, resSer] = await Promise.all([
        fetch("http://localhost:4000/api/horarios", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch("http://localhost:4000/api/servicios", {
          headers: { Authorization: `Bearer ${token}` }
        }),
      ]);

      if (!resHor.ok || !resSer.ok) throw new Error("Fallo al cargar datos");

      const [horariosData, serviciosData] = await Promise.all([
        resHor.json(),
        resSer.json()
      ]);

      setHorarios(horariosData);
      setServicios(serviciosData);
    } catch (err) {
      console.error("Error al cargar horarios/servicios:", err);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const crearHorario = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/horarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ id_servicio: "", fecha: "", hora_inicio: "", hora_fin: "", cupo_max: 0 });
      cargarDatos();
    }
  };

  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar horario?")) return;
    await fetch(`http://localhost:4000/api/horarios/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    cargarDatos();
  };

  const comenzarEdicion = (h) => {
    const servicioEncontrado = servicios.find(s => s.nombre === h.servicio);
    setEditando(h.id_horario);
    setEditData({
      id_servicio: servicioEncontrado?.id_servicio || "",
      fecha: h.fecha,
      hora_inicio: h.hora_inicio,
      hora_fin: h.hora_fin,
      cupo_max: h.cupo_max
    });
  };

  const guardarEdicion = async (id) => {
    const res = await fetch(`http://localhost:4000/api/horarios/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(editData)
    });

    if (res.ok) {
      setEditando(null);
      cargarDatos();
    }
  };

  return (
    <div>
      <h3>Horarios</h3>
      <form onSubmit={crearHorario}>
        <select value={form.id_servicio} onChange={(e) => setForm({ ...form, id_servicio: e.target.value })}>
          <option value="">Servicio...</option>
          {servicios.map((s) => (
            <option key={s.id_servicio} value={s.id_servicio}>{s.nombre}</option>
          ))}
        </select>
        <input type="date" value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} />
        <input type="time" value={form.hora_inicio} onChange={(e) => setForm({ ...form, hora_inicio: e.target.value })} />
        <input type="time" value={form.hora_fin} onChange={(e) => setForm({ ...form, hora_fin: e.target.value })} />
        <input type="number" placeholder="Cupo" value={form.cupo_max} onChange={(e) => setForm({ ...form, cupo_max: e.target.value })} />
        <button type="submit">Agregar</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Servicio</th>
            <th>Fecha</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Cupo</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((h) =>
            editando === h.id_horario ? (
              <tr key={h.id_horario}>
                <td>
                  <select value={editData.id_servicio} onChange={(e) => setEditData({ ...editData, id_servicio: e.target.value })}>
                    {servicios.map((s) => (
                      <option key={s.id_servicio} value={s.id_servicio}>{s.nombre}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <input type="date" value={editData.fecha} onChange={(e) => setEditData({ ...editData, fecha: e.target.value })} />
                </td>
                <td>
                  <input type="time" value={editData.hora_inicio} onChange={(e) => setEditData({ ...editData, hora_inicio: e.target.value })} />
                </td>
                <td>
                  <input type="time" value={editData.hora_fin} onChange={(e) => setEditData({ ...editData, hora_fin: e.target.value })} />
                </td>
                <td>
                  <input type="number" value={editData.cupo_max} onChange={(e) => setEditData({ ...editData, cupo_max: e.target.value })} />
                </td>
                <td>
                  <button onClick={() => guardarEdicion(h.id_horario)}>Guardar</button>
                  <button onClick={() => setEditando(null)}>Cancelar</button>
                </td>
              </tr>
            ) : (
              <tr key={h.id_horario}>
                <td>{h.servicio}</td>
                <td>{h.fecha}</td>
                <td>{h.hora_inicio}</td>
                <td>{h.hora_fin}</td>
                <td>{h.cupo_max}</td>
                <td>
                  <button onClick={() => comenzarEdicion(h)}>Editar</button>
                  <button onClick={() => eliminar(h.id_horario)}>Eliminar</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HorariosAdmin;
