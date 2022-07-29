import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import useAuth from "../../hooks/useAuth";


const Featured = ({ metaDia, boton, ventaTotal }) => {
  const { auth } = useAuth();
  const ventaT = ventaTotal;
  let hoy = new Date();
  let dia = hoy.getDate();
  let mes = hoy.getMonth() + 1;
  let ano = hoy.getFullYear();
  dia = ("0" + dia).slice(-2);
  mes = ("0" + mes).slice(-2);
  let formato1 = `${dia}-${mes}-${ano}`;
  const totaPercent = Math.round((100 * ventaTotal) / metaDia);

  
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">{`Meta para Hoy /  ${formato1}`}</h1>
        {auth.role === "ADMIN" ? (
          <MoreVertIcon
            style={{ cursor: "pointer" }}
            onClick={boton}
            fontSize="large"
          />
        ) : null}
      </div>
      <div className="bottom">
        <h1>
          {" "}
          {"$" +
            Intl.NumberFormat("es-ES", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0,
            }).format(metaDia)}
        </h1>
        <div className="featuredChart">
          <CircularProgressbar
            value={totaPercent}
            text={`${totaPercent}%`}
            strokeWidth={10}
          />
        </div>
        <p className="title">Total ventas hoy</p>
        <p className="amount">
          {"$" +
            Intl.NumberFormat("es-ES", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0,
            }).format(ventaT)}
        </p>
        <p className="desc">
          Todas las transacciones procesadas hoy. La ultima venta puede que no
          este incluida.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Por vender</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">
                {"$" +
                  Intl.NumberFormat("es-ES", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0,
                  }).format(metaDia - ventaT)}
              </div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Ultima semana</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount"></div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Ultimo Mes</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
