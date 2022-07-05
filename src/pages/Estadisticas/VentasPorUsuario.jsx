import "./ventasPorUsuario.scss"
import axios from "axios";
import { useEffect, useState } from "react"
import Chart2 from "../../components/chart/Chart2";

function VentasPorUsuario() {

  const [ventasUsuario, setVentasUsuario] = useState([]);
  const [ventaTotalSac, setVentaTotalSac] = useState(0);

    useEffect(() => {
      obtenerVentasAsesor();
    }, []);

  const obtenerVentasAsesor = async () => {
    try {
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/dashboard/estadisticas/ventasasesor`;
      const { data } = await axios.get(url);
      setVentaTotalSac(data);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main>
        <div className="ventalTotalSac_component">
          <h1>Venta total SAC</h1>
          <p>
            {"$" +
              Intl.NumberFormat("es-ES", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
              }).format(ventaTotalSac.total)}
          </p>
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

export default VentasPorUsuario