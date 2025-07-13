import { useEffect, useState } from "react";

const UsuariosAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevo, setNuevo] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'cliente'
  });

  const [editando, setEditando] = useState(null);
  const [editData, setEditData] = useState({
    nombre: '',
    email: '',
    rol: 'cliente',
    password: ''
  });

  const token = localStorage.getItem("token");

  const cargarUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/usuarios", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsuarios(data);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
    }
  };

  const agregarUsuario = async () => {
    if (!nuevo.nombre || !nuevo.email || !nuevo.password) {
      alert("Completa todos los campos");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(nuevo),
      });

      if (!res.ok) throw new Error("Error al crear usuario");

      setNuevo({ nombre: '', email: '', password: '', rol: 'cliente' });
      cargarUsuarios();
    } catch (err) {
      console.error(err);
      alert("No se pudo crear el usuario");
    }
  };

  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Eliminar este usuario?")) return;

    try {
      const res = await fetch(`http://localhost:4000/api/usuarios/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) cargarUsuarios();
    } catch (err) {
      console.error(err);
    }
  };

  const comenzarEdicion = (usuario) => {
    setEditando(usuario.id_usuario);
    setEditData({
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.role,
      password: ''
    });
  };

  const guardarEdicion = async (id) => {
    try {
      const payload = {
        nombre: editData.nombre,
        email: editData.email,
        rol: editData.rol,
      };

      if (editData.password.trim().length > 0) {
        payload.password = editData.password;
      }

      const res = await fetch(`http://localhost:4000/api/usuarios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al editar usuario");

      setEditando(null);
      cargarUsuarios();
    } catch (err) {
      console.error(err);
      alert("No se pudo actualizar el usuario");
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  return (
    <div>
      <h3>Usuarios</h3>

      <div style={{ display: "flex", gap: "10px", marginBottom: "1rem" }}>
        <input
          placeholder="Nombre"
          value={nuevo.nombre}
          onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
        />
        <input
          placeholder="Email"
          type="email"
          value={nuevo.email}
          onChange={(e) => setNuevo({ ...nuevo, email: e.target.value })}
        />
        <input
          placeholder="Contraseña"
          type="password"
          value={nuevo.password}
          onChange={(e) => setNuevo({ ...nuevo, password: e.target.value })}
        />
        <select
          value={nuevo.rol}
          onChange={(e) => setNuevo({ ...nuevo, rol: e.target.value })}
        >
          <option value="cliente">cliente</option>
          <option value="admin">admin</option>
        </select>
        <button onClick={agregarUsuario}>Agregar</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Contraseña</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) =>
            editando === u.id_usuario ? (
              <tr key={u.id_usuario}>
                <td>
                  <input
                    value={editData.nombre}
                    onChange={(e) =>
                      setEditData({ ...editData, nombre: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                  />
                </td>
                <td>
                  <select
                    value={editData.rol}
                    onChange={(e) =>
                      setEditData({ ...editData, rol: e.target.value })
                    }
                  >
                    <option value="cliente">cliente</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td>
                  <input
                    type="password"
                    placeholder="(opcional)"
                    value={editData.password}
                    onChange={(e) =>
                      setEditData({ ...editData, password: e.target.value })
                    }
                  />
                </td>
                <td>
                  <button onClick={() => guardarEdicion(u.id_usuario)}>
                    Guardar
                  </button>
                  <button onClick={() => setEditando(null)}>Cancelar</button>
                </td>
              </tr>
            ) : (
              <tr key={u.id_usuario}>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>••••••••</td>
                <td>
                  <button onClick={() => comenzarEdicion(u)}>Editar</button>
                  <button onClick={() => eliminarUsuario(u.id_usuario)}>Eliminar</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsuariosAdmin;
