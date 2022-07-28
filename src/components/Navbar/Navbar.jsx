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
   const [mensajesCont, setMensajesCont] = useState([]);
   const [ mensajesEstado, setMensajesEstado] = useState(false);
   const [open, setOpen] = useState(false);

   const handleClick = () => {
     setOpen((prev) => !prev);
     setMensajesEstado(true);
     obtenerNotifys();
     setnotifyIcon(0);
   };

   const handleClickAway = () => {
     setOpen(false);
   };
   
   
  const [online, setOnline] = useState({});

  const { dispatch } = useContext(DarkModeContext);
  const { darkMode } = useContext(DarkModeContext);
   const { auth} = useAuth();
   const [notifyIcon, setnotifyIcon] = useState(0);

   let socket;

   useEffect(() => {
      obtenerNotifys();
   }, [])

   
   useEffect(() => {
      socket = io(import.meta.env.VITE_BACKEND_URL);
      socket.on("notifyMessage", (data) => {
        if(notifyIcon >= 1) {
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
         `${import.meta.env.VITE_BACKEND_URL}/dashboard/notify`);
          setMensajesCont({data});
          setMensajesEstado(true);
    } catch (error) {
      console.log(error)
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
