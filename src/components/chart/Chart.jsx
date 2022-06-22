import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { integerPropType } from "@mui/utils";

const Chart = ({ aspect, title, sac, fcs, re }) => {

  const data = [
    { name: "Ventas Sacs",  Total: sac},
    { name: "Ventas Fox", Total: fcs },
    { name: "Ventas Replays", Total: re },
  ];
 
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={300}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="Color1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="35%" stopColor="#5f39e5" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#8884d8" stopOpacity={0.3} />
            </linearGradient>
            <linearGradient id="Color2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <YAxis />
          <CartesianGrid strokeDasharray="2 3" className="chartGrid" />
          <Tooltip />
          <Area
            unit=" COP"
            type="monotone"
            dataKey="Total"
            dot={{ stroke: "#8884d8", strokeWidth: 25 }}
            stroke="#5f39e5"
            fillOpacity={1}
            fill="url(#Color1)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
