import "./home.scss";
import Widget from "../components/widget/Widget";
import Featured from "../components/featured/Featured";
import Chart from "../components/chart/Chart";
import Table from "../components/table/Table";
import Alerta from "../components/Alerta";
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "@mui/material";

function HomeAuth() {
  // Alerta
  const [alerta, setAlerta] = useState({});
  // Estadisticas de ventas totatles y pedidos totales
  const [cantidadVentasTotales, setCantidadVentasTotales] = useState(0);
  const [VentasTotales, setVentasTotales] = useState(0);
  const [ventasSac, setVentasSac] = useState(0);
  const [ventasFcs, setVentasFcs] = useState(0);
  const [ventasRe, setVentasRe] = useState(0);
  // Estadisticas de clientes totales
  const [clientesTotales, setClientesTotales] = useState(0);

  useEffect(() => {
    obtenerVentasManuales();
  }, []);

  const obtenerVentasManuales = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard/estadisticas/home`
      );
      setCantidadVentasTotales(data.cont);
      setVentasSac(data.sac);
      setVentasFcs(data.fcs);
      setVentasRe(data.re);
      setVentasTotales(data.total);
      try {
        const url = `${
          import.meta.env.VITE_BACKEND_URL
        }/dashboard/estadisticas`;
        const { data } = await axios.get(url);
        setClientesTotales(data);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
     
  };

  const { msg } = alerta;
  return (
    <>
      <div className="home">
        {msg && <Alerta alerta={alerta} />}
        <div className="homeContainer">
          <div className="widgets">
            <Widget type="user" clientes={clientesTotales} />
            <Widget type="order" cantidad={cantidadVentasTotales} />
            <Widget
              titulo="VENTAS TOTALES (CON IVA)"
              type="earning"
              ventaTotal={VentasTotales}
            />
            <Widget type="balance" ventaTotal={VentasTotales} />
          </div>
          <div className="widgets">
            <Widget
              titulo="VENTAS TOTALES SAC"
              type="earning"
              ventaTotal={ventasSac}
            />
            <Widget
              titulo="VENTAS TOTALES FOX RACING"
              type="earning"
              ventaTotal={ventasFcs}
            />
            <Widget
              titulo="VENTAS TOTALES REPLAYS"
              type="earning"
              ventaTotal={ventasRe}
            />
          </div>
          {/* <div className="charts">
            <Chart
              sac={ventasSac}
              fcs={ventasSac}
              re={}
              title="Ventas por este mes"
              aspect={2 / 1}
            />
          </div> */}
          {/* <div className="listContainer">
            <div className="listTitle">Ultimos pedidos</div>
            <Table />
          </div> */}
        </div>
      </div>
    </>
  );
}

export default HomeAuth;
