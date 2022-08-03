import "./ventasPorUsuario.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import Chart2 from "../../components/chart/Chart2";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Widget from "../../components/widget/Widget";
import moment from "moment/min/moment-with-locales";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function VentasPorUsuario() {
  moment.locale("es-us");
  //datos para excel y demas erssatdisticas

  // Ventas SAC
  const [ventas, setVentas] = useState([]);
  const [ventasAsesor, setVentasAsesor] = useState();
  const [ventasState, setVentasState] = useState(false);
  const [ventaTotalSac, setVentaTotalSac] = useState(0);
  const [ventasCount, setVentasCount] = useState(0);

  // Consultar ventas por fecha SAC
  const [fechaDesde, setfechaDesde] = useState("");
  const [fechaHasta, setfechaHasta] = useState("");

  // Ventas SHOPIFY

  const [ventasShopify, setventasShopify] = useState([]);
  const [ventasShopifyState, setShopifyVentasState] = useState(false);
  const [totalShopify, settotalShopify] = useState(0);
  const [ventasShopifyCount, setventasShopifyCount] = useState(0);

  useEffect(() => {
    obtenerVentasAsesor();
  }, []);

  const obtenerVentasAsesor = async () => {
    try {
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/dashboard/estadisticas/ventasasesor`;
      const { data } = await axios.get(url);
      // Ventas Sac
      setVentas(data.ventas);
      setVentasCount(data.count);
      setVentaTotalSac(data.total);
      setVentasAsesor(data.ventasCont);
      setVentasState(true);
      // Ventas Shopify
      setventasShopify(data.ventasShopify);
      setventasShopifyCount(data.ventasShopifyCount);
      settotalShopify(data.totalShopify);
      setShopifyVentasState(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuscar = async (e) => {
    setVentasCount(0);
    setVentaTotalSac(0);
    setVentas([]);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard/estadisticas/fechaSAC`,
        {fechaDesde, fechaHasta}
      );
      setVentasCount(data.count);
      setVentaTotalSac(data.total);
      setVentas(data.ventas);
      setfechaDesde("");
      setfechaHasta("");
    } catch (error) {
      console.log
    }
  };

    const handleBuscarShopify = async (e) => {
      setventasShopifyCount(0);
      settotalShopify(0);
      setventasShopify([]);
      e.preventDefault();
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/dashboard/estadisticas/fechaSHOPIFY`,
          { fechaDesde, fechaHasta }
        );
        setventasShopifyCount(data.count);
        settotalShopify(data.total);
        setventasShopify(data.ventas);
        setfechaDesde("");
        setfechaHasta("");
      } catch (error) {
        console.log;
      }
    };
  return (
    <>
      <main>
        <h1 className="VENTAS_SAC">Ventas SAC</h1>
        <div className="home">
          <div className="homeContainer">
            <div className="widgets">
              <Widget type="order" cantidad={ventasCount} />
              <Widget
                titulo="VENTAS TOTALES SAC"
                type="earning"
                ventaTotal={ventaTotalSac}
              />
              <Widget type="balance" ventaTotal={ventaTotalSac} />
            </div>
          </div>
        </div>
        <div className="home">
          <div className="homeContainer">
            <div
              className="widgets"
              style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}
            >
              <Stack component="form" spacing={1}>
                <TextField
                  id="date"
                  label="Desde"
                  type="date"
                  value={fechaDesde}
                  defaultValue={Date.now()}
                  sx={{ width: "50%", margin: "0 0 0 auto", cursor: "pointer" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setfechaDesde(e.target.value)}
                />
              </Stack>
              <Stack component="form" spacing={1}>
                <TextField
                  disabled={fechaDesde == "" && true}
                  id="date"
                  label="Hasta"
                  type="date"
                  value={fechaHasta}
                  onChange={(e) => setfechaHasta(e.target.value)}
                  defaultValue={Date.now()}
                  sx={{ width: "50%", margin: "0 auto 0 0", cursor: "pointer" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Stack>
              {fechaHasta !== "" && (
                <div style={{ gridColumn: "1 / 3", margin: "auto" }}>
                  <Button
                    onClick={handleBuscar}
                    variant="outlined"
                    size="medium"
                  >
                    buscar
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <Chart2
          ventasCont={ventasAsesor}
          title="Ventas por Asesor"
          aspect={2 / 1}
        /> */}
        <div id="table" className="excel_export_file">
          <div className="button_excel">
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="xls-button"
              table="table-to-xls"
              filename="Ventas_SAC"
              sheet="ventas_SAC"
              buttonText="Descargar datos Ventas SAC"
              type="button"
            />
            <table id="table-to-xls" hidden>
              <thead>
                <tr>
                  <th># Orden</th>
                  <th>Tienda</th>
                  <th>cliente - nombre</th>
                  <th>cliente - Cedula</th>
                  <th>cliente - Ciudad</th>
                  <th>cliente - departamento</th>
                  <th>cliente - Direccion</th>
                  <th>cliente - email</th>
                  <th>cliente - Telefono</th>
                  <th>Productos - Nombre</th>
                  <th>Productos - Sku</th>
                  <th>Productos - Color</th>
                  <th>Productos - Talla</th>
                  <th>Productos - Cantidad</th>
                  <th>Productos - Precio Comparacion</th>
                  <th>Productos - Precio Venta</th>
                  <th>Productos - Precio Costo</th>
                  <th>Productos - Utilidad Neta</th>
                  <th>Pago - Metodo de pago</th>
                  <th>Pago - Estado del pago</th>
                  <th>Estado Pedido</th>
                  <th>Asesor</th>
                  <th>Fecha De Venta</th>
                </tr>
              </thead>
              {ventasState == true
                ? ventas.map((item) =>
                    item.productos.map((i) => (
                      <tr key={i._id}>
                        <td>{item.nuVenta}</td>
                        <td>{item.tienda}</td>
                        <td>{item.cliente.nombre}</td>
                        <td>{item.cliente.cedula}</td>
                        <td>{item.cliente.ciudad}</td>
                        <td>{item.cliente.departamento}</td>
                        <td>{item.cliente.direccion}</td>
                        <td>{item.cliente.email}</td>
                        <td>{item.cliente.telefono}</td>
                        <td>{i.nombre}</td>
                        <td>{i.sku}</td>
                        <td>{i.color}</td>
                        <td>{i.talla}</td>
                        <td>{i.cantidadS}</td>
                        <td>{i.precio}</td>
                        <td>{i.precioVenta}</td>
                        <td>{i.precioCosto}</td>
                        <td>
                          {Math.round(i.precioVenta / 1.19) - i.precioCosto}
                        </td>
                        <td>{item.pago.metodo_pago}</td>
                        <td>{item.pago.estado_pago}</td>
                        <td>{item.estado_pedido}</td>
                        <td>{item.asesor}</td>
                        <td>{moment(item.fecha).format("LLL")}</td>
                      </tr>
                    ))
                  )
                : null}
            </table>
          </div>
        </div>
      </main>
      <main>
        <h1 className="VENTAS_SAC">Ventas SHOPIFY</h1>
        <div className="home">
          <div className="homeContainer">
            <div className="widgets">
              <Widget type="order" cantidad={ventasShopifyCount} />
              <Widget
                titulo="VENTAS TOTALES FCS"
                type="earning"
                ventaTotal={totalShopify}
              />
              <Widget type="balance" ventaTotal={totalShopify} />
            </div>
          </div>
        </div>
        <div className="home">
          <div className="homeContainer">
            <div
              className="widgets"
              style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}
            >
              <Stack component="form" spacing={1}>
                <TextField
                  id="date"
                  label="Desde"
                  type="date"
                  value={fechaDesde}
                  defaultValue={Date.now()}
                  sx={{ width: "50%", margin: "0 0 0 auto", cursor: "pointer" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setfechaDesde(e.target.value)}
                />
              </Stack>
              <Stack component="form" spacing={1}>
                <TextField
                  disabled={fechaDesde == "" && true}
                  id="date"
                  label="Hasta"
                  type="date"
                  value={fechaHasta}
                  onChange={(e) => setfechaHasta(e.target.value)}
                  defaultValue={Date.now()}
                  sx={{ width: "50%", margin: "0 auto 0 0", cursor: "pointer" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Stack>
              {fechaHasta !== "" && (
                <div style={{ gridColumn: "1 / 3", margin: "auto" }}>
                  <Button
                    onClick={handleBuscarShopify}
                    variant="outlined"
                    size="medium"
                  >
                    buscar
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <Chart2
          ventasCont={ventasAsesor}
          title="Ventas por Asesor"
          aspect={2 / 1}
        /> */}
        <div id="table" className="excel_export_file">
          <div className="button_excel">
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="xls-button"
              table="table-to-xls-shopify"
              filename="Ventas_SHOPIFY"
              sheet="ventas_SHOPIFY"
              buttonText="Descargar datos ventas SHOPIFY"
              type="button"
            />
            <table id="table-to-xls-shopify" hidden>
              <thead>
                <tr>
                  <th># Orden</th>
                  <th>Tienda</th>
                  <th>cliente - nombre</th>
                  <th>cliente - Cedula</th>
                  <th>cliente - Ciudad</th>
                  <th>cliente - departamento</th>
                  <th>cliente - Direccion</th>
                  <th>cliente - email</th>
                  <th>cliente - Telefono</th>
                  <th>Productos - Nombre</th>
                  <th>Productos - Sku</th>
                  <th>Productos - Color</th>
                  <th>Productos - Talla</th>
                  <th>Productos - Cantidad</th>
                  <th>Productos - Precio Comparacion</th>
                  <th>Productos - Precio Publicado</th>
                  <th>Productos - Precio Venta</th>
                  <th>Productos - Precio Costo </th>
                  <th>Productos - Sin IVA</th>
                  <th>Pago - Metodo de pago</th>
                  <th>Pago - Estado del pago</th>
                  <th>Estado Pedido</th>
                  <th>Asesor</th>
                  <th>Fecha De Venta</th>
                </tr>
              </thead>
              {ventasShopifyState == true
                ? ventasShopify.map((item) =>
                    item.productos.map((i) => (
                      <tr key={i._id}>
                        <td>{item.nuVenta}</td>
                        <td>{item.tienda}</td>
                        <td>{item.cliente.nombre}</td>
                        <td>{item.cliente.cedula}</td>
                        <td>{item.cliente.ciudad}</td>
                        <td>{item.cliente.departamento}</td>
                        <td>{item.cliente.direccion}</td>
                        <td>{item.cliente.email}</td>
                        <td>{item.cliente.telefono}</td>
                        <td>{i.nombre}</td>
                        <td>{i.sku}</td>
                        <td>{i.color}</td>
                        <td>{i.talla}</td>
                        <td>{i.cantidadS}</td>
                        <td>{i.precioComparacionShopify}</td>
                        <td>{i.precioVentaShopify}</td>
                        <td>{i.precioVentaConDescuento}</td>
                        <td>HASTA ACTUALIZAR INV</td>
                        <td>{Math.round(i.precioVentaShopify / 1.19)}</td>
                        {/* <td>
                          {Math.round(i.precioVentaShopify / 1.19) -
                            i.precioCosto}
                        </td> */}
                        <td>{item.pago.metodo_pago}</td>
                        <td>
                          {item.pago.estado_pago == "paid"
                            ? "Procesado"
                            : "Contra Entrega"}
                        </td>
                        <td>{item.estado_pedido}</td>
                        <td>SHOPIFY</td>
                        <td>{moment(item.fechaShopify).format("LLL")}</td>
                      </tr>
                    ))
                  )
                : null}
            </table>
          </div>
        </div>
      </main>
    </>
  );
}

export default VentasPorUsuario;
