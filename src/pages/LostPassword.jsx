import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import axios from "axios";

function LostPassword() {

  const [alerta, setalerta] = useState({});
  const [email, setEmail] = useState('')

  const handleSubmit = async e => {
    e.preventDefault();

    if ( email === "" || email.length < 6){
      setalerta({
        msg: "Introduce un correo valido",
        error: true
      });
      return
    }
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/login/lost-password`, {email })
        setalerta({
          msg: data.msg,
        });
        
    } catch (error) {
      setalerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  }

  const { msg } = alerta;
  return (
    <main className="container mx-auto p-5 md:flex md:justify-center">
      <div className="md:w-2/3 lg:w-2/5">
        <div className="flex p-2">
          <a href="https://www.foxracing.com.co/" target="_blank">
            <img width="100%" src="/img/isoB.png" alt="" />
          </a>
          <a href="https://www.foxracing.com.co/" target="_blank">
            <img width="100%" src="/img/isoB.png" alt="" />
          </a>
        </div>
        <h1 className="text-3xl text-center capitalize">Recupera tu acceso</h1>
        {msg && <Alerta alerta={alerta} />}
        <form
          onSubmit={handleSubmit}
          className="my-10 bg-white shadow rounded-lg p-10"
        >
          <div className="my-5">
            <label
              className="text-black block text-xl font-bold"
              htmlFor="email"
            >
              Escribe tu correo de Email registrado
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
          <input
            type="submit"
            value="Recuperar cuenta"
            className="mb-5 bg-black w-full rounded-xl p-2  text-white font-bold hover:cursor-pointer hover:bg-gray-900 transition-colors"
          />
        </form>

        <nav className="lg:flex lg:justify-left">
          <Link
            className="block text-slate-500 my-5 text-sm text-center"
            to="/"
          >
            Volver a Iniciar Sesion
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
  );
}

export default LostPassword;
