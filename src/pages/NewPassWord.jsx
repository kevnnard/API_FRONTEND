import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Alerta from "../components/Alerta";


function NewPassWord() {
  const [password, setPasword] = useState("")
  const [alerta, setalerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [tokenConfirmado, setTokenConfirmado] = useState(false);

  const params = useParams();
  const { token } = params;


  useEffect(() => {
    const NewPassWord = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/users/login/lost-password/${token}`;
        const { data } = await axios.get(url);
        setalerta({
          msg: data.msg,
        });
        setTokenConfirmado(true);
      } catch (error) {
        setalerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
      
    }
    NewPassWord();
  }, [])
  const handleSubmit = async e => {
    e.preventDefault();

    if(password.length < 6){
      setalerta({
        msg: "Tu contraseña tiene que ser almenos de 6 caracteres",
        error: true
      })
    }
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/users/login/lost-password/${token}`;
      const { data } = await axios.post(url, {password});
      setalerta({
        msg: data.msg,
      });
      setCuentaConfirmada(true);
    } catch (error) {
      setalerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  }
  const { msg } = alerta;
  return (
    <main className="container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center">
      <div className="md:w-2/3 lg:w-2/5">
        <h1 className="text-4xl capitalize">Crea una nueva contraseña</h1>
        {msg && <Alerta alerta={alerta} />}
        {tokenConfirmado && (
          <form
            onSubmit={handleSubmit}
            className="my-10 bg-white shadow rounded-lg p-10"
          >
            <div className="my-5">
              <label
                className="text-black block text-xl font-bold"
                htmlFor="password"
              >
                Contraseña nueva
              </label>
              <input
                id="password"
                type="password"
                placeholder="Ingresa tu nueva contraseña"
                className="text-black w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={password}
                onChange={(e) => setPasword(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="Guardar nueva Contraseña"
              className="mb-5 bg-black w-full  text-white rounded-xl p-2 font-bold hover:cursor-pointer hover:bg-gray-900 transition-colors"
            />
          </form>
        )}
        {cuentaConfirmada && (
          <nav className="lg:flex lg:justify-left">
            <Link className="block text-white my-5 text-m text-center" to="/">
              Iniciar Sesion
            </Link>
          </nav>
        )}
      </div>
    </main>
  );
}

export default NewPassWord