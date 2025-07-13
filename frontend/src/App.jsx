import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPanel from './pages/admin/AdminPanel'; // 👈 nuevo import

function App() {
  const user = JSON.parse(localStorage.getItem("usuario"));


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 👇 Ruta protegida para admin */}
        <Route
  path="/admin"
  element={
    user?.rol === "admin" ? (     // <-- CAMBIA ESTO
      <AdminPanel />
    ) : (
      <Navigate to="/" />
    )
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
