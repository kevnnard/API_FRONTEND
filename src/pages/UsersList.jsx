import "./userlist.scss";
import moment from "moment/min/moment-with-locales"
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import Alerta from "../components/Alerta";
import axios from "axios";
import CardOnline from "../components/Online/CardOnline";

import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

function UsersList() {
  moment.locale("es-us");
  const { auth } = useAuth();
  const { handleModlaEliminarColaborador, eliminarColaborador } = useAuth();
  const navigate = useNavigate();
  const [online, setOnline] = useState({});
  const [alerta, setalerta] = useState({});
  const [usuarios, setUsuarios] = useState([]);
  
  let socket;

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.on("userOnline", ({ user }) => {
      obtenerUsuarios();
      if(user === undefined) {
        return
      } else {
        setOnline({
          msgOnline: user,
          error: true,
          mesagge: "Esta en Linea"
        });
      }
    });
    socket.on("userOffline", ({ user }) => {
      obtenerUsuarios();
      if (user === undefined) {
        return;
      } else {
        setOnline({
          msgOnline: user,
          error: false,
          mesagge: "Esta fuera de Linea",
        });
      }
    });
  },[]);
 
  const obtenerUsuarios = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/dashboard/users`;
      const { data } = await axios.get(url);
      setUsuarios(data);
    } catch (error) {
      setalerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
const [diff, setDiff] = useState(null);
const [initial, setInitial] = useState(null);

const tick = () => {
  setDiff(new Date(+new Date() - initial));
};
const start = () => {
  setInitial(+new Date());
};

useEffect(() => {
  if (initial) {
    requestAnimationFrame(tick);
  }
}, [initial]);

useEffect(() => {
  if (diff) {
    requestAnimationFrame(tick);
  }
}, [diff]);

const timeFormat = (date) => {
  if (!date) return "00:00:00:00";

  let hh = date.getUTCMinutes();
  let mm = date.getUTCMinutes();
  let ss = date.getSeconds();
  let cm = Math.round(date.getMilliseconds() / 10);

  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;
  cm = cm < 10 ? "0" + cm : cm;

  return `${hh}:${mm}:${ss}:${cm}`;
};
  const { msgOnline } = online;
  const { msg } = alerta;
  let cont = 0
  return (
    <>
      {auth.role === "ADMIN" ? (
        <>
          <h1 className="text-4xl text-center p-5 capitalize">
            Usuarios Registrados
          </h1>
          <main className="main-users-online">
            {msg && <Alerta alerta={alerta} />}
            {msgOnline && <CardOnline online={online} />}
            <table>
              <tr>
                <th>#</th>
                {/* <th>Id</th> */}
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol De Usuario</th>
                <th>Cuenta confirmada</th>
                <th>Fecha Creacion</th>
                <th>Online/Offline</th>
                <th>Tiempo en linea</th>
                <th>Accion/ DOBLE CLICK</th>
              </tr>
              {usuarios.map((item) => (
                <tr key={item._id}>
                  <td>{(cont += 1)}</td>
                  {/* <td>{item._id}</td> */}
                  <td>{item.nombre}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    {item.confirm
                      ? item.confirm.toString().replace(true, "SI")
                      : item.confirm.toString().replace(false, "NO")}
                  </td>
                  <td>{moment(item.creado).calendar()}</td>
                  <td>
                    <Stack direction="row" spacing={1}>
                      <StyledBadge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        variant="dot"
                        color={item.estadoOn ? "success" : "error"}
                      >
                        <Avatar alt={item.nombre} src={item.filename} />
                      </StyledBadge>
                    </Stack>
                  </td>
                  <td>
                    {item.estadoOn
                      ? "Conectado, " + moment(item.timeOnline).calendar()
                      : "Desconectado, " + moment(item.timeOffline).calendar()}
                  </td>
                  <td>
                    <button
                      style={{ background: "#f00", color: "#fff" }}
                      id="button1"
                      onClick={() =>
                        handleModlaEliminarColaborador(item) ||
                        eliminarColaborador()
                      }
                      className="btnn"
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </main>
        </>
      ) : (
        navigate("/dashboard")
      )}
    </>
  );
}

export default UsersList;
