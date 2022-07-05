import "./ventasPorUsuario.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import Chart2 from "../../components/chart/Chart2";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Widget from "../../components/widget/Widget";

function VentasPorUsuario() {
  //datos para excel y demas erssatdisticas
  const [ventas, setVentas] = useState([]);
  const [ventasAsesor, setVentasAsesor] = useState()
  const [ventasState, setVentasState] = useState(false);
  const [ventaTotalSac, setVentaTotalSac] = useState(0);
  const [ventasCount, setVentasCount] = useState(0);

  useEffect(() => {
    obtenerVentasAsesor();
  }, []);
  const obtenerVentasAsesor = async () => {
    try {
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/dashboard/estadisticas/ventasasesor`;
      const { data } = await axios.get(url);
      setVentas(data.ventas);
      setVentasCount(data.count);
      setVentaTotalSac(data.total);
      setVentasAsesor(data.ventasCont);
      setVentasState(true);
    } catch (error) {
      console.log(error);
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
              <Widget type="earning" ventaTotal={ventaTotalSac} />
              <Widget type="balance" ventaTotal={ventaTotalSac} />
            </div>
          </div>
        </div>
        <Chart2
          ventasCont={ventasAsesor}
          title="Ventas por Asesor"
          aspect={2 / 1}
        />
        <div id="table" className="excel_export_file">
          <div className="button_excel">
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="xls-button"
              table="table-to-xls"
              filename="Ventas_SAC"
              sheet="ventas_SAC"
              buttonText="Descargar datos"
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
                  <th>Productos - Prrecio</th>
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
                        <td>
                          {new Date(item.fecha).toLocaleDateString()} A las{" "}
                          {new Date(item.fecha).toLocaleTimeString()}
                        </td>
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
