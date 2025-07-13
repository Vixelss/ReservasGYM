import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ClaseCard from "../components/clasecard";
import ContactoForm from "../components/ContactoForm";
import OpinionForm from "../components/OpinionForm";
import OpinionesList from "../components/OpinionesList";
import "../styles/home.css";

const Home = () => {
  const [clases, setClases] = useState([]);
  const [reservadas, setReservadas] = useState([]);
  const logueado = Boolean(localStorage.getItem("token"));

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/clases")
      .then((res) => setClases(res.data))
      .catch(console.error);

    if (logueado) {
      axios
        .get("http://localhost:4000/api/reservas", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then((res) => {
          const ids = res.data.map((r) => r.id_horario);
          setReservadas(ids);
        })
        .catch(console.error);
    }
  }, [logueado]);

  const reservar = (id) => {
    axios
      .post(
        "http://localhost:4000/api/reservas",
        { id_horario: id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      .then(() => {
        alert("Reservado!");
        setReservadas((prev) => [...prev, id]);
      })
      .catch(() => alert("Error al reservar"));
  };

  return (
    <>
      <header className="hero">
        <div className="hero-content">
          <h1>Reserva tu clase de GYM</h1>
          <p>Yoga · Zumba · CrossFit · ¡y más!</p>

          {!logueado && (
            <Link to="/login" className="btn-primary">
              Iniciar sesión
            </Link>
          )}
        </div>
      </header>

      <div className="container">
        <h2 className="section-title">Clases disponibles</h2>

        <div className="grid">
          {clases.map((c) => (
            <ClaseCard
              key={c.id_horario}
              clase={c}
              onReservar={reservar}
              logueado={logueado}
              yaReservada={reservadas.includes(c.id_horario)}
            />
          ))}

          {clases.length === 0 && <p>No hay clases cargadas.</p>}
        </div>
      </div>

      {/* 👇 Contacto y opiniones al final */}
      <div className="zona-extra container">
        <ContactoForm />
        <hr />
        <OpinionForm />
        <OpinionesList />
      </div>
    </>
  );
};

export default Home;
