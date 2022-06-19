import "./home.scss";
import Widget from '../components/widget/Widget'
import Featured from "../components/featured/Featured";
import Chart from "../components/chart/Chart";
import Table from "../components/table/Table";
import { useEffect, useState } from "react";
import axios from "axios";

function HomeAuth() {

  const [cantidadVentasTotales, setCantidadVentasTotales] = useState(0);
  const [VentasTotales, setVentasTotales] = useState(0);
  useEffect(() => {
    obtenerVentasManuales();
  }, []);

  const obtenerVentasManuales = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard/ventas-manuales`
      );
      setCantidadVentasTotales(data.totalDocs);
      let totall = 0
      const totalSac = data.docs.map((item) => {
        totall = totall  + (item.ventaTotalSac + item.ventaTotalShopify);
      });
      setVentasTotales(totall);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="home">
        <div className="homeContainer">
          <div className="widgets">
            <Widget type="user" />
            <Widget type="order" cantidad={cantidadVentasTotales} />
            <Widget type="earning" ventaTotal={VentasTotales} />
            <Widget type="balance" />
          </div>
          <div className="charts">
            <Featured />
            <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
          </div>
          <div className="listContainer">
            <div className="listTitle">Ultimos pedidos</div>
            <Table />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeAuth



