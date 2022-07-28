import axios from "axios";
import io from "socket.io-client";
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
const AuthContext = createContext();


const AuthProvider = ({children}) => {

    const [alerta, setAlerta] = useState({});
    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);
    const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false);
    const [ userColaborador, setUserColaborador] = useState({});

    const navigate = useNavigate();

    let socket;
    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem("token");
            if(!token){
                setCargando(false)
                return
            }
            const config = {
                headers :{
                    "Content-Type": "aplication/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/perfil`,
                  config
                );
                setAuth(data)
                setAlerta({});
                // navigate('/dashboard')
                socket = io(import.meta.env.VITE_BACKEND_URL);
                socket.emit("online", { data });
            } catch (error) {
                setAuth({})
                navigate('/')
                setAlerta({
                    msg: "No tienes los permisos para acceder",
                    error: true
                })
                console.log(error)
            } 
            setCargando(false)
            setAlerta({});
        }
        autenticarUsuario();

        if (window.location.reload) {
          localStorage.removeItem("token");
        } else {
          console.log("oki");
        }
    }, [])


    const handleModlaEliminarColaborador = (usuario) => {
      setModalEliminarColaborador(!modalEliminarColaborador);
      setUserColaborador(usuario);
    };

    const eliminarColaborador = async () => {
        try {
             const borrar = userColaborador._id;
             borrar.toString()
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/dashboard/users/delete/${borrar}`)
            setCargando(true)
            setUserColaborador({})
            setAlerta({
              msg: data.msg,
              error: true,
            });
        } catch (error) {
            console.log(error)
        } finally {
            setCargando(false)
        }
    }

    const cerrarSesionAuth = async () => {
      setAuth({});
    };

    const { msg } = alerta;
    return (
      <AuthContext.Provider
        value={{
          auth,
          setAuth,
          cargando,
          cerrarSesionAuth,
          handleModlaEliminarColaborador,
          modalEliminarColaborador,
          eliminarColaborador,
        }}
      >
        {msg && <Alerta alerta={alerta} />}
        {children}
      </AuthContext.Provider>
    );
}

export {
    AuthProvider
}
export default AuthContext;