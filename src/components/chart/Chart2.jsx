import "./chart.scss";
import { useEffect, useState } from "react";
import Cargando from "../../layouts/Cargando"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const Chart2 = ({ aspect, title, ventasCont }) => {
  const [ventas, setVentas] = useState([]);
  const [ventasEstado, setVentasEstado] = useState(false);
  
 const ventasAsesor = [
   {
     name: ventasCont.asesor1.nombre,
     total: ventasCont.asesor1.cont,
     ventas: ventasCont.asesor1.total,
   },
   {
     name: ventasCont.asesor2.nombre,
     total: ventasCont.asesor2.cont,
     ventas: ventasCont.asesor2.total,
   },
   {
     name: ventasCont.asesor3.nombre,
     total: ventasCont.asesor3.cont,
     ventas: ventasCont.asesor3.total,
   },
 ];

  setTimeout(() => {
    setVentas(ventasCont);
    setVentasEstado(true);
  }, 2000);

  return (
    <>
      {ventasEstado == true ? (
        <>
          <div className="chart">
            <h1
              style={{
                fontSize: "3rem",
                textAling: "center",
                fontWeight: "bold",
              }}
              className="title"
            >
              {title}
            </h1>
            <ResponsiveContainer width="100%" aspect={aspect}>
              <BarChart
                width={730}
                height={300}
                data={ventasAsesor}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="Color1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="35%" stopColor="#5f39e5" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#8884d8" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="gray" />
                <YAxis />
                <CartesianGrid strokeDasharray="2 3" className="chartGrid" />
                <Tooltip />
                <Bar
                  unit=" Pedidos"
                  type="monotone"
                  dataKey="total"
                  dot={{ stroke: "#8884d8", strokeWidth: 25 }}
                  stroke="#5f39e5"
                  fillOpacity={1}
                  fill="url(#Color1)"
                />
                <Bar
                  unit=" COP"
                  type="monotone"
                  dataKey="ventas"
                  dot={{ stroke: "#8884d8", strokeWidth: 25 }}
                  stroke="#82ca9d"
                  fillOpacity={1}
                  fill="url(#Color1)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <Cargando />
      )}
    </>
  );
};

export default Chart2;
