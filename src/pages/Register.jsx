import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../styles/Register.css';
import api from '../api';

const Register = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await api.post('/user/register', form);
      window.alert('Registro exitoso. Ahora puede iniciar sesión.');
      navigate('/login');
    }catch(err){
      console.error(err);
      window.alert(err?.response?.data?.message || 'No se pudo registrar.');
    }
  };

  return (
    <div className="Register-container" style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Crear cuenta</h2>
      <form onSubmit={handleSubmit}>
        <input name="first_name" placeholder="Nombre" value={form.first_name} onChange={handleChange} required />
        <input name="last_name" placeholder="Apellido" value={form.last_name} onChange={handleChange} required />
        <input name="username" placeholder="Email" value={form.username} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
        <button type="submit">Registrarse</button>
      </form>
      <p style={{ marginTop: "1rem" }}>
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="link-crear-cuenta">
            Inicia sesión
        </Link>
     </p>
    </div>
  );
};

export default Register;
