import { useState } from "react";
import Alerta from "../components/Alerta";
import axios from "axios";
import { Select } from "@mui/material";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Signup() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [role, setRole] = useState("");
  const [alerta, setalerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, email, password, passwordRepeat, role].includes("")) {
      setalerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    if (password !== passwordRepeat) {
      setalerta({
        msg: "Las contraseñas no coinciden",
        error: true,
      });
      return;
    }
    if (password.length <= 6) {
      setalerta({
        msg: "Las contraseña es muy corto menos de 6 caracteres",
        error: true,
      });
      return;
    } else {
      setalerta({});
    }
    // crear usuario en la api

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard/users/signup`,
        { nombre, email, password, role }
      );
      setalerta({
        msg: data.msg,
        error: false,
      });
      setNombre("");
      setEmail("");
      setPassword("");
      setPasswordRepeat("");
      setRole("");
    } catch (error) {
      setalerta({
        msg: error.response.data.msg,
        error: true,
      });
      console.log(error);
    }
  };

  const { msg } = alerta;
  return (
    <>
      {auth.role === "ADMIN" ? (
        <main className="   md:flex md:justify-center">
          <div className="md:w-2/3 lg:w-2/5">
            <form
              onSubmit={handleSubmit}
              className="my-3 bg-white shadow rounded-lg p-3"
              enctype="multipart/form-data"
            >
              <div className="my-3">
                <label
                  className="text-black block text-xl font-bold"
                  htmlFor="name"
                >
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Ingresa el Nombre"
                  className="text-black w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="my-3">
                <label
                  className="text-black block text-xl font-bold"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Ingresa el email"
                  className="text-black w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="my-3">
                <label
                  className="text-black block text-xl font-bold"
                  htmlFor="role"
                >
                  Rol de usuario
                </label>
                <select
                  id="role"
                  type="text"
                  className="text-black w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option hidden selected>
                    Ingresa el Rol del usuario
                  </option>
                  <option value="VENTA">VENTAS</option>
                  <option value="DESPACHO">DESPACHOS</option>
                  <option value="SERVICIO">SERVICIO AL CLIENTE</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
              <div className="my-3">
                <label
                  className="text-black block text-xl font-bold"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <input
                  id="new-password"
                  type="new-password"
                  placeholder='"El usuario podra cambiarla al iniciar sesion"'
                  className="text-black w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="my-3">
                <label
                  className="text-black block text-xl font-bold"
                  htmlFor="passwordConfirm"
                >
                  confirmar contraseña
                </label>
                <input
                  id="passwordConfirm"
                  type="password"
                  placeholder="Ingresa de nuevo la contraseña"
                  className="text-black w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={passwordRepeat}
                  onChange={(e) => setPasswordRepeat(e.target.value)}
                />
              </div>
              {/* <div className="my-5">
                <label
                  className="text-black block text-xl font-bold"
                  htmlFor="imagen"
                >
                  Imagen de perfil
                </label>
                <input
                  type="file"
                  name="image"
                  id="inputGroupFile02"
                  aria-describedby="inputGroupFileAddon02"
                />
              </div> */}
              <input
                type="submit"
                value="Crear cuenta"
                className="mb-5 bg-black w-full  text-white rounded-xl p-2 font-bold hover:cursor-pointer hover:bg-gray-900 transition-colors"
              />
            </form>
            {msg && <Alerta alerta={alerta} />}
          </div>
        </main>
      ) : (
        navigate("/dashboard")
      )}
    </>
  );
}

export default Signup;
