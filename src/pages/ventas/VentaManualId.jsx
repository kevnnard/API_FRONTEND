import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alerta from "../../components/Alerta";
import NavVentas from "./NavVentas";
import "./ventaManualId.scss";
import useAuth from "../../hooks/useAuth";
import Modal from "@mui/material/Modal";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import CloseIcon from "@mui/icons-material/Close";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import GuiaBogo from "./GuiaBogo";
import dataDane from "./json/ciudades.json";
import dataDane2 from "./json/departamentos.json"; 

function VentaManualId(){

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
    const [open2, setOpen2] = useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => {
      setOpen2(false);
      setTcc({});
      setEstadoTcc(false);
      setCiudadCambioFcs(false)
    };

 // cambio de ciudad si es venta fcs para generar guia de Tcc 
  const [ciudadCambioFcs, setCiudadCambioFcs] = useState(false);
  // navigate other place
  const navigate = useNavigate();
  //productos
  const [venta, setventa] = useState({});
  const [ventass, setVentas] = useState(false);

  // editar datos de envio si se requiere
  const [destinatario_envio, setDestinatario_envio] = useState("");
  const [telefono_envio, setTelefono_envio] = useState("");
  const [ciudad_envio, setCiudad_envio] = useState("");
  const [departamento_envio, setDepartamento_envio] = useState("");
  const [direccion_envio, setDireccion_envio] = useState("");
  const [indicaciones_envio, setIndicaciones_envio] = useState("");

  const [btnprovicional_envio, setbtnprovicional_envio] = useState(false);

  // cambio de estado del pedido
  const [estado_pedidoo, setEstado_Pedidoo] = useState("");

  // añadir nuevos productos al sac si se requiere
  const [search, setSearch] = useState("");
  // Obtener datos producto para editar o eliminar
  const [producto, setProducto] = useState("");
  const [confirmProducto, setConfirmProducto] = useState(false);
  // guardar objeto provicional para edicion
  const [productoProvicional, setProductoProvicional] = useState({});
  const [cantidadS, setCantidad] = useState();
  const [precioVenta, setPrecioVenta] = useState();

  // etsado para boton de confirmacion de producto provicional
  const [btnprovicional, setbtnprovicional] = useState(false);
  // obtener datos producto y camiar esatdo de solicitado 
  const [solicitadooa, setSolicitadooa] = useState("");

  // datros para el envio 
  const [numeroGuia, setNumeroGuia] = useState("");
  const [transportadora, setTransportadora] = useState("");

  // agregar mas comentarios COMENTARIOS
  const { auth } = useAuth();
  const [msgg, setMsg] = useState("");
  const [mensajesCont, setMensajesCont] = useState();

  // Enviar datos de guia si es requerido 
  const [metodo_envio_tcc, setMetodo_envio_tcc] = useState("");
  const [kilosReales, setKilosReales] = useState("");
  const [largoPaquete, setLargoPaquete] = useState("");
  const [altoPaquete, setAltoPaquete] = useState("");
  const [anchoPaquete, setAnchoPaquete] = useState("");
  const [PesoVolumen, setPesoVolumen] = useState("");
  const [observaciontcc, setObservacionTcc] = useState("");
  
  // recepcion datos DE TCC 
  const [tcc, setTcc] = useState({});
  const [estadoTcc, setEstadoTcc] = useState(false);
  // alerta
  const [alerta, setAlerta] = useState({});

  // parametros
  const params = useParams();
  const { id } = params;

  const [ciudad_envio_verr, setCiudadEnvioVerr] = useState("");
  
  useEffect(() => {
    obtenerCliente();
  }, []);

  const handleGenerarGuiaTcc = async (e) => {
    e.preventDefault();
     try {
       const { data } = await axios.post(
         `${
           import.meta.env.VITE_BACKEND_URL
         }/dashboard/ventas-shopify/prueba/${id}`,
         {
           metodo_envio_tcc,
           observaciontcc,
           kilosReales,
           largoPaquete,
           altoPaquete,
           anchoPaquete,
           PesoVolumen,
         }
       );
       setTcc(data);
       setEstadoTcc(true)
       setAlerta({ msg: "Guia creada con exito, siga la url para imprimir la guia"});
       setBtnGenerarGuia(false);
       setTimeout(() => {
        setAlerta({});
       }, 3000);
     } catch (error) {
       console.log(error);
     }
  };
  const handleMensaje = async (e) => {
    try {
     const {data} = await axios.put(
       `${
         import.meta.env.VITE_BACKEND_URL
       }/dashboard/ventas-manuales/edit/mensajes/${id}`,
       {
         auth, msgg
       }
     );

     setMensajesCont(data.mensajesCont);
     setAlerta({msg: data.msg , error: data.error });
     setMsg("");
     obtenerCliente("");
     setTimeout(() => {
      setAlerta({});
     }, 3000);
    } catch (error) {
      console.log(error)
    }
  };
  const handleChange_envio = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/dashboard/ventas-manuales/edit/datos/${id}`,
        {
          destinatario_envio,
          telefono_envio,
          ciudad_envio,
          departamento_envio,
          direccion_envio,
          indicaciones_envio,
        }
      );
      setAlerta({
        msg: "Datos Ingresados Actualizados con exito",
      });
      setDestinatario_envio("");
      setTelefono_envio("");
      setCiudad_envio("");
      setDepartamento_envio("");
      setDireccion_envio("");
      setIndicaciones_envio("");
      setbtnprovicional_envio(true);
      obtenerCliente();

      setTimeout(() => {
        setAlerta({});
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCerrarEnvio = async (e) => {
    e.preventDefault();
    setbtnprovicional_envio(false);
    setCiudadCambioFcs(true)
  };

  const handleActualizarProductoo = async (e) => {
    e.preventDefault();
    try {
      const sku = productoProvicional.sku;
      const cantidadP = productoProvicional.cantidadS;
      const { data } = await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/dashboard/ventas-manuales/edit/precio/${id}`,
        { sku, cantidadS, precioVenta, cantidadP }
      );
      if (data.error == true) {
        setAlerta({
          msg: data.msg,
          error: data.error,
        });
        setCantidad();
        setPrecioVenta();
        setTimeout(() => {
          setAlerta({});
        }, 7000);
        return;
      } else {
        setAlerta({
          msg: data.msg,
        });
        setProducto("");
        setCantidad();
        setPrecioVenta();
        setbtnprovicional(true);
        setTimeout(() => {
          setAlerta({});
        }, 4000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCerrarr = async (e) => {
    e.preventDefault();
    obtenerCliente();
    setTimeout(() => {
      setProductoProvicional({});
      setbtnprovicional(false);
    }, 5);
  };

  const handleActualizarProducto = async (e) => {
    e.preventDefault();
    try {
      const sku = productoProvicional.sku;
      await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/dashboard/ventas-manuales/edit/${id}`,
        { sku, solicitadooa, numeroGuia, transportadora }
      );
      setAlerta({
        msg: "Producto Actualizado con exito",
      });
      setbtnprovicional(true);
      setSolicitadooa("");
      setNumeroGuia("");
      setTransportadora("");
      obtenerCliente();
      setTimeout(() => {
        setAlerta({});
        obtenerCliente();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCerrar = async (e) => {
    e.preventDefault();
    setProductoProvicional({});
    obtenerCliente();
    setTimeout(() => {
      setConfirmProducto(false);
      setbtnprovicional(false);
    }, 100);
  };

  const handleSearchProducto = async (e) => {
    e.preventDefault();
    const result = venta.data.productos.find((vent) => vent.sku == producto);
    setProductoProvicional(result);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/dashboard/buscar/producto/put/${id}`,
        { search }
      );
      setAlerta({
        msg: data.msg,
        error: data.error,
      });
      obtenerCliente();
      setSearch("");
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBorrarProducto = async (e) => {
    e.preventDefault();
    const confirmar = confirm("Seguro quieres borrar El Articulo ?");
    const result = venta.data.productos.find((vent) => vent.sku == producto);
    console.log(result)
    const sku = result._id;
    const skuS = result.id_shopify;
    if (confirmar) {
      try {
       const {data} =  await axios.put(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/dashboard/ventas-manuales/delete/producto/${id}`,
          { sku, skuS }
        );
        obtenerCliente();
        setProducto("");
        setAlerta({
          msg: "Producto Borrado Con exito",
          error: true,
        });
        obtenerCliente();
        setTimeout(() => {
          setAlerta({});
          obtenerCliente();
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    } else {
      setAlerta({
        msg: "El Articulo no a sido borrado",
      });
      setTimeout(() => {
        setAlerta({});
      }, 2000);
    }
  };

  const handleEstado = async () => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard/ventas-manuales/${id}`,
        { estado_pedidoo }
      );
      setAlerta({
        msg: "Estado Actualizado",
      });
      setEstado_Pedidoo("");
      obtenerCliente();
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const terminarPedido = async (e) => {
    e.preventDefault();
    // AQUI DEBE CAMBIAR EL ESATDO DE ENVIO EN SHOPIFY y demas PEDIDOS
    if( venta.data.tienda == "Shopify") {
        try {
          const nuPedidoSho = venta.data.nuOrdenShopify;
          const { data } = await axios.post(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/dashboard/ventas-shopify/enviar/${id}`,
            { nuPedidoSho }
          );
         setAlerta({ msg: data.msg });
         navigate("/dashboard/ventas-manuales/despachos");
         setTimeout(() => { 
           setAlerta({});
        }, 4000);
        } catch (error) {
          console.log(error);
        }
    }
    if( venta.data.tienda != "Shopify") {
      try {
        const numeroVenta = venta.data.nuVenta;
          const { data } = await axios.post(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/dashboard/ventas-manuales/enviar/pedido/${id}`,
            { numeroVenta }
          );
           setAlerta({ msg: data.msg });
           navigate("/dashboard/ventas-manuales/despachos");
           setTimeout(() => {
             setAlerta({});
           }, 4000);
          } catch (error) {
            console.log(error)
          }
    } else {
      return;
    }
  };

  const obtenerCliente = async () => {
    try {
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/dashboard/ventas-manuales/${id}`;
      const { data } = await axios.get(url);
      setventa({ data });
      setVentas(true);

      try {
        const url = `${
        import.meta.env.VITE_BACKEND_URL
        }/dashboard/ventas-manuales/edit/mensajes/cont/${id}`;
        const { data } = await axios.get(url);
        setMensajesCont(data);
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.log(error);
      setVentas(false);
    }
  };

  const { msg } = alerta;
  return (
    <>
      <NavVentas />
      {ventass ? (
        <>
          <h2
            style={{ fontSize: "3rem", padding: "2rem", textAlign: "center" }}
          >
            Pedido{" "}
            <strong
              style={{ color: "#f00" }}
            >{`#${venta.data.nuVenta}`}</strong>
          </h2>
        </>
      ) : null}
      <main className=" md:flex md:justify-center">
        <div className="container">
          {ventass ? (
            <form className="formularioNewVenta">
              <div>
                <label>Tienda</label>
                <input
                  type="text"
                  name="tienda"
                  id="tienda"
                  value={venta.data.tienda}
                />
              </div>
              <div>
                <label>Cedula</label>
                <input
                  type="text"
                  name="cedula"
                  value={venta.data.cliente.cedula}
                  placeholder="#"
                />
              </div>
              <div>
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={venta.data.cliente.nombre}
                />
              </div>
              <div>
                <label>Departamento</label>
                <input
                  type="text"
                  name="departamento"
                  id="departamento"
                  value={venta.data.cliente.departamento}
                />
              </div>
              <div>
                <label>Ciudad</label>
                <input
                  type="text"
                  name="departamento"
                  id="departamento"
                  value={venta.data.cliente.ciudad}
                />
              </div>
              {/* <div>
                <label>Direccion</label>
                <input
                  type="text"
                  name="direccion"
                  value={venta.data.cliente.direccion}
                  
                />
              </div> */}
              <div>
                <label>email</label>
                <input
                  type="email"
                  name="email"
                  value={
                    venta.data.cliente.email == null
                      ? "Solicitar al cliente "
                      : venta.data.cliente.email
                  }
                />
              </div>
              {/* <div>
                <label>telefono</label>
                <input
                  type="number"
                  name="telefono"
                  value={venta.data.cliente.telefono}
                  
                />
              </div> */}
              <hr style={{ gridColumn: " 1 / 5" }} />

              {/* DATOS DE ENVIO DE VENTA */}
              <div>
                <label>destinatario</label>
                <input
                  type="text"
                  name="destinatario_envio"
                  value={venta.data.datos_envio.destinatario_envio}
                  placeholder="# identificacion"
                />
              </div>
              <div>
                <label>telefono destinatario</label>
                <input
                  type="text"
                  name="telefono_envio"
                  value={venta.data.datos_envio.telefono_envio}
                />
              </div>
              <div>
                <label>Departamento destinatario</label>
                <input
                  type="text"
                  name="departamento_envio"
                  value={venta.data.datos_envio.departamento_envio}
                />
              </div>
              <div>
                <label>Ciudad destinatario</label>
                <input
                  type="text"
                  value={venta.data.datos_envio.ciudad_envio}
                />
              </div>
              <div>
                <label>Direccion destinatario</label>
                <input
                  type="text"
                  name="direccion_envio"
                  value={venta.data.datos_envio.direccion_envio}
                />
              </div>
              <div>
                <label>Indicaciones - Casa / apt </label>
                <input
                  type="text"
                  name="indicaciones_envio"
                  value={venta.data.datos_envio.indicaciones_envio}
                />
              </div>

              <div>
                {/* <!-- Button trigger modkal --> */}
                {auth.role === "SERVICIO" || auth.role === "ADMIN" ? (
                  <button
                    style={{ color: "#fff", background: "#f00" }}
                    type="button"
                    className="btnn"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    Editar
                  </button>
                ) : null}
                {/* <!-- Modal --> */}
                <div
                  style={{ color: "#000" }}
                  className="modal fade"
                  id="staticBackdrop"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog-centered modal-dialog modal_content_custom">
                    <div className="modal-content">
                      <div className="modal-header ">
                        <h1 className="modal-title" id="staticBackdropLabel">
                          Actualizar datos de envio para :{" "}
                          <strong>{venta.data.cliente.nombre}</strong>
                        </h1>
                      </div>
                      <div className="modal-body custom_imputs_modal">
                        <table>
                          <tr>
                            <td>
                              <input
                                type="text"
                                value={destinatario_envio}
                                placeholder="# CC O NIT de destinatario"
                                onChange={(e) =>
                                  setDestinatario_envio(e.target.value)
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                value={telefono_envio}
                                placeholder="# Telefono de destinatario"
                                onChange={(e) =>
                                  setTelefono_envio(e.target.value)
                                }
                              />
                            </td>
                            <td>
                              <select
                                name="departamento_envio"
                                value={departamento_envio}
                                onChange={(e) =>
                                  setDepartamento_envio(e.target.value)
                                }
                              >
                                <option selected value="" disabled>
                                  Elige el departamento
                                </option>
                                {dataDane2.map((item) => (
                                  <option value={item.departamento}>
                                    {item.departamento}
                                  </option>
                                ))}
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <select
                                name="ciudad_envio"
                                value={ciudad_envio}
                                onChange={(e) =>
                                  setCiudad_envio(e.target.value)
                                }
                              >
                                <option selected value="" disabled>
                                  Elige una ciudad
                                </option>
                                {dataDane.map((item) => (
                                  <option value={item.codigo}>
                                    {item.ciduad} - {item.departamento}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input
                                type="text"
                                value={direccion_envio}
                                placeholder="Direccion exacta del destinatario"
                                onChange={(e) =>
                                  setDireccion_envio(e.target.value)
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                value={indicaciones_envio}
                                placeholder="Indicaciones exactas"
                                onChange={(e) =>
                                  setIndicaciones_envio(e.target.value)
                                }
                              />
                            </td>
                          </tr>
                        </table>
                      </div>
                      <div className="modal-footer">
                        {btnprovicional_envio == false ? (
                          <input
                            style={{
                              color: "#fff",
                              background: "#1F0",
                              margin: "1rem auto",
                            }}
                            type="button"
                            className="btnn"
                            value={`Actualizar`}
                            onClick={handleChange_envio}
                          />
                        ) : (
                          <button
                            style={{
                              color: "#fff",
                              background: "#f00",
                              margin: "1rem auto",
                            }}
                            type="button"
                            className="btnn"
                            data-bs-dismiss="modal"
                            onClick={handleCerrarEnvio}
                          >
                            Cerrar
                          </button>
                        )}
                      </div>
                      {msg && <Alerta alerta={alerta} />}
                    </div>
                  </div>
                </div>
              </div>

              <hr style={{ gridColumn: " 1 / 5" }} />
              {/* REFERENCIA Y METODO DE PAGO  */}
              <div style={{ gridColumn: " 1 / 2" }}>
                <label>Metodo</label>
                <input
                  type="text"
                  name="metodo_pago"
                  value={
                    venta.data.pago.metodo_pago == "Cash on Delivery (COD)"
                      ? "Contra Entrega"
                      : venta.data.pago.metodo_pago
                  }
                />
              </div>
              <div>
                <label>REFERENCIA DE PAGO</label>
                <input
                  type="text"
                  name="referencia_pago"
                  value={
                    venta.data.pago.referencia_pago == ""
                      ? "Pendiente de pago"
                      : venta.data.pago.referencia_pago
                  }
                />
              </div>
              <div>
                <label>Estado</label>
                <input
                  type="text"
                  name="estado_pago"
                  value={
                    venta.data.pago.estado_pago == "pending"
                      ? "Pendiente"
                      : venta.data.pago.estado_pago
                  }
                />
              </div>
              <hr style={{ gridColumn: " 1 / 5" }} />
              {venta.data.tienda == "Shopify" ? (
                <>
                  {/* TRAER CUPONES DE DESCUENTO */}
                  <div className="grid_adicionales_shopify">
                    <div>
                      <h1>Cupon de descuento aplicado : </h1>
                      {venta.data.cupon_descuento == ""
                        ? "No aplico un cupon"
                        : venta.data.cupon_descuento.map((item) => (
                            <Card>
                              <CardContent>
                                <Typography
                                  sx={{ fontSize: 25, fontWeight: "bold" }}
                                  color="text.secondary"
                                  gutterBottom
                                >
                                  {item.codigo_nombre}
                                </Typography>
                                <Typography
                                  sx={{ fontSize: 14 }}
                                  component="div"
                                >
                                  Por valor a:
                                </Typography>
                                <Typography
                                  sx={{
                                    mb: 1,
                                    fontSize: 15,
                                    color: "#f34",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {"$" +
                                    Intl.NumberFormat("es-ES", {
                                      style: "currency",
                                      currency: "COP",
                                      minimumFractionDigits: 0,
                                    }).format(item.codigo_valor)}
                                </Typography>
                              </CardContent>
                            </Card>
                          ))}
                    </div>
                    {/* SI TIENE NOTAS DE SHOPIFY MOSTRAR */}
                    <div>
                      <h1>Notas del cliente: </h1>
                      <Card>
                        <CardContent>
                          <Typography
                            sx={{ fontSize: 20, fontWeight: "bold" }}
                            color="text.secondary"
                            gutterBottom
                          >
                            {venta.data.notas_shopify == ""
                              ? "¡No hay notas en este pedido!"
                              : venta.data.notas_shopify}
                          </Typography>
                          <Typography component="div"></Typography>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
              {/* ESTADO DEL PEDIDO  */}
              <h1>Estado del pedido: </h1>
              <div
                style={{ gridColumn: " 1 / 3" }}
                className="custom_selecr_ventaid"
              >
                <select
                  value={
                    estado_pedidoo === ""
                      ? venta.data.estado_pedido
                      : estado_pedidoo
                  }
                  onChange={(e) => setEstado_Pedidoo(e.target.value)}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="solicitado">Solicitado </option>
                  <option value="novedad">Novedad </option>
                  <option value="enviado">Enviado </option>
                  <option value="cambio">Cambio </option>
                  <option value="cancelado">Venta Cancelada </option>
                  <option value="fallido">Venta Fallida </option>
                </select>
              </div>
              <div className="envio_datos_finales">
                <h1>Datos de Envio finales: </h1>
                <div>
                  <h2>
                    #De guia:{" "}
                    <span>
                      {venta.data.envio_pedido
                        ? venta.data.envio_pedido.numGuia
                        : "AUN NO SE A GENERADO"}
                    </span>
                  </h2>
                  <h2>
                    #Transportadora:{" "}
                    <span>
                      {venta.data.envio_pedido
                        ? venta.data.envio_pedido.transportadora
                        : "AUN NO SE A ENVIADO"}
                    </span>
                  </h2>
                </div>
              </div>
              {msg && <Alerta alerta={alerta} />}
              {!estado_pedidoo == "" ? (
                <div style={{ gridColumn: "1 / 3" }}>
                  <input
                    style={{
                      background: "#f00",
                      color: "#fff",
                      width: "100%",
                      margin: "auto",
                    }}
                    className="btnn"
                    type="button"
                    value="Confirmar Estado"
                    onClick={handleEstado}
                  />
                </div>
              ) : (
                ""
              )}

              {venta.data.estado_pedido == "enviado" ? (
                <>
                  <hr style={{ gridColumn: " 1 / 5" }} />
                  <div className="gridProductos guia_contenedor_grid main_pri_productos">
                    {/* AQUI */}
                    <div className="botonoes_guias_generar">
                      <div>
                        <button
                          type="button"
                          className="btnn"
                          style={{ background: "#f00", color: "#fff" }}
                          onClick={handleOpen2}
                        >
                          Crear Guia TCC
                        </button>
                        <Modal
                          width="100%"
                          open={open2}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <div className="modalBox">
                            {ciudadCambioFcs ? (
                              <>
                                {estadoTcc ? (
                                  <div className="rotulo_tcc_guia_generada">
                                    <h1>{tcc.nuRemesa}</h1>
                                    <p>
                                      Descargar:{" "}
                                      <a href={tcc.urlRotulo} target="_blank">
                                        GUIA
                                      </a>
                                    </p>
                                    <p>
                                      Descargar:{" "}
                                      <a
                                        href={tcc.urlRelacionEnvio}
                                        target="_blank"
                                      >
                                        Relacion
                                      </a>
                                    </p>
                                    {/* <p>
                                      #de Remesa: <a>{tcc.urlRemesa}</a>
                                    </p> */}
                                    <p>
                                      Mensaje:{" "}
                                      <a className="mensaje_tcc">
                                        {tcc.mensajeRes}
                                      </a>
                                    </p>
                                  </div>
                                ) : (
                                  <div className="rotulo_no_generado_guia">
                                    <h1>Genera Guia para TCC </h1>
                                    <div className="inico_generar_guia">
                                      <div className="selectt">
                                        <select
                                          name="metodo_Envio"
                                          value={metodo_envio_tcc}
                                          onChange={(e) =>
                                            setMetodo_envio_tcc(e.target.value)
                                          }
                                        >
                                          <option selected value="" disabled>
                                            Selecciona metodo
                                          </option>
                                          <option value="mensajeriaPaga">
                                            Mensajeria - Paga
                                          </option>
                                          <option value="mensajeriaContraEntrega">
                                            Mensajeria - Contraentrega
                                          </option>
                                          <option value="paqueteriaPaga">
                                            Paqueteria - Paga
                                          </option>
                                          <option value="paqueteriaContraEntrega">
                                            Paqueteria - Contraentega
                                          </option>
                                        </select>
                                      </div>
                                      <div>
                                        <input
                                          placeholder="Ingresa observacion"
                                          type="text"
                                          value={observaciontcc}
                                          onChange={(e) =>
                                            setObservacionTcc(e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                    {metodo_envio_tcc == "paqueteriaPaga" ||
                                    metodo_envio_tcc ==
                                      "paqueteriaContraEntrega" ? (
                                      <>
                                        <div className="grid_datos_contraentrega">
                                          <input
                                            type="text"
                                            placeholder="Total KG - Kilos Reales "
                                            value={kilosReales}
                                            onChange={(e) =>
                                              setKilosReales(e.target.value)
                                            }
                                          />
                                          <input
                                            type="text"
                                            placeholder="CM - Largo de paquete CM "
                                            value={largoPaquete}
                                            onChange={(e) =>
                                              setLargoPaquete(e.target.value)
                                            }
                                          />
                                          <input
                                            type="text"
                                            placeholder="CM - Alto de paquete CM"
                                            value={altoPaquete}
                                            onChange={(e) =>
                                              setAltoPaquete(e.target.value)
                                            }
                                          />
                                          <input
                                            type="text"
                                            placeholder="CM - Ancho de paquete CM "
                                            value={anchoPaquete}
                                            onChange={(e) =>
                                              setAnchoPaquete(e.target.value)
                                            }
                                          />
                                          <input
                                            type="text"
                                            placeholder="Peso Volumen KG - Peso Volumen "
                                            value={PesoVolumen}
                                            onChange={(e) =>
                                              setPesoVolumen(e.target.value)
                                            }
                                          />
                                        </div>
                                      </>
                                    ) : null}
                                    <button
                                      type="button"
                                      className="btnn boton_generar_guia_tcc"
                                      onClick={handleGenerarGuiaTcc}
                                    >
                                      Generar Guia Tcc
                                    </button>
                                  </div>
                                )}
                              </>
                            ) : (
                              <>
                                <div className="confirmar_ciudad_guia_div">
                                  <h1>
                                    Confirma Ciudad de envio para Generar Guia
                                  </h1>
                                  <div className="select select_div_confirmar">
                                    <select
                                      name="ciudad_envio"
                                      value={ciudad_envio}
                                      onChange={(e) =>
                                        setCiudad_envio(e.target.value)
                                      }
                                    >
                                      <option selected value="" disabled>
                                        Elige una ciudad
                                      </option>
                                      {dataDane.map((item) => (
                                        <option value={item.codigo}>
                                          {item.ciduad} - {item.departamento}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  {btnprovicional_envio == false ? (
                                    <input
                                      style={{
                                        color: "#fff",
                                        background: "#1f0",
                                        margin: "1rem auto",
                                      }}
                                      type="button"
                                      className="btnn"
                                      value={`Actualizar`}
                                      onClick={handleChange_envio}
                                    />
                                  ) : (
                                    <button
                                      style={{
                                        color: "#fff",
                                        background: "#1f0",
                                        margin: "1rem auto",
                                      }}
                                      type="button"
                                      className="btnn"
                                      data-bs-dismiss="modal"
                                      onClick={handleCerrarEnvio}
                                    >
                                      Cerrar
                                    </button>
                                  )}
                                </div>
                              </>
                            )}
                            <>
                              <div
                                onClick={handleClose2}
                                className="icon_close_modal_guia"
                              >
                                <CloseIcon />
                              </div>
                            </>
                          </div>
                        </Modal>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={handleOpen}
                          className="btnn"
                          style={{ background: "#000", color: "#fff" }}
                        >
                          Crear Guia Bogo <AddBoxRoundedIcon />
                        </button>
                        <Modal
                          width="100%"
                          open={open}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <div
                            className="modalBox"
                            style={{ width: "100%", height: "100%" }}
                          >
                            <>
                              <GuiaBogo venta={venta} />
                              <div
                                onClick={handleClose}
                                className="icon_close_modal_guia"
                              >
                                <CloseIcon />
                              </div>
                            </>
                          </div>
                        </Modal>
                      </div>
                    </div>
                    <div>
                      <>
                        <h2>Datos de envio: </h2>
                        <div className="grid_datos_envio_pri">
                          <div>
                            <input
                              type="text"
                              value={numeroGuia}
                              onChange={(e) => setNumeroGuia(e.target.value)}
                            />
                          </div>
                          <div className="select">
                            <select
                              value={transportadora}
                              onChange={(e) =>
                                setTransportadora(e.target.value)
                              }
                            >
                              <option selected value="" disabled>
                                Transportadora ?
                              </option>
                              <option value="tcc">TCC</option>
                              <option value="bogo">Bogo</option>
                              <option value="interrrapidisimo">
                                Interrrapidisimo
                              </option>
                              <option value="servientrega">Servientrega</option>
                              <option value="Coordinadora">Coordinadora</option>
                              <option value="Envia">Envia</option>
                              <option value="otro">Otro</option>
                            </select>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btnn"
                          style={{
                            margin: "auto",
                            background: "#000",
                            color: "#fff",
                            width: "100%",
                          }}
                          onClick={handleActualizarProducto}
                        >
                          Actualizar
                        </button>
                      </>
                    </div>
                    {/* HASTA AQUI */}
                  </div>{" "}
                  {venta.data.envio_pedido == undefined ? (
                    ""
                  ) : (
                    <div style={{ gridColumn: "2 / 4" }}>
                      <button
                        onClick={terminarPedido}
                        className="btnn"
                        style={{
                          background: "#f00",
                          color: "#fff",
                          width: "100%",
                        }}
                      >
                        Teminar Pedido
                      </button>
                    </div>
                  )}
                </>
              ) : (
                ""
              )}
              <hr style={{ gridColumn: " 1 / 5" }} />

              <div id="mensajesPendientes"></div>
              {/* COMENTARIOS */}
              <div className="mensajesCont__div">
                <a href="#mensajesPendientes">
                  <p className="mensajesCont">
                    Comentarios..{" "}
                    <span>{mensajesCont == "" ? 0 : mensajesCont}</span>
                  </p>
                </a>
              </div>
              <div style={{ gridColumn: " 1 / 5" }}>
                <h1>Comentarios:</h1>
                <input
                  placeholder="Escribe un comentario para gregar"
                  type="text"
                  name="msgg"
                  value={msgg}
                  onChange={(e) => setMsg(e.target.value)}
                />
                <input
                  style={{
                    backgroundColor: "#1f0",
                    color: "#fff",
                    background: "#222d32 !important",
                    margin: "1rem auto",
                    width: "100%",
                  }}
                  className="btnn"
                  value={`Añadir`}
                  type="button"
                  onClick={handleMensaje}
                />

                {ventass == true ? (
                  venta.data.mensajes.map((item) => (
                    <div key={item._id}>
                      <hr />
                      <Card sx={{ minWidth: 300 }}>
                        <CardContent>
                          <Typography sx={{ mb: 1 }} color="text.secondary">
                            Autor: <span>{item.autor} </span>
                          </Typography>
                          <Typography variant="h4" component="div">
                            {item.msgg}
                          </Typography>
                          <Typography
                            sx={{ fontSize: 15 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            {new Date(item.fecha_msg).toLocaleDateString()} a
                            las {new Date(item.fecha_msg).toLocaleTimeString()}
                          </Typography>
                        </CardContent>
                      </Card>
                    </div>
                  ))
                ) : (
                  <p>No hay comentarios"</p>
                )}
              </div>
              <hr style={{ gridColumn: " 1 / 5" }} />
              {/* BUSCADOR DE PRODUCTOS */}
              <div className="gridProductos main_pri_productos">
                {auth.role === "SERVICIO" || auth.role === "ADMIN" ? (
                  <>
                    <label>Agregar otro Producto </label>
                    <input
                      type="search"
                      name="search"
                      placeholder="Buscar Sku"
                      aria-label="Search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                      style={{
                        color: "#fff",
                        display: "flex",
                        justifyContent: "center",
                        margin: " 0 auto 2rem auto",
                      }}
                      className="btnn"
                      onClick={handleSearch}
                    >
                      Buscar
                    </button>
                  </>
                ) : null}
                <label>Productos</label>
                <table style={{ width: "100vh !important" }}>
                  <tr className="tablla-ul-id">
                    <th>IMG</th>
                    <th>Sku</th>
                    {/* <th>plu</th> */}
                    <th>nombre</th>
                    <th>talla</th>
                    <th>CANTIDAD</th>
                    <th>PRECIO FINAL / UNIDADES</th>
                    {estado_pedidoo == "solicitado" ||
                    venta.data.estado_pedido == "solicitado" ||
                    venta.data.estado_pedido == "enviado" ? (
                      <th>Solicitado :</th>
                    ) : (
                      ""
                    )}
                  </tr>
                  {ventass == true
                    ? venta.data.productos.map((item) => (
                        <tr className="tablla-ul-id" key={item._id}>
                          <td>
                            <img
                              width={100}
                              height={100}
                              src={item.img}
                              alt=""
                            />
                          </td>
                          <td>{item.sku}</td>
                          {/* <td>{item.plu}</td> */}
                          <td>{item.nombre}</td>
                          <td>{item.talla}</td>
                          <td>{item.cantidadS}</td>
                          {venta.data.tienda == "Shopify" ? (
                            <td>
                              {"$" +
                                Intl.NumberFormat("es-ES", {
                                  style: "currency",
                                  currency: "COP",
                                  minimumFractionDigits: 0,
                                }).format(
                                  item.precioVenta
                                    ? item.precioVenta
                                    : item.precioVentaConDescuento
                                )}
                            </td>
                          ) : (
                            <td>
                              {item.precioVenta == undefined
                                ? "Solicitar al asesor"
                                : "$" +
                                  Intl.NumberFormat("es-ES", {
                                    style: "currency",
                                    currency: "COP",
                                    minimumFractionDigits: 0,
                                  }).format(item.precioVenta)}
                            </td>
                          )}
                          {estado_pedidoo == "solicitado" ||
                          venta.data.estado_pedido == "solicitado" ||
                          venta.data.estado_pedido == "enviado" ? (
                            <td>{item.solicitadoa}</td>
                          ) : (
                            ""
                          )}
                          <>
                            <td>
                              {auth.role === "SERVICIO" ||
                              auth.role === "ADMIN" ? (
                                <button
                                  style={{
                                    background: "#0f1",
                                    color: "#fff",
                                    padding: "5px",
                                  }}
                                  type="button"
                                  className="btn btn-primary"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModall"
                                  onMouseEnter={(e) => setProducto(item.sku)}
                                  onClick={handleSearchProducto}
                                >
                                  Editar precio
                                </button>
                              ) : null}

                              {productoProvicional == "" ? (
                                ""
                              ) : (
                                <>
                                  {/* <!-- Modal --> */}
                                  <div
                                    style={{ color: "#000" }}
                                    className="modal fade"
                                    id="exampleModall"
                                    tabindex="-1"
                                    aria-labelledby="exampleModalLabel"
                                    aria-hidden="true"
                                  >
                                    <div className="modal-dialog-centered modal-dialog">
                                      <div className="modal-content">
                                        <div className="modal-header flex_modal_custom">
                                          <h1
                                            style={{
                                              fontSize: "2rem",
                                              fontWeight: "bold",
                                            }}
                                            className="modal-title"
                                            id="exampleModalLabel"
                                          >
                                            {productoProvicional.nombre}
                                          </h1>
                                          <p>
                                            {" "}
                                            SKU:{" "}
                                            <strong>
                                              {productoProvicional.sku}
                                            </strong>{" "}
                                          </p>
                                          <div>
                                            <img
                                              width={250}
                                              src={productoProvicional.img}
                                              alt=""
                                            />
                                          </div>
                                        </div>
                                        <div className="modal-body">
                                          <table>
                                            <tr>
                                              <th>Cantidad</th>
                                              <th>precio/unidad</th>
                                              <th>valor final /unidad</th>
                                            </tr>
                                            <tr>
                                              <td>
                                                <input
                                                  placeholder="Ingresa un valor"
                                                  type="number"
                                                  value={
                                                    cantidadS == undefined
                                                      ? ""
                                                      : cantidadS
                                                  }
                                                  onChange={(e) =>
                                                    setCantidad(e.target.value)
                                                  }
                                                />
                                              </td>
                                              <td>
                                                {"$" +
                                                  Intl.NumberFormat("es-ES", {
                                                    style: "currency",
                                                    currency: "COP",
                                                    minimumFractionDigits: 0,
                                                  }).format(
                                                    productoProvicional.precio
                                                      ? productoProvicional.precio
                                                      : productoProvicional.precioVentaShopify
                                                  )}
                                              </td>
                                              <td>
                                                <input
                                                  placeholder="Ingresa un valor"
                                                  type="number"
                                                  value={
                                                    precioVenta == undefined
                                                      ? ""
                                                      : precioVenta
                                                  }
                                                  onChange={(e) =>
                                                    setPrecioVenta(
                                                      e.target.value
                                                    )
                                                  }
                                                />
                                              </td>
                                            </tr>
                                          </table>
                                        </div>
                                        <div className="modal-footer">
                                          {btnprovicional == false ? (
                                            <>
                                              <input
                                                className="btnn"
                                                style={{
                                                  backgroundColor: "#1f0",
                                                  color: "#fff",
                                                  background:
                                                    "#222d32 !important",
                                                  margin: "1rem auto",
                                                }}
                                                type="button"
                                                value={`ACTUALIZAR PRODUCTO`}
                                                onClick={
                                                  handleActualizarProductoo
                                                }
                                              />
                                            </>
                                          ) : (
                                            <>
                                              <button
                                                className="btnn"
                                                style={{
                                                  color: "#fff",
                                                  background: "#f00",
                                                  margin: "1rem auto",
                                                }}
                                                type="button"
                                                data-bs-dismiss="modal"
                                                onClick={handleCerrarr}
                                              >
                                                Cerrar Producto
                                              </button>
                                            </>
                                          )}
                                          {msg && <Alerta alerta={alerta} />}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </td>
                          </>
                          <td>
                            {confirmProducto == true ? (
                              ""
                            ) : (
                              <>
                                {/* <!-- Button trigger modal --> */}
                                <button
                                  style={{
                                    background: "#9af",
                                    color: "#fff",
                                    padding: "5px",
                                  }}
                                  type="button"
                                  className="btn"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                  onMouseEnter={(e) => setProducto(item.sku)}
                                  onClick={handleSearchProducto}
                                >
                                  Editar producto
                                </button>

                                {productoProvicional == "" ? (
                                  ""
                                ) : (
                                  <>
                                    {/* <!-- Modal --> */}
                                    <div
                                      style={{ color: "#000" }}
                                      className="modal fade"
                                      id="exampleModal"
                                      tabindex="-1"
                                      aria-labelledby="exampleModalLabel"
                                      aria-hidden="true"
                                    >
                                      <div className="modal-dialog-centered modal-dialog modal_content_custom">
                                        <div className="modal-content">
                                          <div className="modal-header flex_modal_custom">
                                            <h1
                                              style={{
                                                fontSize: "2rem",
                                                fontWeight: "bold",
                                              }}
                                              className="modal-title"
                                              id="exampleModalLabel"
                                            >
                                              {productoProvicional.nombre}
                                            </h1>
                                            <h3
                                              style={{
                                                fontSize: "1.3rem",
                                              }}
                                            >
                                              SKU:{" "}
                                              <strong>
                                                {productoProvicional.sku}
                                              </strong>
                                            </h3>
                                            <div>
                                              <img
                                                width={200}
                                                src={productoProvicional.img}
                                                alt=""
                                              />
                                            </div>
                                          </div>
                                          <div className="modal-body">
                                            <table>
                                              <tr>
                                                <th>Talla</th>
                                                {venta.data.tienda ==
                                                "Shopify" ? (
                                                  <>
                                                    <th>Precio Comparacion</th>
                                                    <th>precio por unidad</th>
                                                    {/* <th>Precio a descontar</th> */}
                                                  </>
                                                ) : (
                                                  <>
                                                    <th>precio por unidad</th>
                                                  </>
                                                )}
                                                <th>Cantidad</th>
                                                <th>
                                                  precio final / unidades{" "}
                                                </th>
                                                {estado_pedidoo ==
                                                  "solicitado" ||
                                                venta.data.estado_pedido ==
                                                  "solicitado" ||
                                                venta.data.estado_pedido ==
                                                  "enviado" ? (
                                                  <th>Solicitado :</th>
                                                ) : (
                                                  ""
                                                )}
                                              </tr>
                                              <tr>
                                                {venta.data.tienda ==
                                                "Shopify" ? (
                                                  <>
                                                    <td>
                                                      {
                                                        productoProvicional.talla
                                                      }
                                                    </td>
                                                    <td>
                                                      {"$" +
                                                        Intl.NumberFormat(
                                                          "es-ES",
                                                          {
                                                            style: "currency",
                                                            currency: "COP",
                                                            minimumFractionDigits: 0,
                                                          }
                                                        ).format(
                                                          productoProvicional.precioComparacionShopify
                                                        )}
                                                    </td>
                                                    <td>
                                                      {"$" +
                                                        Intl.NumberFormat(
                                                          "es-ES",
                                                          {
                                                            style: "currency",
                                                            currency: "COP",
                                                            minimumFractionDigits: 0,
                                                          }
                                                        ).format(
                                                          productoProvicional.precio
                                                            ? productoProvicional.precio
                                                            : productoProvicional.precioVentaShopify
                                                        )}
                                                    </td>
                                                    {/* <td>
                                                      {"$" +
                                                        Intl.NumberFormat(
                                                          "es-ES",
                                                          {
                                                            style: "currency",
                                                            currency: "COP",
                                                            minimumFractionDigits: 0,
                                                          }
                                                        ).format(
                                                          productoProvicional.porcentajeDescuento
                                                        )}
                                                    </td> */}
                                                    <td>
                                                      {
                                                        productoProvicional.cantidadS
                                                      }
                                                    </td>

                                                    <td>
                                                      {"$" +
                                                        Intl.NumberFormat(
                                                          "es-ES",
                                                          {
                                                            style: "currency",
                                                            currency: "COP",
                                                            minimumFractionDigits: 0,
                                                          }
                                                        ).format(
                                                          productoProvicional.precioVenta
                                                            ? productoProvicional.precioVenta
                                                            : productoProvicional.precioVentaConDescuento
                                                        )}
                                                    </td>
                                                  </>
                                                ) : (
                                                  <>
                                                    <td>
                                                      {
                                                        productoProvicional.talla
                                                      }
                                                    </td>
                                                    <td>
                                                      {"$" +
                                                        Intl.NumberFormat(
                                                          "es-ES",
                                                          {
                                                            style: "currency",
                                                            currency: "COP",
                                                            minimumFractionDigits: 0,
                                                          }
                                                        ).format(
                                                          productoProvicional.precio
                                                        )}
                                                    </td>
                                                    <td>
                                                      {
                                                        productoProvicional.cantidadS
                                                      }
                                                    </td>

                                                    <td>
                                                      {"$" +
                                                        Intl.NumberFormat(
                                                          "es-ES",
                                                          {
                                                            style: "currency",
                                                            currency: "COP",
                                                            minimumFractionDigits: 0,
                                                          }
                                                        ).format(
                                                          productoProvicional.precioVenta
                                                        )}
                                                    </td>
                                                  </>
                                                )}
                                                {estado_pedidoo ==
                                                  "solicitado" ||
                                                venta.data.estado_pedido ==
                                                  "solicitado" ||
                                                venta.data.estado_pedido ==
                                                  "enviado" ? (
                                                  <td className="select">
                                                    <select
                                                      value={
                                                        solicitadooa == ""
                                                          ? productoProvicional.solicitadoa
                                                          : solicitadooa
                                                      }
                                                      onChange={(e) =>
                                                        setSolicitadooa(
                                                          e.target.value
                                                        )
                                                      }
                                                    >
                                                      <option
                                                        selected
                                                        value=""
                                                        disabled
                                                      >
                                                        Selecciona...
                                                      </option>
                                                      <option value="online">
                                                        Tienda Online
                                                      </option>
                                                      <option value="foxplaza">
                                                        Fox Plaza Central
                                                      </option>
                                                      <option value="fox_toberin">
                                                        Fox Toberin
                                                      </option>
                                                      <option value="fox_neiva">
                                                        Fox Neiva
                                                      </option>
                                                      <option value="ame1">
                                                        Americas 1
                                                      </option>
                                                      <option value="ame3">
                                                        Americas 3
                                                      </option>
                                                      <option value="ame5">
                                                        Americas 5
                                                      </option>
                                                      <option value="ame6">
                                                        Americas 6
                                                      </option>
                                                    </select>
                                                  </td>
                                                ) : (
                                                  ""
                                                )}
                                              </tr>
                                            </table>
                                          </div>
                                          <div className="modal-footer">
                                            {btnprovicional == false ? (
                                              <>
                                                <input
                                                  style={{
                                                    backgroundColor: "#1f0",
                                                    color: "#fff",
                                                    background:
                                                      "#222d32 !important",
                                                    margin: "1rem auto",
                                                  }}
                                                  className="btnn"
                                                  type="button"
                                                  value={`ACTUALIZAR PRODUCTO`}
                                                  onClick={
                                                    handleActualizarProducto
                                                  }
                                                />
                                              </>
                                            ) : (
                                              <>
                                                <button
                                                  style={{
                                                    color: "#fff",
                                                    background: "#f00",
                                                    margin: "1rem auto",
                                                  }}
                                                  className="btnn"
                                                  type="button"
                                                  data-bs-dismiss="modal"
                                                  onClick={handleCerrar}
                                                >
                                                  Cerrar Producto
                                                </button>
                                              </>
                                            )}
                                            {msg && <Alerta alerta={alerta} />}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </>
                            )}
                          </td>
                          <td>
                            {auth.role === "SERVICIO" ||
                            auth.role === "ADMIN" ? (
                              <button
                                style={{
                                  background: "#f00",
                                  color: "#fff",
                                  padding: "5px",
                                }}
                                type="button"
                                className="btn"
                                onMouseEnter={(e) => setProducto(item.sku)}
                                onClick={handleBorrarProducto}
                              >
                                Borrar producto
                              </button>
                            ) : null}
                          </td>
                        </tr>
                      ))
                    : ""}
                </table>
              </div>
              {/* Boton enviar
              <input className="btnVenta" type="submit" value="Guardar venta" /> */}
            </form>
          ) : (
            ""
          )}
        </div>
      </main>
    </>
  );
}

export default VentaManualId;
