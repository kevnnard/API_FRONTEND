import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Link } from "react-router-dom";


const Widget = ({ type, cantidad, ventaTotal, clientes }) => {
  let data;

  //temporary
  const amount = cantidad || clientes;
  const ventaT = ventaTotal;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "CLIENTES TOTALES",
        isMoney: false,
        link: null,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "#f21",
              backgroundColor: "rgba(200, 0, 110, .4)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDENES TOTALES",
        isMoney: false,
        link: (
          <Link to="/dashboard/ventas-manuales/generales">
            Ver Todas Las ordenes
          </Link>
        ),
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "VENTAS TOTALES",
        isMoney: true,
        link: "",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {" "}
          {amount || (
            <>
              {" "}
              {"$" +
                Intl.NumberFormat("es-ES", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                }).format(ventaT)}
            </>
          )}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
