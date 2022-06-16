import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import Alerta from "../components/Alerta";
import axios from "axios";

function UsersList() {
  const { auth } = useAuth();
  const { handleModlaEliminarColaborador, eliminarColaborador } = useAuth();
  const navigate = useNavigate();
  const [alerta, setalerta] = useState({});
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    obtenerUsuarios();
  }, []);
 
  const obtenerUsuarios = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/dashboard/users`;
      const { data } = await axios.get(url);
      setUsuarios(data);
    } catch (error) {
      setalerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  const { msg } = alerta;
  let cont = 0
  return (
    <>
      {auth.role === "ADMIN" ? (
        <>
          <h1 className="text-4xl text-center p-5 capitalize">
            Usuarios Registrados
          </h1>
          <main className=" md:flex md:justify-center">
            {msg && <Alerta alerta={alerta} />}
            <table>
              <tr>
                <th>#</th>
                <th>Id</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol De Usuario</th>
                <th>Cuenta confirmada</th>
                <th>Fecha Creacion</th>
                <th>Accion/ DOBLE CLICK</th>
              </tr>
              {usuarios.map((item) => (
                <tr key={item.id}>
                  <td>{(cont += 1)}</td>
                  <td>{item._id}</td>
                  <td>{item.nombre}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    {item.confirm
                      ? item.confirm.toString().replace(true, "SI")
                      : item.confirm.toString().replace(false, "NO")}
                  </td>
                  <td>{item.created_at}</td>
                  {item.role === 'ADMIN' ? '' : <td>
                    <button id="button1"
                      onClick={() => handleModlaEliminarColaborador(item)||eliminarColaborador()}
                      className="buton-borrar button1"
                    >
                      Borrar USUARIO
                    </button>  
                  </td>}
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

export default UsersList;
