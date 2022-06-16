import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonIcon from "@mui/icons-material/Person";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import axios from "axios";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useEffect, useState } from "react";
import useAuth from '../../hooks/useAuth'




const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
   const { darkMode } = useContext(DarkModeContext);
   const { auth} = useAuth();

   
  // const [mensajesCont, setMensajesCont] = useState([]);

  
  // const pro = mensajesCont.find((vent) => vent.estado_pedido == "pendiente");

  // console.log([pro])

  // const [veificar, setVerificar] = useState(false);


  // let i = 0;
  // if (mensajesCont) {
  //   for (i in mensajesCont.data) {
  //     i++;
  //   }
  // }

  // setInterval(() => {
  //   if ( veificar === true ) {
  //     obtenerCliente();
  //   }
  // }, 30000);

  //  useEffect(() => {
  //   obtenerCliente();
  //  }, [])
   
   
  //  const obtenerCliente = async () => {
  //    try {
  //      try {
  //        const url = `${
  //          import.meta.env.VITE_BACKEND_URL
  //        }/dashboard/ventas-manuales/pendientes`;
  //        const { data } = await axios.get(url);
  //       setMensajesCont(data);
  //        setVerificar(true)
  //        setTimeout(() => {
  //          setVerificar(false)
  //        }, 1000);
  //      } catch (error) {
  //        console.log(error);
  //      }
  //    } catch (error) {
  //      console.log(error);
  //      setVentas(false);
  //    }
  //  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="wrapper__logos">
          <img
            width={200}
            src={darkMode ? "/img/isoB.png" : "/img/logo2N.png"}
          />
        </div>

        <div className="items">
          {/* <div className="item">
            <DarkModeOutlinedIcon className="icon" />
          </div> */}
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">0</div>
          </div>
          {/* <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div> */}
          {/* <div className="item">
            <ListOutlinedIcon className="icon" />
          </div> */}
          <div className="item">
            <img
              src={darkMode ? "/img/logo1B.png" : "/img/logo2N.png"}
              alt=""
              className="avatar"
            />
            <span style={{fontWeight: "bold", textTransform: "uppercase"}}>{auth.nombre}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
