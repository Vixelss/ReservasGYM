    

export async function registrar(nombre, correo, password) {
  const res = await fetch(`${API_URL}/registro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, correo, password })
  });
  return await res.json();
}

export async function obtenerClases() {
  const res = await fetch(`${API_URL}/servicios`);
  return await res.json();
}

export async function login(correo, password) {
  const res = await fetch('http://localhost:4000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ correo, password }),
  });

  return res.json(); // ← aquí ya regresa el token y el rol
}
