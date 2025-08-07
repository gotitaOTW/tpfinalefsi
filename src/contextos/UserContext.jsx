import { createContext, useState, useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";

export const UserContext=createContext();//crea el objeto de contexto

export const UserProvider=({children})=>{//crea un provider 
    const [username, setUsuarname] = useState(null);//guarda localmente el valor para pasarselo al provider
    const [token, setToken] = useState(() => localStorage.getItem("token"));
      
    useEffect(() => {
      if (token) {
        try {
          const payload = jwt_decode(token);
          setUsername(payload.username);
        } catch (error) {
          setUsername(null);
          setToken(null);
        }
      } else {
        setUsername(null);
        setToken(null);
      }
    }, []);
      return (
        //.Provider es la funcion del contexto que se encarga de proveer los datos que tiene en value a todos sus hijos
        <UserContext.Provider
          value={{
            username,
            setUsername,
            token,
            setToken,
          }}
        >
        {/* al provider se le pasan las variables que debe pasarle a todos los hijos */}
          {children} 
          {/* los hijos que reciben esos valores (el resto de la app) */}
        </UserContext.Provider>
      );
    };
    