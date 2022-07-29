import "./navbar.scss";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import axios from "axios";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useEffect, useState } from "react";
import useAuth from '../../hooks/useAuth'
import { io } from "socket.io-client";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import moment from "moment/min/moment-with-locales";
import CardOnline from "../../components/Online/CardOnline";



const Navbar = () => {
  moment.locale("es");

  // Notifys User
  const [mensajesCont, setMensajesCont] = useState([]);
  const [mensajesEstado, setMensajesEstado] = useState(false);
  const [open, setOpen] = useState(false);
  const [notifyIcon, setnotifyIcon] = useState(0);

  const handleClick = () => {
    setOpen((prev) => !prev);
    setMensajesEstado(true);
    obtenerNotifys();
    setnotifyIcon(0);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  //Orders Fox Racing
  const [mensajesContFox, setMensajesContFox] = useState([]);
  const [mensajesEstadoFox, setMensajesEstadoFox] = useState(false);
  const [openFox, setOpenFox] = useState(false);
  const [notifyIconFox, setnotifyIconFox] = useState(0);

  const handleClickFox = () => {
    setOpenFox((prev) => !prev);
    setMensajesEstadoFox(true);
    obtenerNotifysFox();
    obtenerNotifysResplays();
  };

  const handleClickAwayFox = () => {
    setOpenFox(false);
  };

  //Orders Replays
  const [mensajesContReplays, setMensajesContReplays] = useState([]);
  const [mensajesEstadoReplays, setMensajesEstadoReplays] = useState(false);
  const [openReplays, setOpenReplays] = useState(false);
  const [notifyIconReplays, setnotifyIconReplays] = useState(0);

  const handleClickReplays= () => {
    setOpenReplays((prev) => !prev);
    setMensajesEstadoReplays(true);
    obtenerNotifysResplays();
  };

  const handleClickAwayReplays = () => {
    setOpenReplays(false);
  };

  const [online, setOnline] = useState({});
  const { dispatch } = useContext(DarkModeContext);
  const { darkMode } = useContext(DarkModeContext);
  const { auth } = useAuth();

  let socket;
  useEffect(() => {
    obtenerNotifys();
    obtenerNotifysFox();
  }, []);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.on("notifyMessage", (data) => {
      if (notifyIcon >= 1) {
        setnotifyIcon(2);
      } else {
        setnotifyIcon(1);
      }
      obtenerNotifys();
    });
  }, []);

  const obtenerNotifys = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard/notify`
      );
      setMensajesCont({ data });
      setMensajesEstado(true);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerNotifysFox = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard/ventas-shopify/fox`
      );
      setnotifyIconFox(data.orders.length);
      setMensajesContFox({ data });
      setMensajesEstadoFox(true);
    } catch (error) {
      console.log(error);
    }
  };

   const obtenerNotifysResplays = async () => {
     try {
       const { data } = await axios.get(
         `${import.meta.env.VITE_BACKEND_URL}/dashboard/ventas-shopify/replays`
       );
       setnotifyIconReplays(data.orders.length);
       setMensajesContReplays({ data });
       setMensajesEstadoReplays(true);
     } catch (error) {
       console.log(error);
     }
   };
  const { msgOnline } = online;
  let mensajeCont = 0;
  return (
    <div className="navbar">
      {msgOnline && <CardOnline online={online} />}
      <div className="wrapper">
        <div className="wrapper__logos">
          {/* <img
            width={50}
            src={darkMode ? "/img/logo1B.png" : "/img/logo2N.png"}
          /> */}

          <img
            width={50}
            src={darkMode ? "/img/gruporB.png" : "/img/gruporN.png"}
          />
        </div>

        <div className="items">
          {/* <div className="item">
            <DarkModeOutlinedIcon className="icon" />
          </div> */}
          {/* orders Replays  */}
          <div className="item">
            <ClickAwayListener onClickAway={handleClickAwayReplays}>
              <Box sx={{ position: "relative", width: 35 }}>
                <Avatar
                  sx={{ width: "100%", height: "100%", cursor: "pointer" }}
                  onClick={handleClickReplays}
                  variant="square"
                  alt=""
                  src="/img/gruporB.png"
                />
                <div className="counter">{notifyIconReplays}</div>
                {openReplays ? (
                  <div className="caja_mensajes_user">
                    <h3>Todas las notificaciones</h3>
                    {mensajesEstadoReplays
                      ? mensajesContReplays.data !== undefined &&
                        mensajesContReplays.data.orders.map((item) => (
                          <ul key={item.id}>
                            <hr />
                            <li>
                              <h4>
                                <Avatar
                                  sx={{
                                    width: 25,
                                    height: "100%",
                                    cursor: "pointer",
                                  }}
                                  variant="square"
                                  alt=""
                                  src="/img/gruporB.png"
                                />
                                {item.name}
                                <span>
                                  {moment(item.created_at)
                                    .startOf("minute")
                                    .fromNow()}
                                </span>
                              </h4>
                              {item.line_items.map((item2) => (
                                <>
                                  <h3>{item2.name}</h3>
                                  <h6>{item2.price}</h6>
                                </>
                              ))}
                              <Stack padding={1} spacing={1} alignItems="left">
                                <Stack direction="row" spacing={1}>
                                  <Chip
                                    label={
                                      item.gateway == "Cash on Delivery (COD)"
                                        ? "Contra Entrega"
                                        : item.gateway
                                    }
                                    color={
                                      item.financial_status == "pending"
                                        ? "error"
                                        : "success"
                                    }
                                  />
                                  <Chip
                                    label={
                                      item.financial_status == "pending"
                                        ? "Sin pagar"
                                        : "Pago Procesado"
                                    }
                                    color={
                                      item.financial_status == "pending"
                                        ? "error"
                                        : "success"
                                    }
                                  />
                                </Stack>
                              </Stack>
                            </li>
                            <hr />
                          </ul>
                        ))
                      : "No hay mensajes"}
                  </div>
                ) : null}
              </Box>
            </ClickAwayListener>
          </div>
          {/* orders fox  */}
          <div className="item">
            <ClickAwayListener onClickAway={handleClickAwayFox}>
              <Box sx={{ position: "relative", width: 22 }}>
                <Avatar
                  sx={{ width: "100%", height: "100%", cursor: "pointer" }}
                  onClick={handleClickFox}
                  variant="square"
                  alt=""
                  src="/img/ima_Blanco.png"
                />
                <div className="counter">{notifyIconFox}</div>
                {openFox ? (
                  <div className="caja_mensajes_user">
                    <h3>Todas las notificaciones</h3>
                    {mensajesEstadoFox
                      ? mensajesContFox.data !== undefined &&
                        mensajesContFox.data.orders.map((item) => (
                          <ul key={item.id}>
                            <hr />
                            <li>
                              <h4>
                                <Avatar
                                  sx={{
                                    width: 25,
                                    height: "100%",
                                    cursor: "pointer",
                                  }}
                                  variant="square"
                                  alt=""
                                  src="/img/ima_negro.png"
                                />
                                {item.name}
                                <span>
                                  {moment(item.created_at)
                                    .startOf("minute")
                                    .fromNow()}
                                </span>
                              </h4>
                              {item.line_items.map((item2) => (
                                <>
                                  <h3>{item2.name}</h3>
                                  <h6>{item2.price}</h6>
                                </>
                              ))}
                              <Stack padding={1} spacing={1} alignItems="left">
                                <Stack direction="row" spacing={1}>
                                  <Chip
                                    label={
                                      item.gateway == "Cash on Delivery (COD)"
                                        ? "Contra Entrega"
                                        : item.gateway
                                    }
                                    color={
                                      item.financial_status == "pending"
                                        ? "error"
                                        : "success"
                                    }
                                  />
                                  <Chip
                                    label={
                                      item.financial_status == "pending"
                                        ? "Sin pagar"
                                        : "Pago Procesado"
                                    }
                                    color={
                                      item.financial_status == "pending"
                                        ? "error"
                                        : "success"
                                    }
                                  />
                                </Stack>
                              </Stack>
                            </li>
                            <hr />
                          </ul>
                        ))
                      : "No hay mensajes"}
                  </div>
                ) : null}
              </Box>
            </ClickAwayListener>
          </div>
          {/* Notifys messages user */}
          <div className="item">
            <ClickAwayListener onClickAway={handleClickAway}>
              <Box sx={{ position: "relative" }}>
                <NotificationsNoneOutlinedIcon
                  className="icon"
                  onClick={handleClick}
                />
                <div className="counter">{notifyIcon}</div>
                {open ? (
                  <div className="caja_mensajes_user">
                    <h3>Todas las notificaciones</h3>
                    {mensajesEstado
                      ? mensajesCont.data.docs.map((item) => (
                          <ul key={item._id}>
                            <hr />
                            <li>
                              <h4>
                                <Avatar alt={item.nombre} src={item.filename} />
                                {item.userMensaje}
                                <span>
                                  {moment(item.fechaMensaje)
                                    .startOf("minute")
                                    .fromNow()}
                                </span>
                              </h4>
                              <p>{item.mensaje}</p>
                              <Stack padding={1} spacing={1} alignItems="left">
                                <Stack direction="row" spacing={1}>
                                  <Chip
                                    label={
                                      mensajeCont == 0
                                        ? "Nuevo Mensaje"
                                        : "Mensaje Leido"
                                    }
                                    color={
                                      mensajeCont == 0 ? "error" : "success"
                                    }
                                  />
                                  <span hidden>{mensajeCont++}</span>
                                </Stack>
                              </Stack>
                            </li>
                            <hr />
                          </ul>
                        ))
                      : "No hay mensajes"}
                  </div>
                ) : null}
              </Box>
            </ClickAwayListener>
          </div>
          {/* <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div> */}
          {/* <div className="item">
            <ListOutlinedIcon className="icon" />
          </div> */}
          <div className="item">
            <Avatar
              style={{
                background: "#000",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
              alt={auth.nombre}
              src="/bc"
            />
            <span style={{ fontWeight: "bold", textTransform: "uppercase" }}>
              {auth.nombre}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
