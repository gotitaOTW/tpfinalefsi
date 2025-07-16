import { createContext, useState, useContext } from "react";

export const UserContext=createContext();

export const UserProvider=({children})=>{
    const [usuario, setUsuario] = useState(null);
    const [usuarios, setUsuarios] = useState(
      [
        {
          id:1,
          esAdmin:true,
          nombre:"dev",
          apellido:"android",
          email:"dev",
          contrasena:"info"
        }
      ]
      );
      
      return (
        <UserContext.Provider
          value={{
            usuario,
            setUsuario,
            usuarios,
            setUsuarios,
          }}
        >
          {children}
        </UserContext.Provider>
      );
    };
    