import "./navVentas.scss"
import { NavLink } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import PointOfSaleRoundedIcon from "@mui/icons-material/PointOfSaleRounded";

function NavVentas() {

  const { auth } = useAuth();

  return (
    <>
      <nav className="nav_ventas_bandeja">
        <ul className="lista_pri_ventas">
          <ul className="lista_secu_ventas">
            {auth.role === "DESPACHO" || auth.role === "ADMIN" ? (
              <li>
                <NavLink
                  className="btnn"
                  to="/dashboard/ventas-manuales/despachos"
                >
                  Despachos{"   "}
                  <ChatRoundedIcon />
                </NavLink>
              </li>
            ) : null}
            {auth.role === "SERVICIO" || auth.role === "ADMIN" ? (
              <li>
                <NavLink
                  className="btnn"
                  to="/dashboard/ventas-manuales/novedades"
                >
                  Novedades
                  {"   "}
                  <ReportProblemRoundedIcon />
                </NavLink>
              </li>
            ) : null}
            {auth.role === "DESPACHO" || auth.role === "ADMIN" ? (
              <li>
                <NavLink
                  className="btnn"
                  to="/dashboard/ventas-manuales/facturacion"
                >
                  Por Facturar{"   "}
                  <PointOfSaleRoundedIcon />
                </NavLink>
              </li>
            ) : null}
            <li>
              <NavLink
                className="btnn"
                to="/dashboard/ventas-manuales/generales"
              >
                Todos los pedidos
                {"   "}
                <Inventory2RoundedIcon />
              </NavLink>
            </li>
          </ul>
          {auth.role === "VENTA" ||
          auth.role === "SERVICIO" ||
          auth.role === "ADMIN" ? (
            <li>
              <NavLink
                to={`/dashboard/ventas-manuales/new/${auth._id}`}
                className="btnn"
              >
                Nueva venta
                {"   "}
                <AddShoppingCartRoundedIcon />
              </NavLink>
            </li>
          ) : null}

          {/* <li>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
              to="/dashboard/ventas-shopifyFox"
            >
              Ventas Shopify Fox
            </NavLink>
          </li> */}
        </ul>
      </nav>
    </>
  );
}

export default NavVentas;