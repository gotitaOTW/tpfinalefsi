// import axios from "axios";
// import { createContext, useContext, useState } from "react";
// // ❓ Pregunta 1:
// // ¿Cómo hacés una petición GET con Axios para obtener datos desde la URL https://api.example.com/productos y qué devuelve esa función?

// // ❓ Pregunta 2:
// // ¿Cómo mandás un objeto con datos (por ejemplo: { nombre: 'Thiago', edad: 17 }) usando axios.post a una URL https://api.example.com/usuarios?

// // ❓ Pregunta 3:
// // ¿Cómo le agregás un token JWT en los headers a un request GET usando Axios?
// // (Suponé que el token ya lo tenés en una variable token.)

// // ❓ Pregunta 4:
// // ¿Cómo recuperás un token guardado en el localStorage y lo usás en un request POST con Axios?
// // // (Sin decir cómo se guardó ese token, solo cómo lo sacás y lo usás.)
// // ❓ Pregunta 5:
// // ¿Cómo guardás un token JWT que recibiste en response.data.token al hacer login, usando localStorage?

// // ❓ Pregunta 6:
// // ¿Cómo eliminás un token guardado en localStorage cuando el usuario hace logout?

// // ❓ Pregunta 7:
// // ¿Cómo configurás Axios globalmente para que todos los requests incluyan el token automáticamente si existe en localStorage?

// // Pista: esto se hace al principio del proyecto.

// // ❓ Pregunta 8:
// // ¿Qué pasa si haces un axios.post a una API protegida sin mandar token? ¿Qué error podrías recibir y cómo lo detectarías con un try/catch?

// const response=await axios.get(URL);
// //2
// const usuario = await axios.post(URL, { nombre: 'Thiago', edad: 17 });
// //3
// const comprar = await axios.post(URL,Data,{
//     headers:{
//         Authorition:`Bearer ${token}`
//     }
// })
// //4
// const token = localStorage.getItem("token");
// const enrollmentSucces= await axios.post(url,{},{headers:{Authorization:`Bearer ${token}`}});
// //5
// const token = response.data.token;
// localStorage.setItem("token",token);
// //6
// localStorage.removeItem("token");
// //7
// me mataste
// //8
// te dice q falta token. error 401??? en el catch pongo si error==401?
// //9
//     const url='https://api.example.com';
//     const response=await axios.post(url+'/login',{email,password});
//     const token = response.data.token;
//     localStorage.setItem("token",token);
//     //asumimos que la api devuelve todo bien y no incluimos el codigo en el trycatch
//     try {
//         const respuestaPerfil = await axios.get(url+'/perfil',{headers:{Authorization:`Bearer ${token}`}});
//         const perfilDatos = respuestaPerfil.data.perfil;
//     } catch (error) {
//         if(error.response && error.response.status===401){
//             localStorage.removeItem("token");
//         }
//         else{
//             throw error;
//         }
        
//     }
//     //10
//     //todos los imports
// //     ❓ Pregunta 2
// // Escribí un ejemplo mínimo de creación de contexto llamado AuthContext y de su Provider AuthProvider que reciba children y comparta un valor 
// // { usuario: "Thiago" }.

// const AuthContext = createContext();

// const AuthProvider = async ({children}) =>{
//     const [usuarioNombre, setUsuarioNombre]=useState("Thiago");

//     return(
//         <AuthContext.Provider values={usuarioNombre,setUsuarioNombre}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// // y dsp vas a main.jsx y pone <AuthContext.Provider> para envolver app