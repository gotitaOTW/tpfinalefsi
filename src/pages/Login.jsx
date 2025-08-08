import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../contextos/UserContext";
import api from "../api";
import "../styles/Login.css";
import jwt_decode from "jwt-decode";

const Login = () => {
  const { setUsername, setToken } = useContext(UserContext); // <-- Usá los setters del contexto

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/login", { email, contrasena });
      const token = response.data.token;
      localStorage.setItem("token", token);
      const payload = jwt_decode(token);
      setUsername(payload.username);
      setToken(token);
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="Login-container">
      <form className="Login-form" onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>

        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Ingresar</button>

        <p className="no-cuenta-text">
          No tengo cuenta.{" "}
          <Link to="/register" className="link-crear-cuenta">
            Crear cuenta
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
