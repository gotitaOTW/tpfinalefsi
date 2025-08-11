import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../contextos/UserContext";
import api from "../api";
import "../styles/Login.css";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const { setUsername, setToken } = useContext(UserContext);
  const navigate = useNavigate();

  const [username, setUsernameInput] = useState("");
  const [password, setPasswordInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.post("/user/login", { username, password });
      const { success, message, token } = response.data || {};
      if (!success) {
        setError(message || "Credenciales inválidas");
        return;
      }
      localStorage.setItem("token", token);
      const payload = jwtDecode(token);
      setUsername(payload.username);
      setToken(token);
      navigate("/");
    } catch (err) {
      const message = err?.response?.data?.message || "Error al iniciar sesión";
      setError(message);
    }
  };

  return (
    <div className="Login-container">
      <form className="Login-form" onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>

        <label>Usuario (email)</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsernameInput(e.target.value)}
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPasswordInput(e.target.value)}
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
