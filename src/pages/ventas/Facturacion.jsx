import "./ventas.scss";
import axios from "axios";
import moment from "moment/min/moment-with-locales";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavVentas from "./NavVentas";
import useAuth from "../../hooks/useAuth";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function Facturacion() {
  moment.locale("es-us");
  // auth
  const auth = useAuth();
  const navigate = useNavigate();
  //ventas Sac.us
  const [ventas, setventas] = useState({});
  const [ventass, setVentas] = useState(false);
  // paginacion de productos
  const [page, setPage] = useState(1);

  const handlePage = async (event, value) => {
    if (ventasEstado === "") {
      setPage(value);
      obtenerVentasManuales();
    }
  };


  const obtenerVentasManuales = async () => {
    try {
       const { data } = await axios.post(
         `${
           import.meta.env.VITE_BACKEND_URL
         }/dashboard/ventas-manuales/facturacion`,
         {
           page,
         }
       );
      setventas(data);
      setVentas(true);
    } catch (error) {
      console.log(error);
      setVentas(false);
    }
  };

  useEffect(() => {
    obtenerVentasManuales();
  }, []);

  const actualizar = async () => {
    window.location.reload(true);
  };

  let i = 0;
  if (ventass) {
    for (i in ventas) {
      if (i.estado_pedido == "facturar") {
        break;
      } else {
        i++;
      }
    }
  }

  let cont = 1;
  return (
    <>
      {auth.role === "SERVICIO" || "ADMIN" ? (
        <>
          <NavVentas />
          <h1 className="tit_pri_ventas">
            PEDIDOS PENDIENTES DE FACTURA{" "}
            <span
              style={{
                color: "#f00",
                padding: "3px",
                borderRadius: "20px",
                fontSize: "2.2rem",
              }}
            >
              {ventas.totalDocs}
            </span>
          </h1>
          {/* <div className="buscar_ventas">
        <input placeholder="Buscar por sku" />
        <input placeholder="Buscar por nombre" />
        <input placeholder="Selecciona marca" />
      </div> */}
          <div className="buscar_productos">
            <button
              className="btnn"
              style={{ background: "#f00", color: "#fff" }}
              onClick={actualizar}
            >
              ACtualizar Bandeja
            </button>
          </div>
          <main className="main_pri_ventas">
            {ventass == true ? (
              <div className="paginate_productos">
                <Stack spacing={1}>
                  <Pagination
                    count={ventas.totalPages}
                    variant="outlined"
                    page={ventas.page}
                    color="secondary"
                    onChange={handlePage}
                    hideNextButton
                  />
                </Stack>
              </div>
            ) : (
              ""
            )}
            <table>
              <thead>
                <th>#</th>
                <th>Fecha</th>
                <th>venta</th>
                <th>nombre</th>
                <th>ciudad</th>
                <th>Telefono</th>
                <th>metodo de pago</th>
                <th>Valor Total</th>
                <th>Accion</th>
              </thead>
              {ventass == true
                ? ventas.docs.map((item) => (
                    <>
                      <tr
                        style={{ background: "#4b3629", color: "#fff" }}
                        key={item._id}
                      >
                        <td>{cont++}</td>
                        {item.tienda == "Shopify" ? (
                          <td>{moment(item.fechaShopify).format("LLL")}</td>
                        ) : (
                          <td>{moment(item.fecha).format("LLL")}</td>
                        )}
                        <td>{`${item.nuVenta}`}</td>
                        <td>{item.cliente.nombre}</td>
                        <td>{item.cliente.ciudad}</td>
                        <td>{item.cliente.telefono}</td>
                        <td>
                          {item.pago.metodo_pago == "Cash on Delivery (COD)"
                            ? "Pago Contra entrega"
                            : item.pago.metodo_pago &&
                              item.pago.metodo_pago ==
                                "addi stating payment app"
                            ? "Credito Addi"
                            : item.pago.metodo_pago}
                        </td>
                        <td>
                          {item.tienda == "Shopify" ? (
                            <>
                              {"$" +
                                Intl.NumberFormat("es-ES", {
                                  style: "currency",
                                  currency: "COP",
                                  minimumFractionDigits: 0,
                                }).format(item.ventaTotalShopify)}
                            </>
                          ) : (
                            <>
                              {"$" +
                                Intl.NumberFormat("es-ES", {
                                  style: "currency",
                                  currency: "COP",
                                  minimumFractionDigits: 0,
                                }).format(item.precio)}
                            </>
                          )}
                        </td>
                        <td>
                          <Link
                            style={{
                              fontSize: "1rem",
                              background: "#fff",
                              color: "#000",
                              padding: "5px",
                              borderRadius: "5px",
                            }}
                            to={`/dashboard/ventas-manuales/${item._id}`}
                          >
                            Editar
                          </Link>
                        </td>
                      </tr>
                    </>
                  ))
                : null}
            </table>
            {ventass == true ? (
              <div className="paginate_productos">
                <Stack spacing={1}>
                  <Pagination
                    count={ventas.totalPages}
                    variant="outlined"
                    page={ventas.page}
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
        </>
      ) : (
        navigate("/dashboard")
      )}
    </>
  );
}

export default Facturacion;
