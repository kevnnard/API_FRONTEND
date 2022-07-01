import axios from "axios";
import { useEffect, useState } from "react"
import Chart2 from "../../components/chart/Chart2";

function VentasPorUsuario() {

  const [ventasUsuario, setVentasUsuario] = useState([]);

    useEffect(() => {
      obtenerVentasAsesor();
    }, []);

  const obtenerVentasAsesor = async () => {
    try {
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/dashboard/estadisticas/ventasasesor`;
      const { data } = await axios.get(url);
      setVentasUsuario(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main>
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