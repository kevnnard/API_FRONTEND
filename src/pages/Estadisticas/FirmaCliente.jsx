
import moment from "moment/min/moment-with-locales";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import Alerta from "../../components/Alerta";
import axios from "axios";
import CardOnline from "../../components/Online/CardOnline";

function Firmacliente() {
  moment.locale("es-us");
  const { auth } = useAuth();
  const navigate = useNavigate();


  const [online, setOnline] = useState({});
  const [alerta, setalerta] = useState({});
  const [usuarios, setUsuarios] = useState([]);

  let socket;

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  
  const obtenerUsuarios = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/clienteTerminos`;
      const { data } = await axios.get(url);
      setUsuarios(data);
    } catch (error) {
      setalerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };


  const { msgOnline } = online;
  const { msg } = alerta;
  let cont = 0;
  return (
    <>
      {auth.role === "ADMIN" ? (
        <>
          <h1 className="text-4xl text-center p-5 capitalize">
            Usuarios que realizaron su firma 
          </h1>
          <main className="main-users-online">
            {msg && <Alerta alerta={alerta} />}
            {msgOnline && <CardOnline online={online} />}
            <table>
              <tr>
                <th>#</th>
                <th>Emai</th>
                <th>Nombre</th>
                <th>Telefono</th>
                <th>Tienda</th>
                <th>Fecha de Firma</th>
              </tr>
              {usuarios.map((item) => (
                <tr key={item._id}>
                  <td>{(cont += 1)}</td>
                  {/* <td>{item._id}</td> */}
                  <td>{item.email}</td>
                  <td>{item.nombre}</td>
                  <td>{item.telefono}</td>
                  <td>{item.tienda}</td>
                  <td>{moment(item.fechaFirmada).calendar()}</td>
                </tr>
              ))}
            </table>
          </main>

        </>
      ) : (
        navigate("/dashboard")
      )}
    </>
  );
}

export default Firmacliente;
