import "./sidebar.scss";
import useAuth from "../../hooks/useAuth";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import MenuIcon from "@mui/icons-material/Menu";
import clsx from "clsx";
import style from "./sidebar.module.scss";

import { Link, useNavigate } from "react-router-dom";

//DARKMODE
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";

const Sidebar = () => {
  const [ventass, setVentas] = useState(false);
  const { auth, cerrarSesionAuth } = useAuth();
  const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [OpenMenu, setOpenMenu] = useState(true);

  const handleClick = () => {
    setOpenMenu(!OpenMenu);
  };
  try {
    setTimeout(() => {
      setVentas(true);
    }, 500);
  } catch (error) {
    setVentas(false);
  }

  const handleSubmit = () => {
    cerrarSesionAuth();
    localStorage.removeItem("token");
    setTimeout(() => {
      window.location.reload(true);
      navigate("/");
    }, 100);
  };

  const class__change = clsx(style.show, {
    [style.hidde]: OpenMenu,
  });
  return (
    <>
      {ventass == true ? (
        <>
          <MenuIcon
            onClick={handleClick}
            style={{ fontSize: "2.8rem" }}
            className="menu_desk"
          />
          <div className={class__change} id="sidebar">
            <div className="center">
              <br />
              <span style={{ fontWeight: "bold", textTransform: "uppercase" }}>
                {auth.nombre}
                <p className="online_status_user">
                  {" "}
                  <CircleRoundedIcon className="icon " /> Online
                </p>
              </span>
              <ul>
                <p className="title">Inicio</p>
                <li>
                  <DashboardIcon className="icon" />
                  <Link
                    onClick={handleClick}
                    className={class__change}
                    to="/dashboard"
                  >
                    <span>Panel de inicio</span>
                  </Link>
                </li>
                <p className="title">Tienda online</p>
                <Link
                  onClick={handleClick}
                  to="productos"
                  style={{ textDecoration: "none" }}
                >
                  <li>
                    <StoreIcon className="icon" />
                    <span>Productos</span>
                  </li>
                </Link>
                {auth.role === "DESPACHO" || auth.role === "ADMIN" ? (
                  <Link onClick={handleClick} to="ventas-manuales/despachos">
                    <li>
                      <LocalShippingIcon className="icon" />
                      <span>Despachos</span>
                    </li>
                  </Link>
                ) : null}
                {auth.role === "VENTA" || auth.role === "ADMIN" ? (
                  <Link onClick={handleClick} to="ventas-manuales/generales">
                    <li>
                      <CreditCardIcon className="icon" />
                      <span>Ventas</span>
                    </li>
                  </Link>
                ) : null}
                {auth.role === "SERVICIO" || auth.role === "ADMIN" ? (
                  <Link onClick={handleClick} to="ventas-manuales/novedades">
                    <li>
                      <AnnouncementIcon className="icon" />
                      <span>Novedades</span>
                    </li>
                  </Link>
                ) : null}
                {auth.role === "ADMIN" ? (
                  <>
                    <p className="title">Estadisticas</p>
                    <li>
                      <PsychologyOutlinedIcon className="icon" />
                      <Link
                        onClick={handleClick}
                        className={class__change}
                        to="/dashboard/estadisticas/ventas-usuario"
                      >
                        <span>Ventas por usuario</span>
                      </Link>
                    </li>
                  </>
                ) : null}
                {/* <li>
                  <LocalShippingIcon className="icon" />
                  <span>Envios</span>
                </li>
                <li>
                  <InsertChartIcon className="icon" />
                  <span>Estadisticas</span>
                </li>
                <li>
                  <NotificationsNoneIcon className="icon" />
                  <span>Notificaciones</span>
                </li> */}
                {/* <p className="title">SERVICE</p>
                <li>
                  <SettingsSystemDaydreamOutlinedIcon className="icon" />
                  <span>System Health</span>
                </li>
                <li>
                  <PsychologyOutlinedIcon className="icon" />
                  <span>Logs</span>
                </li>
                <li>
                  <SettingsApplicationsIcon className="icon" />
                  <span>Settings</span>
                </li> */}
                <p className="title">Usuario</p>
                {auth.role === "ADMIN" ? (
                  <Link
                    onClick={handleClick}
                    to="users/signup"
                    style={{ textDecoration: "none" }}
                  >
                    <li>
                      <PersonOutlineIcon className="icon" />
                      <span>Crear usuario</span>
                    </li>
                  </Link>
                ) : (
                  ""
                )}
                {auth.role === "ADMIN" ? (
                  <Link
                    onClick={handleClick}
                    to="users"
                    style={{ textDecoration: "none" }}
                  >
                    <li>
                      <PersonOutlineIcon className="icon" />
                      <span>Todos los usuarios</span>
                    </li>
                  </Link>
                ) : (
                  ""
                )}
                <li>
                  <AccountCircleOutlinedIcon className="icon" />
                  <Link onClick={handleClick} to="perfil">
                    <span>Mi perfil</span>
                  </Link>
                </li>
                <li className="button-sesion">
                  <ExitToAppIcon className="icon" />
                  <button type="button" onClick={handleSubmit}>
                    <span>Cerrar sesion</span>
                  </button>
                </li>
              </ul>
            </div>
            {/* <div className="bottom">
              <div
                className="colorOption"
                onClick={() => dispatch({ type: "LIGHT" })}
              ></div>
              <div
                className="colorOption"
                onClick={() => dispatch({ type: "DARK" })}
              ></div>
            </div> */}
          </div>
        </>
      ) : null}
    </>
  );
};

export default Sidebar;
