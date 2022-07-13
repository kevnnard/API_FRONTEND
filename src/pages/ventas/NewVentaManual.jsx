import axios from "axios";
import {  useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import Alerta from "../../components/Alerta";
import NavVentas from "./NavVentas";
import "./newVenta.scss";
import dataDane from "./json/ciudades.json";
import dataDane2 from "./json/departamentos.json"; 
import Modal from "@mui/material/Modal";
import io from "socket.io-client";


function NewVentaManual() {
  //Modal 
  const[open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false)
    setPedidoNuRes("");
    navigate("/dashboard/ventas-manuales/generales");
  };
  const [pedidoNuRes, setPedidoNuRes] = useState("");
  //
  //datos cliente
  const [cedula, setCedula] = useState();
  const [nombre, setNombre] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  //datos venta sac 
  const [tienda, setTienda] = useState("");
  const [productos, setProductos] = useState([]);
  const [cantidadS, setCantidad] = useState();
  const [precioVenta, setPrecioVenta] = useState();

  //datos envio destinatario por si usan ptra direccion
  const [destinatario_envio, setDestinatario_envio] = useState("");
  const [telefono_envio, setTelefono_envio] = useState("");
  const [ciudad_envio, setCiudad_envio] = useState("");
  const [departamento_envio, setDepartamento_envio] = useState("");
  const [direccion_envio, setDireccion_envio] = useState("");
  const [indicaciones_envio, setIndicaciones_envio] = useState("");

  //actualizar cantidad y precio venta * producto
  const [producto, setProducto] = useState("");
  const [productoProvicional, setProductoProvicional] = useState({});
  const [btnprovicional, setBtnProvicional] = useState(false)

  // datos de pago 
  const [metodo_pago, setMetodo_pago] = useState("");
  const [referencia_pago, setReferencia_pago] = useState("");
  const [estado_pago, setEstado_pago] = useState("");

  // COMENTARIOS
  const [msgg, setMsg] = useState("");
  
  //datos busqueda producto
  const [search, setSearch] = useState();
  const [productoState, setProductoState] = useState(false);

  const [alerta, setAlerta] = useState({});

   const navigate = useNavigate();
   const params = useParams();
   const { id } = params;

   const handleSearchProducto = async (e) => {
     e.preventDefault();
     const result = productos.find((productoS) => productoS.sku == producto);
     setProductoProvicional(result);
   };

   const handleClienteSearch = async (e) => {
    e.preventDefault();
    if(e.key === "Enter") {
      const { data } = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/dashboard/ventas-manuales/cliente`,
        { cedula }
      );
      if(data.error == true) {
        setAlerta({msg: data.msg, error: data.error})
        setNombre("");
        setDepartamento("");
        setCiudad("");
        setDireccion("");
        setEmail("");
        setTelefono("");
      } else {
        setAlerta({});
        setNombre(data.nombre);
        setDepartamento(data.departamento);
        setCiudad(data.ciudad);
        setDireccion(data.direccion);
        setEmail(data.email);
        setTelefono(data.telefono);
      }
    }
   };

   const handleActualizarProducto = async (e) => {
     e.preventDefault();
     if(!cantidadS == "") {
       const search = productoProvicional.sku;
       const cantidadP = productoProvicional.cantidadS;
       const cantidada = cantidadS;
       const { data } = await axios.put(
           `${
             import.meta.env.VITE_BACKEND_URL
           }/dashboard/buscar/producto/put/cantidad/${id}`,
           { search, cantidada, cantidadP }
         );
         if(data.error == true) {
           setAlerta({
             msg: data.msg,
             error: data.error
           });
           setTimeout(() => {
             setAlerta({});
           }, 7000);
          return 
         }
         else {
           productoProvicional.cantidadS = parseInt(cantidadS); 
         }
     }
    if(!precioVenta == ""){
       productoProvicional.precioVenta = parseInt(precioVenta);
    }
     setAlerta({
      msg: "Producto Actualizado..."
     });
     setProducto("");
     setCantidad();
     setPrecioVenta();
     setBtnProvicional(true)
     
     setTimeout(() => {
       setAlerta({});
     }, 3000);
   };
   
    const handleCerrar = async (e) => {
      e.preventDefault();
      setProductoProvicional({});
      setBtnProvicional(false);
      setCantidad();
      setPrecioVenta();
    };

   const handleSearch = async (e) => {
     e.preventDefault();
     if(productos == ""){
       try {
         const { data } = await axios.post(
           `${import.meta.env.VITE_BACKEND_URL}/dashboard/buscar/producto`,
           { search }
         );
         if(data.error) {
           setAlerta({
            msg: data.msg,
            error: true
           });
           setTimeout(() => {
            setAlerta({});
           }, 3000);
         } else {
           setProductos([data]);
           setSearch("");
           setProductoState(true);
         }

       } catch (error) {
         console.log(error);
         setProductoState(false);
       }
      } else {
       try {
         const data2 = await axios.post(
           `${import.meta.env.VITE_BACKEND_URL}/dashboard/buscar/producto`,
           { search }
         );
         const result = productos.find((item) => item.sku == search);
        if (data2.data.error) {
          setAlerta({
            msg: data2.data.msg,
            error: data2.data.error,
          });
          setTimeout(() => {
            setAlerta({});
          }, 3000);
        } 
        if (result == undefined ) {
         if(data2.data.error == true) {
           setAlerta({
             msg: data2.data.msg,
             error: data2.data.error
           });
         } else {
            productos.push(data2.data);
            setSearch("");
            setProductoState(true);
            setAlerta({
              msg: "Producto agregado con exito",
            });
            setTimeout(() => {
              setAlerta({});
            }, 3000);
         }
        }
        if (data2.data.sku === result.sku) {
          setAlerta({
            msg: "el Producto ya esta Agregado",
            error: true,
          });
          setTimeout(() => {
            setAlerta({});
          }, 3000);
          return
        } 
       } catch (error) {
         console.log(error)
       }
      }
   };
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (
      [
        cedula,
        nombre,
        departamento,
        ciudad,
        direccion,
        email,
        telefono,
        tienda,
        destinatario_envio,
        telefono_envio,
        ciudad_envio,
        departamento_envio,
        direccion_envio,
        indicaciones_envio,
        metodo_pago,
        referencia_pago,
        estado_pago,
        msgg,
        cantidadS,
        precioVenta
      ].includes("")
    ) {
      setAlerta({
        msg: "Rellena Todos los campos",
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
       if (tienda.length == 0) {
         setAlerta({
           msg: "Elige una tienda para la venta",
           error: true,
         });
         return;
       }
      if (cedula.length <= 7) {
        setAlerta({
          msg: "Las cedula o nit es muy corta almenos de 8 caracteres",
          error: true,
        });
        return;
      }
      if (cedula.length >= 12) {
        setAlerta({
          msg: "Las cedula o nit es muy larga maximo de 11 caracteres",
          error: true,
        });
        return;
      }
      if (nombre.length == 0) {
        setAlerta({
          msg: "Ingresa el nombre Completo",
          error: true,
        });
        return;
      }
      if (departamento.length == 0) {
        setAlerta({
          msg: "Ingresa el departamento del cliente",
          error: true,
        });
      }
      if (ciudad.length == 0) {
        setAlerta({
          msg: "Ingresa la ciudad del cliente",
          error: true,
        });
        return;
      } 
      if (direccion.length <= 6) {
        setAlerta({
          msg: "Ingresa una direccion del cliente valida",
          error: true,
        });
        return;
      } 
      if (email.length <= 6) {
        setAlerta({
          msg: "Ingresa un Correo Elictronico del cliente valido",
          error: true,
        });
        return;
      }
      if (telefono.length <= 6) {
        setAlerta({
          msg: "Ingresa un Telefono del cliente valido",
          error: true,
        });
        return;
      }
       if (destinatario_envio.length <= 7) {
         setAlerta({
           msg: "Las cedula o nit del destinatario es muy corta almenos de 8 caracteres",
           error: true,
         });
         return;
       }
       if (destinatario_envio.length >= 12) {
         setAlerta({
           msg: "Las cedula o nit del destinatario es muy larga maximo de 11 caracteres",
           error: true,
         });
         return;
       }
        if (telefono_envio.length <= 6) {
          setAlerta({
            msg: "Ingresa un Telefono del destinatario valido",
            error: true,
          });
          return;
        } 
         if (departamento_envio.length == 0) {
           setAlerta({
             msg: "Ingresa el departamento del destinatario",
             error: true,
           });
         }
         if (ciudad_envio.length == 0) {
           setAlerta({
             msg: "Ingresa la ciudad del destinatario",
             error: true,
           });
           return;
         } 
          if (direccion_envio.length <= 6) {
            setAlerta({
              msg: "Ingresa una direccion del destinatario valida",
              error: true,
            });
            return;
          }
           if (indicaciones_envio.length <= 3) {
             setAlerta({
               msg: "Ingresa Indicaciones para el envio",
               error: true,
             });
             return;
           }
           if (metodo_pago.length == 0) {
             setAlerta({
               msg: "Seleccione un metodo de pago ",
               error: true,
             });
             return;
           }
            if (referencia_pago.length == 0) {
              setAlerta({
                msg: "Ingrese una referencia de Pago ",
                error: true,
              });
              return;
            }
            if (estado_pago.length == 0) {
              setAlerta({
                msg: "Seleccione el estado del pago",
                error: true,
              });
              return;
            }
            if (productos.length == []) {
              setAlerta({
                msg: "Ingrese Productos para generar una venta",
                error: true,
              });
              return;
            }
            if (cantidadS.length == 0) {
              setAlerta({
                msg: "Ingrese una cantidad para el producto",
                error: true,
              });
              return;
            } 
            if (precioVenta.length == 0) {
              setAlerta({
                msg: "Ingrese un valor de venta al producto ",
                error: true,
              });
              return;
            }
    }
    try {
      const { data } = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/dashboard/ventas-manuales/new/${id}`,
        {
          cedula,
          nombre,
          departamento,
          ciudad,
          direccion,
          email,
          telefono,
          tienda,
          productos,
          metodo_pago,
          referencia_pago,
          estado_pago,
          msgg,
          destinatario_envio,
          telefono_envio,
          ciudad_envio,
          departamento_envio,
          direccion_envio,
          indicaciones_envio,
          cantidadS,
          precioVenta,
        }
      );
      if (data) {
        setOpen(true);
        setPedidoNuRes(data.venta);
        setProductoState(false);
        setNombre("");
        setCedula("");
        setDepartamento("");
        setCiudad("");
        setEmail("");
        setTelefono("");
        setTienda("");
        setDestinatario_envio("");
        setTelefono_envio("");
        setCiudad_envio("");
        setDepartamento_envio("");
        setDireccion_envio("");
        setIndicaciones_envio("");
        setSearch("");
        setProductos([]);
        setCantidad();
        setPrecioVenta();
        setMetodo_pago("");
        setReferencia_pago("");
        setEstado_pago("");
        setMsg("");
        setAlerta({
          msg: `Venta Sac creada con exito`,
        });
        setTimeout(() => {
          setAlerta({});
        }, 5000);
      }
    } catch (error) {
      setAlerta({
        msg: "El cliente ya existe",
        error: true,
      });
    }
    setProductos([]);
    
  };

 
  const { msg } = alerta;
  return (
    <>
      <NavVentas />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal_nuPeido_neventa">
          {pedidoNuRes ? (
            <h1>
              Pedido: <span>{pedidoNuRes}</span>
            </h1>
          ) : null}
        </div>
      </Modal>
      <h2 style={{ fontSize: "3rem", padding: "2rem", textAlign: "center" }}>
        Nuevo pedido <strong style={{ color: "#f00" }}>{`#SAC`}</strong>
      </h2>
      <div className="container">
        {msg && <Alerta alerta={alerta} />}
        <form className="formularioNewVenta" onSubmit={handlesubmit}>
          <div className="select">
            <select
              name="tienda"
              id="tienda standard-select"
              value={tienda}
              onChange={(e) => setTienda(e.target.value)}
            >
              <option selected value="" disabled>
                Selecciona una Tienda
              </option>
              <option value="FOX">FOX</option>
              <option value="REPLAYS">Replays</option>
              <option value="OTRA">Otra Tienda</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              name="cedula"
              value={cedula}
              placeholder="# Cedula o Nit - ENTER PARA BUSCAR"
              onChange={(e) => setCedula(e.target.value)}
              onKeyUp={handleClienteSearch}
            />
          </div>
          <div>
            <input
              type="text"
              name="nombre"
              value={nombre}
              placeholder="Nombre Completo"
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="select">
            <select
              name="departamento"
              id="departamento standard-select"
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
            >
              <option selected value="" disabled>
                Selecciona el departamento
              </option>
              {dataDane2.map((item) => (
                <option value={item.departamento}>{item.departamento}</option>
              ))}
            </select>
          </div>
          <div className="select">
            <select
              name="departamento"
              id="departamento standard-select"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
            >
              <option selected value="" disabled>
                Selecciona la ciudad
              </option>
              {dataDane.map((item) =>
                departamento == item.departamento.toUpperCase() ? (
                  <option value={item.ciduad}>{item.ciduad}</option>
                ) : null
              )}
            </select>
          </div>
          <div>
            <input
              type="text"
              name="direccion"
              placeholder="Direccion del cliente"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Correo del cliente"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              name="telefono"
              placeholder="# Telefono del cliente"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>
          <hr style={{ gridColumn: " 1 / 5" }} />
          {/* DATOS DE ENVIO DE VENTA */}
          <div>
            <input
              type="text"
              name="destinatario_envio"
              value={destinatario_envio}
              placeholder="# identificacion de cliente "
              onChange={(e) => setDestinatario_envio(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              name="telefono_envio"
              placeholder="# Telefono del cliente de envio"
              value={telefono_envio}
              onChange={(e) => setTelefono_envio(e.target.value)}
            />
          </div>
          <div className="select">
            <select
              name="departamento_envio"
              id="standard-select"
              value={departamento_envio}
              onChange={(e) => setDepartamento_envio(e.target.value)}
            >
              <option selected value="" disabled>
                Elige el departamento destino
              </option>
              {dataDane2.map((item) => (
                <option value={item.departamento}>{item.departamento}</option>
              ))}
            </select>
          </div>
          <div className="select">
            <select
              name="ciudad_envio"
              id="standard-select"
              value={ciudad_envio}
              onChange={(e) => setCiudad_envio(e.target.value)}
            >
              <option selected value="" disabled>
                Elige una ciudad destino
              </option>
              {dataDane.map((item) =>
                departamento_envio == item.departamento.toUpperCase() ? (
                  <option value={item.ciduad}>{item.ciduad}</option>
                ) : null
              )}
            </select>
          </div>
          <div>
            <input
              type="text"
              name="direccion_envio"
              placeholder="Direccion de envio"
              value={direccion_envio}
              onChange={(e) => setDireccion_envio(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              name="indicaciones_envio"
              placeholder="Inidicaciones de envio"
              value={indicaciones_envio}
              onChange={(e) => setIndicaciones_envio(e.target.value)}
            />
          </div>

          <hr style={{ gridColumn: " 1 / 5" }} />
          {/* REFERENCIA Y METODO DE PAGO  */}
          <div className="select" style={{ gridColumn: " 1 / 2" }}>
            <select
              name="metodo_pago"
              value={metodo_pago}
              id="standard-select"
              onChange={(e) => setMetodo_pago(e.target.value)}
            >
              <option selected value="" disabled>
                Metodo de pago
              </option>
              <option value="contra_entrega"> Contra Entrega</option>
              <option value="mercado_pago">Mercado Pago</option>
              <option value="addi">Addi</option>
              <option value="sistecredito">Sistecredito</option>
              <option value="pay_u">Pay U</option>
              <option value="Consignacion">Consignacion</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              name="referencia_pago"
              placeholder="Refencia de pago"
              value={referencia_pago}
              onChange={(e) => setReferencia_pago(e.target.value)}
            />
          </div>
          <div className="select">
            <select
              name="estado_pago"
              id="standard-select"
              value={estado_pago}
              onChange={(e) => setEstado_pago(e.target.value)}
            >
              <option selected value="" disabled>
                Estado del Pago
              </option>
              <option value="completado">Completado</option>
              <option value="pendiente">Pendiente</option>
            </select>
          </div>
          <hr style={{ gridColumn: " 1 / 5" }} />
          {/* ESTADO DEL PEDIDO  */}
          <div className="select" style={{ gridColumn: " 1 / 3" }}>
            <select id="standard-select">
              <option selected value="" disabled>
                Pendiente{" "}
              </option>
            </select>
          </div>
          <hr style={{ gridColumn: " 1 / 5" }} />
          {/* BUSCADOR DE PRODUCTOS */}
          <div className="gridProductos main_pri_productos">
            <input
              type="search"
              name="search"
              placeholder="Buscar por Sku"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              style={{
                color: "#fff",
                display: "flex",
                justifyContent: "center",
                margin: " 0 auto 1rem auto",
              }}
              className="btnn"
              onClick={handleSearch}
            >
              Buscar
            </button>
            <table>
              <tr>
                <th>IMG</th>
                <th>Sku</th>
                {/* <th>plu</th> */}
                <th>nombre</th>
                <th>color</th>
                <th>talla</th>
                <th>CANTIDAD</th>
                <th>precio por unidad</th>
                <th>p Valor final por unidad </th>
                <th>Accion</th>
              </tr>
              {productoState == true
                ? productos.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <img
                          width={100}
                          height={100}
                          src={productos ? item.img : ""}
                          alt=""
                        />
                      </td>
                      <td>{item.sku}</td>
                      {/* <td>{item.plu}</td> */}
                      <td>{item.nombre}</td>
                      <td>{item.color}</td>
                      <td>{item.talla}</td>
                      <td>
                        {item.cantidadS == null ? (
                          "Cambia la cantidad"
                        ) : (
                          <>{item.cantidadS}</>
                        )}
                      </td>
                      <td>
                        {"$" +
                          Intl.NumberFormat("es-ES", {
                            style: "currency",
                            currency: "COP",
                            minimumFractionDigits: 0,
                          }).format(item.precio)}
                      </td>
                      <td>
                        {item.precioVenta == null ? (
                          <p>Aun no tiene descuento</p>
                        ) : (
                          <>
                            {" "}
                            {"$" +
                              Intl.NumberFormat("es-ES", {
                                style: "currency",
                                currency: "COP",
                                minimumFractionDigits: 0,
                              }).format(item.precioVenta)}
                          </>
                        )}
                      </td>
                      <td>
                        <button
                          style={{
                            background: "#9af",
                            color: "#fff",
                            padding: "5px",
                          }}
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onMouseEnter={(e) => setProducto(item.sku)}
                          onClick={handleSearchProducto}
                        >
                          Editar
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
                              <div className="modal-dialog-centered modal-dialog">
                                <div className="modal-content">
                                  <div className="modal-header flex_modal_custom">
                                    <h5
                                      style={{ fontSize: "2.5rem" }}
                                      className="modal-title"
                                      id="exampleModalLabel"
                                    >
                                      {productoProvicional.nombre}
                                    </h5>
                                    <p style={{ fontSize: "1.5rem" }}>
                                      SKU:
                                      <strong>
                                        {productoProvicional.sku}
                                      </strong>{" "}
                                    </p>
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
                                        <th>Cantidad</th>
                                        <th>precio/unidad</th>
                                        <th>Valor venta / unidad</th>
                                      </tr>
                                      <tr>
                                        <td>
                                          <input
                                            type="number"
                                            placeholder="Indica una cantidad"
                                            value={
                                              cantidadS === undefined
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
                                            )}
                                        </td>
                                        <td>
                                          <input
                                            type="number"
                                            placeholder="Indica el valor final / unidad"
                                            value={
                                              precioVenta === undefined
                                                ? ""
                                                : precioVenta
                                            }
                                            onChange={(e) =>
                                              setPrecioVenta(e.target.value)
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
                                          style={{
                                            background: "#1f0",
                                            margin: "1rem auto",
                                            color: "#fff",
                                          }}
                                          className="btnn"
                                          type="button"
                                          value={`ACTUALIZAR PRODUCTO`}
                                          onClick={handleActualizarProducto}
                                        />
                                      </>
                                    ) : (
                                      <>
                                        <button
                                          style={{
                                            margin: "1rem auto",
                                            color: "#fff",
                                            background: "#f00",
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
                      </td>
                    </tr>
                  ))
                : ""}
            </table>
          </div>
          <hr style={{ gridColumn: " 1 / 5" }} />
          {/* COMENTARIOS */}
          <div style={{ gridColumn: " 1 / 3" }}>
            <input
              type="text"
              name="msgg"
              placeholder="Añade un mensaje para el pedido"
              value={msgg}
              onChange={(e) => setMsg(e.target.value)}
            />
          </div>
          {/* Boton enviar */}
          <input
            style={{
              color: "#fff",
              background: "#222d32",
              display: "flex",
              justifyContent: "center",
              margin: " 0 auto 1rem auto",
            }}
            className="btnn"
            type="submit"
            value="Guardar venta"
          />
        </form>
      </div>
    </>
  );
}

export default NewVentaManual;
