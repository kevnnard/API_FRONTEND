import "./SppedDial.scss";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import MessageIcon from "@mui/icons-material/Message";
import ShareIcon from "@mui/icons-material/Share";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import Alerta from "../Alerta";
import { io } from "socket.io-client";
import useAuth from "../../hooks/useAuth";


const SpeedDialTooltipOpen  = () => {

  //aLERTA
  const { auth } = useAuth();
  const [alerta, setAlerta] = useState([])

  //Speed Dial
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Modal
   const [openModal, setOpenModal] = useState(false);
   const handleOpenModal = () => setOpenModal(true);
   const handleCloseModal = () => setOpenModal(false);

   //State Funtions
   const [mensaje, setMensaje] = useState("");

   let socket;
   const handleMensaje = async (e) => {
    e.preventDefault();
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("notify", { mensaje, nombre: auth.nombre });
    setAlerta({
        msg: "Notificacion enviada con exito"
    });
    handleCloseModal();
    setTimeout(() => {
        setAlerta({});
        setMensaje("");
    }, 3000);
   };

  const actions = [
    {
      icon: <MessageIcon />,
      name: "Crear una Notificacion",
      click: handleOpenModal,
    }
  ];
  
  const { msg } = alerta;
  return (
    <>
      {auth.role === "ADMIN" ? (
        <>
          {msg && <Alerta alerta={alerta} />}
          <Box
            sx={{
              position: "fixed",
              bottom: 0,
              right: 0,
              height: 350,
              transform: "translateZ(0px)",
              flexGrow: 1,
            }}
          >
            <Backdrop open={open} />
            <SpeedDial
              ariaLabel="SpeedDial tooltip example"
              sx={{ position: "absolute", bottom: "8rem", right: "3rem" }}
              icon={<SpeedDialIcon />}
              onClose={handleClose}
              onOpen={handleOpen}
              open={open}
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  tooltipOpen
                  onClick={action.click}
                />
              ))}
            </SpeedDial>
          </Box>
          <Modal
            keepMounted
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <Box className="modall">
              <h1 id="keep-mounted-modal-title" variant="h1" component="h1">
                ¡Crea una notificacion de alerta para los usuarios!
              </h1>
              <input
                type="text"
                placeholder="Escribe algo..."
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
              />
              <button className="btnn" onClick={handleMensaje}>
                Enviar
              </button>
            </Box>
          </Modal>
        </>
      ) : null}
    </>
  );
}

export default SpeedDialTooltipOpen;