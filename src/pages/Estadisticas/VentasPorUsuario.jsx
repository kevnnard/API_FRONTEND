import "./ventasPorUsuario.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import Chart2 from "../../components/chart/Chart2";
import { CSVLink, CSVDownload } from "react-csv";

function VentasPorUsuario() {
  //info para chart
  const [ventasUsuario, setVentasUsuario] = useState([]);

  //datos para excel y demas erssatdisticas
  const [ventas, setVentas] = useState([]);
  const [ventaTotalSac, setVentaTotalSac] = useState(0);
  const [ventasCount, setVentasCount] = useState(0);

  useEffect(() => {
    obtenerVentasAsesor();
  }, []);

  console.log(ventas);
  const obtenerVentasAsesor = async () => {
    try {
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/dashboard/estadisticas/ventasasesor`;
      const { data } = await axios.get(url);
      setVentas(JSON.stringify(data.ventas));
      setVentasCount(data.count);
      setVentaTotalSac(data.total);
    } catch (error) {
      console.log(error);
    }
  };

  const descargarDatos = async () => {
    try {
      let headersList = {
        Authorization: "Token 4fe96228497bce7104f6643c36bb1a02b0efd651",
      };

      let bodyContent = new FormData();
      bodyContent.append(
        "infile",
        `[ { "cliente": { "idcliente": "62b390a9d043da042622d35a", "nombre": "juan", "cedula": "1022436162", "ciudad": "BOGOTÁ", "departamento": "BOGOTÁ, D.C.", "direccion": "calle 48 a sur # 88c 80", "email": "londonokevin9@gmail.com", "telefono": "3133019492" }, "datos_envio": { "destinatario_envio": "51821900", "telefono_envio": "3133019492", "ciudad_envio": "11001", "departamento_envio": "BOGOTÁ, D.C.", "direccion_envio": "calle 48 a sur # 88c 80", "indicaciones_envio": "CASA 88" }, "pago": { "metodo_pago": "contra_entrega", "referencia_pago": "contra entrega", "estado_pago": "pendiente" }, "_id": "62bb849b4fc2de774c859d00", "estado_pedido": "facturar", "fecha": "2022-06-28T22:44:28.262Z", "ventaTotalShopify": 0, "ventaTotalSac": 125900, "cupon_descuento": [], "productos": [ { "_id": "62a9dd08e89757d8191b9829", "img": "https://cdn.shopify.com/s/files/1/0264/9161/7361/products/28150_017_2_1800x1800.jpg?v=1639456336", "sku": "28150-017-S", "nombre": "JERSEY FOX 180 PERIL", "color": "negro", "talla": "S", "cantidadS": 1, "precio": 179900, "precioCosto": 89900, "precioVenta": 125900, "precioComparacionShopify": 0, "precioVentaShopify": 0, "precioVentaConDescuento": 0 } ], "mensajes": [], "historial": [], "nuVenta": "SAC1005", "tipoVenta": "SAC", "tienda": "FOX", "asesor": "kevin londoño", "__v": 0 }, { "cliente": { "idcliente": null, "nombre": "Kevin Londoño ", "cedula": "1022436169", "ciudad": "BOGOTÁ", "departamento": "BOGOTÁ, D.C.", "direccion": "calle 48 a sur # 88c 80", "email": "londonokevin9@gmail.com", "telefono": "3133019492" }, "datos_envio": { "destinatario_envio": "1022436162", "telefono_envio": "3133019492", "ciudad_envio": "BOGOTÁ", "departamento_envio": "BOGOTÁ, D.C.", "direccion_envio": "calle 48 a sur # 88c 80", "indicaciones_envio": "casa 88" }, "pago": { "metodo_pago": "contra_entrega", "referencia_pago": "contra entrega", "estado_pago": "pendiente" }, "_id": "62bca4ecf7d0b0de8dca7751", "estado_pedido": "parcial", "fecha": "2022-06-29T15:02:03.097Z", "ventaTotalShopify": 0, "ventaTotalSac": 129000, "cupon_descuento": [], "productos": [ { "_id": "62a9dd08e89757d8191b9829", "img": "https://cdn.shopify.com/s/files/1/0264/9161/7361/products/28150_017_2_1800x1800.jpg?v=1639456336", "sku": "28150-017-S", "nombre": "JERSEY FOX 180 PERIL", "color": "negro", "talla": "S", "cantidadS": 1, "precio": 179900, "precioCosto": 89900, "precioVenta": 129000, "precioComparacionShopify": 0, "precioVentaShopify": 0, "precioVentaConDescuento": 0 } ], "mensajes": [], "historial": [], "nuVenta": "SAC1006", "tipoVenta": "SAC", "tienda": "FOX", "asesor": "Desarrollo_GrupoR", "__v": 0 }, { "cliente": { "idcliente": "62b390a9d043da042622d35a", "nombre": "kevin londoño ", "cedula": "1022436162", "ciudad": "BOGOTÁ", "departamento": "BOGOTÁ, D.C.", "direccion": "calle 48 a sur # 88c 80", "email": "londonokevin9@gmail.com", "telefono": "3133019492" }, "datos_envio": { "destinatario_envio": "51821900", "telefono_envio": "3133019492", "ciudad_envio": "BOGOTÁ", "departamento_envio": "BOGOTÁ, D.C.", "direccion_envio": "calle 48 a sur # 88c 80", "indicaciones_envio": "CASA 88" }, "pago": { "metodo_pago": "contra_entrega", "referencia_pago": "contra entrega", "estado_pago": "pendiente" }, "_id": "62bf6a333cc50aabf7aae298", "estado_pedido": "pendiente", "fecha": "2022-07-01T21:40:34.783Z", "ventaTotalShopify": 0, "ventaTotalSac": 150000, "cupon_descuento": [], "productos": [ { "_id": "62a9dd08e89757d8191b9829", "img": "https://cdn.shopify.com/s/files/1/0264/9161/7361/products/28150_017_2_1800x1800.jpg?v=1639456336", "sku": "28150-017-S", "nombre": "JERSEY FOX 180 PERIL", "color": "negro", "talla": "S", "cantidadS": 1, "precio": 179900, "precioCosto": 89900, "precioVenta": 150000, "precioComparacionShopify": 0, "precioVentaShopify": 0, "precioVentaConDescuento": 0 } ], "mensajes": [], "historial": [], "nuVenta": "SAC1008", "tipoVenta": "SAC", "tienda": "FOX", "asesor": "Desarrollo_GrupoR", "__v": 0 } ]`
      );

      fetch("https://www.convertcsv.io/api/v1/json2csv?xlsx=1", {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      })
        .then(function (response) {
          return response.text();
        })
        .then(function (data) {
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <main>
        <div className="flex_ventasSac">
          <div className="ventalTotalSac_component">
            <h1>Venta total SAC</h1>
            <p>
              {"$" +
                Intl.NumberFormat("es-ES", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                }).format(ventaTotalSac)}
            </p>
          </div>
          <div className="ventalTotalSac_component">
            <h1>Pedidos totales SAC</h1>
            <p>{ventasCount}</p>
          </div>
        </div>
        <div id="table" className="excel_export_file">
          <CSVLink data={ventas}>Descargar excel</CSVLink>
          <button onClick={descargarDatos}>Descargar Datos</button>
        </div>
        <Chart2
          dataa={ventasUsuario}
          title="Ventas por Usuario"
          aspect={2 / 1}
        />
      </main>
    </>
  );
}

export default VentasPorUsuario;
