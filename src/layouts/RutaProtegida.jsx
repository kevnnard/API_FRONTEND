import { Outlet, Navigate } from "react-router-dom";
//Componetns
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import SpeedDialTooltipOpen from "../components/SpeedDialTooltipOPen/SpeedDialToolTipOpen";
//Helpers
import useAuth from "../hooks/useAuth";
import Cargando from "./Cargando";

function RutaProtegida() {
  const { auth, cargando } = useAuth();

  if (cargando) return <Cargando />;

  return (
    <>
      {auth._id ? (
        <>
          <Navbar />
          <Sidebar />
          <div id="rutaProtegida" className="rutaProtegida">
            <Outlet />
            <div className="SpeedDialIcon">
              <SpeedDialTooltipOpen />
            </div>
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}

export default RutaProtegida;
