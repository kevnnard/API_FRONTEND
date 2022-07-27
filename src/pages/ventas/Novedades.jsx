import "./ventas.scss";
import axios from "axios";
import moment from "moment/min/moment-with-locales";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavVentas from "./NavVentas";
import useAuth from "../../hooks/useAuth";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function Novedades() {
  moment.locale("es-us");
  // auth
  const auth = useAuth();
  const navigate = useNavigate();
  //ventas Sac
  const [ventas, setventas] = useState({});
  const [ventass, setVentas] = useState(false);

   const [open, setOpen] = useState(false);
   const handleClose = () => {
     setOpen(false);
   };
   const handleToggle = () => {
     setOpen(!open);
   };


   const obtenerVentasManuales = async () => {
     try {
      handleToggle();
       const url = `${
         import.meta.env.VITE_BACKEND_URL
       }/dashboard/ventas-manuales/novedades`;
       const { data } = await axios.post(url);
       setventas(data);
       setTimeout(() => {
        handleClose();
        setVentas(true);
       }, 2000);
     } catch (error) {
       console.log(error);
       setVentas(false);
     }
   };

  useEffect(() => {
      obtenerVentasManuales();
  }, []);

  let i = 0;
  if (ventass) {
    for (i in ventas) {
      if (i.estado_pedido == "enviado") {
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
            PEDIDOS CON NOVEDAD{" "}
            <span
              style={{
                color: "#f00",
                padding: "3px",
                borderRadius: "20px",
                fontSize: "2.2rem",
              }}
            >
              {i}
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
              onClick={obtenerVentasManuales}
            >
              ACtualizar Bandeja
            </button>
          </div>
          <main className="main_pri_ventas">
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Fecha</th>
                  <th>venta</th>
                  <th>nombre</th>
                  <th>ciudad</th>
                  <th>Telefono</th>
                  <th>metodo de pago</th>
                  <th>Valor Total</th>
                  <th>Accion</th>
                </tr>
              </thead>
              {ventass == true
                ? ventas.map((item) => (
                    <tbody key={item._id}>
                      <tr
                        style={
                          item.estado_pedido == "novedad"
                            ? { background: "#ff8000", color: "#fff" }
                            : { background: "#00f", color: "#fff" }
                        }
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
                    </tbody>
                  ))
                : null}
            </table>
          </main>
        </>
      ) : (
        navigate("/dashboard")
      )}
    </>
  );
}

export default Novedades;
