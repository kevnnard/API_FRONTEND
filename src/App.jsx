//dependencies
import { Routes , Route , BrowserRouter, HashRouter} from 'react-router-dom'

// cOMPONETN , PAGES 
import Login from './pages/Login'
import Signup from './pages/Signup';
import LostPassword from "./pages/LostPassword";
import NewPassword from './pages/NewPassWord'
import ConfirmCount from './pages/ConfirmCount'
import HomeAuth from './pages/HomeAuth'
import RutaProtegida from "./layouts/RutaProtegida";
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthProvider';
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Perfil from './pages/Perfil';
import UsersList from './pages/UsersList';
import Productos from './pages/Productos/Productos';
import VentasManuales from './pages/ventas/VentasManuales';
import VentaManualId from './pages/ventas/VentaManualId';
import NewVentaManual from './pages/ventas/NewVentaManual';
import Novedades from './pages/ventas/Novedades';
import VentasGenerale from './pages/ventas/VentasGenerales';
import Facturacion from './pages/ventas/Facturacion';
import VentasPorUsuario from './pages/Estadisticas/VentasPorUsuario';
import VentasMercadoLibre from './pages/ventas/VentasMercadoLibre';
import Firmacliente from './pages/Estadisticas/FirmaCliente';
import ClientesPedidos from './pages/Estadisticas/ClientesPedidos';
// import List from './pages/list/List';


function App() {
    const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app" : "app dark"}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/">
              <Route index element={<Login />} />
              <Route
                path="/users/confirmar/:token"
                element={<ConfirmCount />}
              />
              <Route
                path="/users/login/lost-password"
                element={<LostPassword />}
              />
              <Route
                path="/users/login/lost-password/:token"
                element={<NewPassword />}
              />
            </Route>

            <Route path="dashboard" element={<RutaProtegida />}>
              <Route index element={<HomeAuth />} />
              <Route path="users" element={<UsersList />} />
              <Route path="users/signup" element={<Signup />} />
              <Route path="perfil" element={<Perfil />} />

              <Route path="productos" element={<Productos />} />

              <Route path="ventas-manuales">
                <Route path="despachos/:id" element={<VentasManuales />} />
                <Route path="novedades" element={<Novedades />} />
                <Route path="facturacion" element={<Facturacion />} />
                <Route path="generales" element={<VentasGenerale />} />
                <Route path="new/:id" element={<NewVentaManual />} />
                <Route path=":id" element={<VentaManualId />} />
              </Route>

              <Route path="estadisticas">
                <Route path="ventas-usuario" element={<VentasPorUsuario />} />
                <Route path="firmas" element={<Firmacliente />} />
                <Route path='clientes-pedidos' element={<ClientesPedidos />} />
              </Route>

              <Route path="ventas-mercadoLibre">
                <Route index element={<VentasMercadoLibre />} />
              </Route>

            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App
