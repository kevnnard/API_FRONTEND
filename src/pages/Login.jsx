import axios from 'axios';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Alerta from '../components/Alerta';
import useAuth from '../hooks/useAuth';

function Login() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

 const { setAuth } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();

    if([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      })
      return
    }
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}`, { email, password})
      setAlerta({});
      localStorage.setItem('token', data.token);
      setAuth(data);
      navigate('/dashboard')
      setTimeout(() => {
        window.location.reload(true);
        navigate("/dashboard");
      }, 5);
    } catch (error) {
      console.log(error)
       setAlerta({
         msg: error.response.data.msg,
         error: true,
       });
    }
  };
  const { msg } = alerta;
  return (
    <>
      {auth.confirm ? (
        navigate("/dashboard")
      ) : (
        <main style={{height: '100vh'}} className="md:flex md:justify-center align-items-center">
          <div className="md:w-2/3 lg:w-1/3">
            <div className="flex mt-5 p-5">
              <a href="https://www.foxracing.com.co/" target="_blank">
                <img width="100%" src="/img/isoN.png" alt="" />
              </a>
              <a href="https://www.foxracing.com.co/" target="_blank">
                <img width="100%" src="/img/isoN.png" alt="" />
              </a>
            </div>
            {msg && <Alerta alerta={alerta} />}
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow rounded-lg p-3"
            >
              <div className="my-1">
                <label
                  className="text-black block text-xl font-bold"
                  htmlFor="email"
                >
                  Usuario
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Ingresa tu email"
                  className="text-black w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="my-1">
                <label
                  className="text-black block text-xl font-bold"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  className="text-black w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Inciar Sesion"
                className="mb-1 bg-black w-full rounded-xl p-2 font-bold text-white hover:cursor-pointer hover:bg-gray-900 transition-colors"
              />
            </form>

            <nav className="p-0 m-0">
              <Link
                className="block text-slate-500 my-4 text-sm text-center"
                to="/users/login/lost-password"
              >
                Olvide mi contraseña
              </Link>
            </nav>

            <div className="text-center font-bold p-4">
              <p>Todos los derechos reservados Grupo-R S.A.S.©</p>
              <div className="flex justify-center align-items-center font-bold p-4">
                <h3>APP GRUPO R</h3>
                <img width="5% " src="/img/logo1B.png" />
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
  
}

export default Login