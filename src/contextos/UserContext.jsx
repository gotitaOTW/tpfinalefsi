import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext=createContext();//crea el objeto de contexto

export const UserProvider=({children})=>{//crea un provider 
    const [username, setUsername] = useState(null);//guarda localmente el valor para pasarselo al provider
    const [userId,setUserId]=useState(null);
    const [token, setToken] = useState(() => localStorage.getItem("token"));
      
    useEffect(() => {
      if (token) {
        try {
          const payload = jwtDecode(token);
          setUsername(payload.username);
          setUserId(payload.id);
        } catch (error) {
          setUsername(null);
          setToken(null);
        }
      } else {
        setUsername(null);
        setToken(null);
      }
    }, [token]);
      return (
        //.Provider es la funcion del contexto que se encarga de proveer los datos que tiene en value a todos sus hijos
        <UserContext.Provider
          value={{
            username,
            setUsername,
            token,
            setToken,
            userId,
          }}
        >
        {/* al provider se le pasan las variables que debe pasarle a todos los hijos */}
          {children} 
          {/* los hijos que reciben esos valores (el resto de la app) */}
        </UserContext.Provider>
      );
    };
    