import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Alerta from "../components/Alerta";

function ConfirmCount() {

  const [alerta, setalerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const confirmCount = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/users/confirmar/${token}`;
        const {data} = await axios.get(url)
        setalerta({
          msg: data.msg,
        });
        setCuentaConfirmada(true)
      } catch (error) {
        setalerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    }
    confirmCount();
  }, []);

  const { msg } = alerta;
  return (
    <main className="container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center">
      <div className="md:w-2/3 lg:w-2/5">
        <h1 className="text-4xl capitalize">
          Confirma tu cuenta para poder ingresar
        </h1>
        {msg && <Alerta alerta={alerta} />}
      </div>
      <div>
        {cuentaConfirmada && (
          <nav className="lg:flex lg:justify-left">
            <Link
              className="block text-white my-5 text-m text-center"
              to="/"
            >
              Iniciar Sesion
            </Link>
          </nav>
        )}
      </div>
    </main>
  );
}

export default ConfirmCount