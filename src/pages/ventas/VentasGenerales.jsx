import "./ventas.scss";
import axios from "axios";
import moment from "moment/min/moment-with-locales";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavVentas from "./NavVentas";
import SearchIcon from "@mui/icons-material/Search";
import Alerta from "../../components/Alerta";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function VentasGenerale() {
  moment.locale("es-us");
  //ventas Sac
  const [ventas, setventas] = useState({});
  const [ventass, setVentas] = useState(false);

  //obtener venta por # de venta
  const [ventaN, setventaN] = useState("");
  const [ventaProvicional, setVentaProvicional] = useState([]);
  const [ventaProvicionalState, setVentaProvicionalState] = useState(false);

  //obtener ventas por sku
  const [ventaSku, setVentaSku] = useState("");
  const [ventasSKUlist, setVentasSKUList] = useState({});
  const [ventasSkusState, setVentasSkusState] = useState(false);

  // obtener vetas por estado de pedido
  const [ventasEstado, setVentasEstado] = useState("");

  // Alerta de mensaje
  const [alerta, setAlerta] = useState({});

  // paginacion de productos
  const [page, setPage] = useState(1);
  const [page2, setPage2] = useState(1);

  const handlePage = async (event, value) => {
    if (ventasEstado === "") {
      setPage(value);
      obtenerVentasManuales();
    } else {
      setPage2(value);
      obtenerVentasManualesEstado();
    }
  };

  useEffect(() => {
    obtenerVentasManuales();
  }, []);

  const actualizar = async () => {
    window.location.reload(true);
  };

  const obtenerVentasManuales = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard/ventas-manuales`,
        {
          page,
        }
      );
      setVentasSkusState(false);
      setVentasSKUList({});
      setVentaProvicionalState(false);
      setVentaProvicional({});
      setventas({ data });
      setVentas(true);
    } catch (error) {
      console.log(error);
      setVentas(false);
    }
  };

  const obtenerVentasManualesEstado = async () => {
    try {
      const { data } = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/dashboard/ventas-manuales/pendientes/estado`,
        {
          page2,
          ventasEstado,
        }
      );
      setVentasSkusState(false);
      setVentasSKUList({});
      setVentaProvicionalState(false);
      setVentaProvicional({});
      setventas({ data });
      setVentas(true);
    } catch (error) {
      console.log(error);
      setVentas(false);
    }
  };

  const obtenerVentaPorNumero = async (e) => {
    try {
      if (ventaN == "") {
        setAlerta({ msg: "Escribe un numero para buscar", error: true });
        setTimeout(() => {
          setAlerta({});
        }, 3000);
      } else {
        const { data } = await axios.post(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/dashboard/ventas-manuales/obtenerventa`,
          {
            ventaN,
          }
        );
        if (data.error == true) {
          setAlerta({ msg: data.msg, error: true });
          setTimeout(() => {
            setAlerta({});
          }, 3000);
        } else {
          setVentasSkusState(false);
          setVentasSKUList({});
          setVentas(false);
          setventas({});
          setVentaProvicional({ data });
          setVentaProvicionalState(true);
          setventas("");
          setventaN("");
          setAlerta({
            msg: data.msg,
            error: data.error,
          });
          setTimeout(() => {
            setAlerta({});
          }, 3000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerVentasPorSku = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard/ventas-manuales/sku`,
        {
          ventaSku,
        }
      );
      setVentas(false);
      setventas({});
      setVentaProvicionalState(false);
      setVentaProvicional({});
      setVentaSku("");
      setVentasSKUList({data});
      setVentasSkusState(true);
    } catch (error) {
      console.log(error);
    }
  };

  let i = 0;
  if (ventasSkusState) {
    for (i in ventasSKUlist.data) {
        i++;
    }
  }

  const { msg } = alerta;
  let cont = 1;
  return (
    <>
      <NavVentas />
      {msg && <Alerta alerta={alerta} />}
      <h1 className="tit_pri_ventas">
        TODOS LOS PEDIDOS:{" "}
        <span
          style={{
            color: "#f00",
            padding: "3px",
            borderRadius: "20px",
            fontSize: "2.2rem",
          }}
        >
          {ventass == true ? ventas.data.totalDocs : i}
        </span>
      </h1>
      <div className="buscar_productos">
        <div>
          <input
            placeholder="BUSCAR POR NUMERO DE VENTA"
            value={ventaN}
            onChange={(e) => setventaN(e.target.value.trim().toUpperCase())}
          />
          <SearchIcon className="icon" onClick={obtenerVentaPorNumero} />
        </div>
        <div className="filtar_estado_pedidos_despachos select">
          <select
            name=""
            id=""
            onChange={(e) => setVentasEstado(e.target.value)}
            onClickCapture={obtenerVentasManualesEstado}
          >
            <option selected value="" disabled>
              Filtrar por estado de pedido
            </option>
            <option value="pendiente">Pendiente</option>
            <option value="solicitado">Solicitado </option>
            <option value="parcial">Por Completar </option>
            <option value="enviado">Enviado</option>
            <option value="facturar">Por Facturar</option>
            <option value="finalizado">Finalizado</option>
            <option value="" disabled></option>
            <option value="novedad">Novedad </option>
            <option value="cambio">Cambio </option>
            <option value="cancelado">Venta Cancelada </option>
            <option value="fallido">Venta Fallida </option>
          </select>
        </div>
        {/* <div>
          <input placeholder="BUSCAR POR # VENTA" />
          <SearchIcon className="icon" onClick={obtenerVentaPorNumero} />
        </div> */}
        {/* <div>
          <button
            className="btnn"
            style={{ background: "#f00", color: "#fff" }}
            onClick={actualizar}
          >
            ACtualizar Bandeja
          </button>
        </div> */}
        <div>
          <input
            placeholder="BUSCAR VENTAS POR SKU"
            value={ventaSku}
            onChange={(e) => setVentaSku(e.target.value.trim().toUpperCase())}
          />
          <SearchIcon className="icon" onClick={obtenerVentasPorSku} />
        </div>
      </div>
      <main className="main_pri_ventas">
        {ventass == true ? (
          <div className="paginate_productos">
            <Stack spacing={1}>
              <Pagination
                count={ventas.data.totalPages}
                variant="outlined"
                page={ventas.page ? ventas.page : ventas.page2}
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
            ? ventas.data.docs.map((item) => (
                <tbody>
                  <tr
                    style={
                      item.estado_pedido == "solicitado"
                        ? { background: "rgba(255, 255, 0, .5)", color: "#000" }
                        : { background: "#f00", color: "#fff" } &&
                          item.estado_pedido == "enviado"
                        ? { background: "#006400", color: "#000" }
                        : { background: "#f00", color: "#fff" } &&
                          item.estado_pedido == "parcial"
                        ? { background: "#aed3e3", color: "#000" }
                        : { background: "#f00", color: "#fff" } &&
                          item.estado_pedido == "cancelado"
                        ? { background: "#777", color: "#fff" }
                        : { background: "#f00", color: "#fff" } &&
                          item.estado_pedido == "fallido"
                        ? { background: "#777", color: "#fff" }
                        : { background: "#f00", color: "#fff" } &&
                          item.estado_pedido == "novedad"
                        ? { background: "#ff8000", color: "#fff" }
                        : { background: "#f00", color: "#fff" } &&
                          item.estado_pedido == "cambio"
                        ? { background: "#00f", color: "#FFF" }
                        : { background: "#f00", color: "#fff" } &&
                          item.estado_pedido == "facturar"
                        ? { background: "#4b3629", color: "#FFF" }
                        : { background: "#f00", color: "#fff" } &&
                          item.estado_pedido == "finalizado"
                        ? { background: "#000000", color: "#fff" }
                        : { background: "#f00", color: "#fff" }
                    }
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
                          item.pago.metodo_pago == "addi stating payment app"
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
                            }).format(item.ventaTotalSac)}
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
          {ventasSkusState == true
            ? ventasSKUlist.data.map((item) => (
                <tbody>
                  <tr
                    style={
                      item.estado_pedido == "solicitado"
                        ? { background: "rgba(255, 255, 0, .5)", color: "#000" }
                        : { background: "#f00", color: "#fff" } &&
                          item.estado_pedido == "enviado"
                        ? { background: "#006400", color: "#000" }
                        : { background: "#f00", color: "#fff" } &&
                          item.estado_pedido == "parcial"
                        ? { background: "#aed3e3", color: "#000" }
                        : { background: "#f00", color: "#fff" } &&
                          item.estado_pedido == "cancelado"
                        ? { background: "#777", color: "#fff" }
                        : { background: "#f00", color: "#fff" } &&
                          item.estado_pedido == "fallido"
                        ? { background: "#777", color: "#fff" }
                        : { background: "#f00", color: "#fff" } &&
                          item.estado_pedido == "novedad"
                        ? { background: "#ff8000", color: "#fff" }
                        : { background: "#f00", color: "#fff" } &&
                          item.estado_pedido == "cambio"
                        ? { background: "#00f", color: "#FFF" }
                        : { background: "#f00", color: "#fff" } &&
                          item.estado_pedido == "facturar"
                        ? { background: "#4b3629", color: "#FFF" }
                        : { background: "#f00", color: "#fff" } &&
                          item.estado_pedido == "finalizado"
                        ? { background: "#000000", color: "#fff" }
                        : { background: "#f00", color: "#fff" }
                    }
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
                          item.pago.metodo_pago == "addi stating payment app"
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
                            }).format(item.ventaTotalSac)}
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
          {ventaProvicionalState == true ? (
            <tbody>
              <tr
                style={
                  ventaProvicional.data.estado_pedido == "solicitado"
                    ? { background: "rgba(255, 255, 0, .5)", color: "#000" }
                    : { background: "#f00", color: "#fff" } &&
                      ventaProvicional.data.estado_pedido == "enviado"
                    ? { background: "#006400", color: "#000" }
                    : { background: "#f00", color: "#fff" } &&
                      ventaProvicional.data.estado_pedido == "parcial"
                    ? { background: "#aed3e3", color: "#000" }
                    : { background: "#f00", color: "#fff" } &&
                      ventaProvicional.data.estado_pedido == "cancelado"
                    ? { background: "#777", color: "#fff" }
                    : { background: "#f00", color: "#fff" } &&
                      ventaProvicional.data.estado_pedido == "fallido"
                    ? { background: "#777", color: "#fff" }
                    : { background: "#f00", color: "#fff" } &&
                      ventaProvicional.data.estado_pedido == "novedad"
                    ? { background: "#ff8000", color: "#fff" }
                    : { background: "#f00", color: "#fff" } &&
                      ventaProvicional.data.estado_pedido == "cambio"
                    ? { background: "#00f", color: "#FFF" }
                    : { background: "#f00", color: "#fff" } &&
                      ventaProvicional.data.estado_pedido == "facturar"
                    ? { background: "#4b3629", color: "#FFF" }
                    : { background: "#f00", color: "#fff" } &&
                      ventaProvicional.data.estado_pedido == "finalizado"
                    ? { background: "#000000", color: "#fff" }
                    : { background: "#f00", color: "#fff" }
                }
                key={ventaProvicional.data._id}
              >
                <td>{cont++}</td>
                {ventaProvicional.data.tienda == "Shopify" ? (
                  <td>
                    {moment(ventaProvicional.data.fechaShopify).format("LLL")}
                  </td>
                ) : (
                  <td>{moment(ventaProvicional.data.fecha).format("LLL")}</td>
                )}
                <td>{`${ventaProvicional.data.nuVenta}`}</td>
                <td>{ventaProvicional.data.cliente.nombre}</td>
                <td>{ventaProvicional.data.cliente.ciudad}</td>
                <td>{ventaProvicional.data.cliente.telefono}</td>
                <td>
                  {ventaProvicional.data.pago.metodo_pago ==
                  "Cash on Delivery (COD)"
                    ? "Pago Contra entrega"
                    : ventaProvicional.data.pago.metodo_pago &&
                      ventaProvicional.data.pago.metodo_pago ==
                        "addi stating payment app"
                    ? "Credito Addi"
                    : ventaProvicional.data.pago.metodo_pago}
                </td>
                <td>
                  {ventaProvicional.data.tienda == "Shopify" ? (
                    <>
                      {"$" +
                        Intl.NumberFormat("es-ES", {
                          style: "currency",
                          currency: "COP",
                          minimumFractionDigits: 0,
                        }).format(ventaProvicional.data.ventaTotalShopify)}
                    </>
                  ) : (
                    <>
                      {"$" +
                        Intl.NumberFormat("es-ES", {
                          style: "currency",
                          currency: "COP",
                          minimumFractionDigits: 0,
                        }).format(ventaProvicional.data.ventaTotalSac)}
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
                    to={`/dashboard/ventas-manuales/${ventaProvicional.data._id}`}
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            </tbody>
          ) : null}
        </table>
        {ventass == true ? (
          <div className="paginate_productos">
            <Stack spacing={1}>
              <Pagination
                count={ventas.data.totalPages}
                variant="outlined"
                page={ventas.page ? ventas.page : ventas.page2}
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
  );
}

export default VentasGenerale;
