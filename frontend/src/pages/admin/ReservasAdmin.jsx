import { useEffect, useState } from "react";

const ReservasAdmin = () => {
  const [reservas, setReservas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [form, setForm] = useState({
    id_usuario: "",
    id_horario: "",
    estado: "pendiente",
  });
  const [editando, setEditando] = useState(null);
  const [editForm, setEditForm] = useState({
    id_usuario: "",
    id_horario: "",
    estado: "",
  });

  const token = localStorage.getItem("token");

  const cargar = async () => {
    try {
      const [resReservas, resUsuarios, resHorarios] = await Promise.all([
        fetch("http://localhost:4000/api/reservas/admin", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:4000/api/usuarios", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:4000/api/horarios", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!resReservas.ok) throw new Error("Error al obtener reservas");

      const [dataR, dataU, dataH] = await Promise.all([
        resReservas.json(),
        resUsuarios.json(),
        resHorarios.json(),
      ]);

      setReservas(dataR || []);
      setUsuarios(dataU || []);
      setHorarios(dataH || []);
    } catch (err) {
      console.error("Error cargando datos de reservas:", err);
      setReservas([]);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const agregar = async () => {
    if (!form.id_usuario || !form.id_horario) {
      return alert("Faltan datos");
    }

    const res = await fetch("http://localhost:4000/api/reservas/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ id_usuario: "", id_horario: "", estado: "pendiente" });
      cargar();
    }
  };

  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar reserva?")) return;

    await fetch(`http://localhost:4000/api/reservas/admin/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    cargar();
  };

  const guardarEdicion = async (id) => {
    const res = await fetch(`http://localhost:4000/api/reservas/admin/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editForm),
    });

    if (res.ok) {
      setEditando(null);
      cargar();
    }
  };

  return (
    <div>
      <h3>Reservas</h3>

      {/* Formulario para agregar nueva reserva */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "1rem" }}>
        <select
          value={form.id_usuario}
          onChange={(e) => setForm({ ...form, id_usuario: e.target.value })}
        >
          <option value="">Usuario...</option>
          {usuarios.map((u) => (
            <option key={u.id_usuario} value={u.id_usuario}>
              {u.nombre}
            </option>
          ))}
        </select>

        <select
          value={form.id_horario}
          onChange={(e) => setForm({ ...form, id_horario: e.target.value })}
        >
          <option value="">Clase...</option>
          {horarios.map((h) => (
            <option key={h.id_horario} value={h.id_horario}>
              {h.servicio} - {h.fecha}
            </option>
          ))}
        </select>

        <select
          value={form.estado}
          onChange={(e) => setForm({ ...form, estado: e.target.value })}
        >
          <option value="pendiente">pendiente</option>
          <option value="confirmado">confirmado</option>
          <option value="cancelado">cancelado</option>
        </select>

        <button onClick={agregar}>Agregar</button>
      </div>

      {/* Tabla de reservas */}
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Clase</th>
            <th>Fecha</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(reservas) &&
            reservas.map((r) =>
              editando === r.id_reserva ? (
                <tr key={r.id_reserva}>
                  <td>
                    <select
                      value={editForm.id_usuario}
                      onChange={(e) =>
                        setEditForm({ ...editForm, id_usuario: e.target.value })
                      }
                    >
                      <option value="">Usuario...</option>
                      {usuarios.map((u) => (
                        <option key={u.id_usuario} value={u.id_usuario}>
                          {u.nombre}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      value={editForm.id_horario}
                      onChange={(e) =>
                        setEditForm({ ...editForm, id_horario: e.target.value })
                      }
                    >
                      <option value="">Clase...</option>
                      {horarios.map((h) => (
                        <option key={h.id_horario} value={h.id_horario}>
                          {h.servicio} - {h.fecha}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{r.fecha}</td>
                  <td>
                    <select
                      value={editForm.estado}
                      onChange={(e) =>
                        setEditForm({ ...editForm, estado: e.target.value })
                      }
                    >
                      <option value="pendiente">pendiente</option>
                      <option value="confirmado">confirmado</option>
                      <option value="cancelado">cancelado</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={() => guardarEdicion(r.id_reserva)}>Guardar</button>
                    <button onClick={() => setEditando(null)}>Cancelar</button>
                  </td>
                </tr>
              ) : (
                <tr key={r.id_reserva}>
                  <td>{r.usuario}</td>
                  <td>{r.clase}</td>
                  <td>{r.fecha}</td>
                  <td>
                    <button
                      onClick={() => {
                        setEditando(r.id_reserva);
                        setEditForm({
                          id_usuario:
                            usuarios.find((u) => u.nombre === r.usuario)
                              ?.id_usuario || "",
                          id_horario:
                            horarios.find(
                              (h) =>
                                h.servicio === r.clase && h.fecha === r.fecha
                            )?.id_horario || "",
                          estado: r.estado,
                        });
                      }}
                    >
                      Editar
                    </button>
                    <button onClick={() => eliminar(r.id_reserva)}>Eliminar</button>
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </div>
  );
};

export default ReservasAdmin;
