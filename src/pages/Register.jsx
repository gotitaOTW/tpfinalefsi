import { useContext, useState } from "react";
import { UserContext } from "../contextos/UserContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../styles/Register.css';



const Register = () => {
  const { usuarios, setUsuarios, setUsuario } = useContext(UserContext);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
    esAdmin:false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailExistente = usuarios.find(u => u.email === form.email);
    if (emailExistente) {
      alert("Este email ya está registrado. Haga click en iniciar sesión");
      return;
    }

    setUsuarios([...usuarios, nuevoUsuario]);
    setUsuario(nuevoUsuario);
    navigate("/");
  };

  return (
    <div className="Register-container" style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Crear cuenta</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" onChange={handleChange} required />
        <input name="apellido" placeholder="Apellido" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="contrasena" type="password" placeholder="Contraseña" onChange={handleChange} required />
        <button type="submit">Registrarse</button>
      </form>
      <p style={{ marginTop: "1rem" }}>
        ¿Ya tienes cuenta?
        <Link to="/login" style={{ color: "blue", textDecoration: "underline" }}>
            Inicia sesión
        </Link>
     </p>
    </div>
  );
};

export default Register;
