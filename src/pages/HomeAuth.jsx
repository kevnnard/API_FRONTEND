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
  // Asignar meta del dia
  const [metaDia, setMetaDia] = useState(null);
  const [resultMetaDia, setResultMetaDia] = useState(null);
  const [VentasTotalesDia, setVentasTotalesDia] = useState(0);
  const [costoTotal, setCostoTotal] = useState(0);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setMetaDia(null);
  };


  useEffect(() => {
    obtenerVentasManuales();
  }, []);

  const obtenerVentasManuales = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard/ventas-manuales`
      );
      setCantidadVentasTotales(data.totalDocs);
      let totall = 0;
      let sac = 0;
      let fcs = 0;
      let re = 0;
      const totalSac = data.docs.map((item) => {
        totall = totall + (item.ventaTotalSac + item.ventaTotalShopify);
        if(item.tipoVenta == "SAC") {
          sac = sac + item.ventaTotalSac;
        }
        if (item.tipoVenta == "FCS") {
          fcs = fcs + item.ventaTotalShopify;
        }
        if (item.tipoVenta == "RE") {
          re = re + item.ventaTotalShopify;
        }
      });
      setVentasSac(sac);
      setVentasFcs(fcs);
      setVentasRe(re);
      setVentasTotales(totall);
      try {
        const url = `${
          import.meta.env.VITE_BACKEND_URL
        }/dashboard/estadisticas/ventatotalhoy`;
        const { data } = await axios.get(url);
        let totall = 0;
        let costo = 0;
        const totalSac = data.map((item) => {
          totall = totall + (item.ventaTotalSac + item.ventaTotalShopify);
        });
        // const costoTotal = data.productos.map((item) => {
        //   costo = costo + item.precioCosto;
        // });
        setVentasTotalesDia(totall);
        setCostoTotal(costo);
      } catch (error) {
        console.log(error);
      }
      try {
        const url = `${
          import.meta.env.VITE_BACKEND_URL
        }/dashboard/estadisticas`;
        const { data } = await axios.get(url);
        setClientesTotales(data);
      } catch (error) {
        console.log(error);
      }
      try {
        const url = `${
          import.meta.env.VITE_BACKEND_URL
        }/dashboard/estadisticas/metadia`;
        const { data } = await axios.get(url);
       if (data.error) {
        setAlerta({msg: data.msg, error: data.error})
        return
       } else {
         setResultMetaDia(data.metaDia);
         setAlerta({});
       }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
     
  };

  const handleAsignarMetaDia = async () => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard/estadisticas/metadia`,
        {
          metaDia,
        }
      );
      obtenerVentasManuales();
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
            <Widget type="earning" ventaTotal={VentasTotales} />
            <Widget type="balance" />
          </div>
          <div className="charts">
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div className="modalBoxMetaDia">
                <div>
                  <input
                    type="number"
                    placeholder="Ingresa una cantidad"
                    value={metaDia}
                    onChange={(e) => setMetaDia(e.target.value.trim())}
                  />
                  <input
                    className="btnn"
                    style={{ background: "#1f0", color: "#fff" }}
                    onClick={handleAsignarMetaDia}
                    type="button"
                    value={`Ingresar meta del dia`}
                  />{" "}
                </div>
              </div>
            </Modal>
            <Featured
              ventaTotal={VentasTotalesDia}
              boton={handleOpen}
              metaDia={resultMetaDia}
            />
            <Chart
              sac={ventasSac}
              fcs={ventasFcs}
              re={ventasRe}
              title="Ventas por este mes"
              aspect={2 / 1}
            />
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

export default HomeAuth;
