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
import { integerPropType } from "@mui/utils";

const Chart2 = ({ aspect, title, dataa }) => {
  const [ventas, setVentas] = useState([]);
  const [ventasEstado, setVentasEstado] = useState(false);

  const usuario = dataa.map((item) => ({
    name: item.asesor,
    total: item.ventaTotalSac,
  }));

  setTimeout(() => {
    setVentas(usuario);
    setVentasEstado(true);
  }, 2000);

  return (
    <>
      {ventasEstado == true ? (
        <>
          <div className="chart">
            <h1 style={{fontSize: "3rem", textAling: "center", fontWeight: "bold"}} className="title">{title}</h1>
            <ResponsiveContainer width="100%" aspect={aspect}>
              <BarChart
                width={730}
                height={300}
                data={ventas}
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
                  unit=" COP"
                  type="monotone"
                  dataKey="total"
                  dot={{ stroke: "#8884d8", strokeWidth: 25 }}
                  stroke="#5f39e5"
                  fillOpacity={1}
                  fill="url(#Color1)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : <Cargando />}
    </>
  );
};

export default Chart2;
