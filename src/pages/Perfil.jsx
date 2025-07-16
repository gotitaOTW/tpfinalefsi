import React from "react"
import { useContext } from "react";
import { UserContext } from "../contextos/UserContext";
import { useNavigate } from "react-router-dom";
import '../styles/Perfil.css';
import { useEffect } from "react";

const Perfil =()=>{
  const { usuario, setUsuario } = useContext(UserContext);
  const navigate=useNavigate();

  useEffect(() => {
    if (!usuario) {
      navigate('/register');
    }
  }, [usuario, navigate]);
  if (!usuario) return null;
  const cerrarSesion = () => {
    const confirmar = window.confirm("¿Seguro que quiere cerrar sesión?");
    if (confirmar) {
      setUsuario(null);
      navigate('/');
    }
  };
    return(
        <>
            <div className="perfil-container">
            <h2>Perfil</h2>
            <div className="perfil-info">
                <p><strong>Nombre:</strong> {usuario.nombre}</p>
                <p><strong>Apellido:</strong> {usuario.apellido}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
                {usuario.esAdmin?
                  <p><strong>Rol:</strong> Administrador</p>
                :<></>}
                <button className="cerrar-sesion-btn" onClick={cerrarSesion}>
                    Cerrar sesión
                </button>
            </div>
            </div>
        </>
    )
}

export default Perfil