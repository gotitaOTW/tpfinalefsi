import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../contextos/UserContext";
import "../styles/Login.css";

const Login = () => {
  const { setUsuario, usuarios } = useContext(UserContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuario = usuarios.find(u => u.email === email);

    if (!usuario) {
      setError("No existe un usuario con ese correo.");
    } else if (usuario.contrasena !== contrasena) {
      setError("Contraseña incorrecta.");
    } else {
      setUsuario(usuario);
      navigate("/");
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
