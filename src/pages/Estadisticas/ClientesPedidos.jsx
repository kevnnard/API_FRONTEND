import moment from "moment/min/moment-with-locales";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import Alerta from "../../components/Alerta";
import axios from "axios";
import CardOnline from "../../components/Online/CardOnline";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";

function ClientesPedidos() {
  moment.locale("es-us");
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [online, setOnline] = useState({});
  const [alerta, setalerta] = useState({});
  const [usuarios, setUsuarios] = useState({});
  const [productoState, setProductoState] = useState(false);

  // paginacion de productos
  const [page, setPage] = useState(1);

  const handlePage = async (event, value) => {
    setPage(value);
    obtenerUsuarios();
  };

  // Modal y obtener id 
  const [ccCliente, setCcCliente] = useState("");
  const [open2, setOpen2] = useState(false);
  const [ventasPorCliente, setVentasPorCliente] = useState({});
  const [ventasEstado, setVentasEstado] = useState(false);


  const handleOpen2 = () => {
    setOpen2(true);
    obtenerVentasPorUsuario();
  };
  const handleClose2 = () => {
    setOpen2(false);
    setVentasPorCliente({});
    setVentasEstado(false);
  };

  const obtenerUsuarios = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/estadisticas/clientes-pedidos`,
        {
          page,
        }
      );
      setUsuarios({ data });
      setProductoState(true);
    } catch (error) {
      setalerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const obtenerVentasPorUsuario = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/estadisticas/clientes-pedidos/user`,
        {
          ccCliente,
        }
      );
      setVentasPorCliente({data});
      setVentasEstado(true);
    } catch (error) {
      setalerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const { msgOnline } = online;
  const { msg } = alerta;
  let cont = 0;
  return (
    <>
      {auth.role === "ADMIN" ? (
        <>
          <h1 className="text-5xl text-center p-5 uppercase font-bold underline">
            Clientes GRUPO R
          </h1>
          <main className="main-users-online">
            {productoState == true ? (
              <div className="paginate_productos">
                <Stack spacing={1}>
                  <Pagination
                    count={usuarios.data.totalPages}
                    variant="outlined"
                    page={usuarios.data.page}
                    color="secondary"
                    onChange={handlePage}
                  />
                </Stack>
              </div>
            ) : (
              ""
            )}
            {msg && <Alerta alerta={alerta} />}
            {msgOnline && <CardOnline online={online} />}
            <table>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Cedula o Nit</th>
                <th>Telefono</th>
                <th>Ciudad</th>
                <th>Email</th>
                <th>Fecha de Firma</th>
                <th>Accion</th>
              </tr>
              {productoState == true
                ? usuarios.data.docs.map((item) => (
                    <tr key={item._id}>
                      <td>{(cont += 1)}</td>
                      <td>{item.nombre}</td>
                      <td>{item.cedula}</td>
                      <td>{item.telefono}</td>
                      <td>{item.ciudad}</td>
                      <td>{item.email}</td>
                      <td>{moment(item.fecha).calendar()}</td>
                      <td>
                        <button
                          value={item.cedula}
                          onMouseEnter={(e) => setCcCliente(e.target.value)}
                          onClick={handleOpen2}
                          style={{
                            fontSize: "1.1rem",
                            background: "#f00",
                            color: "#fff",
                            padding: "1rem 3rem",
                            borderRadius: "5px",
                          }}
                        >
                          Ver
                        </button>
                      </td>
                    </tr>
                  ))
                : null}
            </table>
            {productoState == true ? (
              <div className="paginate_productos">
                <Stack spacing={1}>
                  <Pagination
                    count={usuarios.data.totalPages}
                    variant="outlined"
                    page={usuarios.data.page}
                    color="secondary"
                    onChange={handlePage}
                    hideNextButton
                  />
                </Stack>
              </div>
            ) : (
              ""
            )}
          </main>
          <Modal
            open={open2}
            onClose={handleClose2}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className="modalBoxxx">
              <h1>Pedidos del cliente</h1>
              <div className="flex justify-center align-items-center text-center font-bold list-none text-3xl gap-20 flex-grap overflow-hidden">
                {ventasEstado === true ? (
                  ventasPorCliente.data.map((item) => (
                    <li className=" p-3 bg-black rounded-3xl">
                      <p className="text-red-800  pb-3">{item.nuVenta}</p>
                      {item.tienda == "Shopify" ? (
                        <p className="uppercase text-xl pb-4 text-white">
                          {moment(item.fechaShopify).calendar()}
                        </p>
                      ) : (
                        <p className="uppercase text-xl pb-4 text-white">
                          {moment(item.fecha).calendar()}
                        </p>
                      )}
                      <Link
                        style={{
                          fontSize: "1rem",
                          background: "#f00",
                          color: "#fff",
                          padding: ".8rem",
                          borderRadius: "5px",
                        }}
                        to={`/dashboard/ventas-manuales/${item._id}`}
                      >
                        ver pedido
                      </Link>
                    </li>
                  ))
                ) : (
                  <p>Sin Pedidos</p>
                )}
              </div>
            </div>
          </Modal>
        </>
      ) : (
        navigate("/dashboard")
      )}
    </>
  );
}

export default ClientesPedidos;
