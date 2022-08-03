import "./productos.scss"
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useCSVReader } from "react-papaparse";
import { useEffect, useState } from "react";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import UnarchiveRounded from "@mui/icons-material/UnarchiveRounded";
import Modal from "@mui/material/Modal";
import Alerta from "../../components/Alerta";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

function Productos() {
  //file
   const { CSVReader } = useCSVReader();
   const [productosFile, setProductosFile] = useState([]);
  // auth 
   const { auth } = useAuth();
   const navigate = useNavigate();
  // Modal
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => {
    setOpen2(false);
  };

   const [open3, setOpen3] = useState(false);
   const handleOpen3 = () => setOpen3(true);
   const handleClose3 = () => {
     setOpen3(false);
   };

  //datos para crear producto individual
  const [img, setImg] = useState("");
  const [nombre, setNombre] = useState("");
  const [idVariante, setIdvariante] = useState();
  const [plu, setPlu] = useState("");
  const [sku, setSku] = useState("");
  const [talla, setTalla] = useState("");
  const [cantidad, setCantidad] = useState();
  const [marca, setMarca] = useState("");
  const [categoria, setCategoria] = useState("");
  const [genero, setGenero] = useState("");
  const [articulo, setArticulo] = useState("");
  const [color, setColor] = useState("");
  const [precio, setPrecio] = useState();
  const [precioCosto, setPrecioCosto] = useState();

  const [btnProducto, setbtnProducto] = useState(false);

  // obtener todos los productos
  const [productos, setProductos] = useState({});
  const [productoState, setProductoState] = useState(false);
  const [alerta, setAlerta] = useState({});

  // Buscar Producto por sku



  const [skubusqueda, setSkuBusqueda] = useState("");
  const [nombrebusqueda, setNombreBusqueda] = useState("");
  const [productoProvicional, setProductoProvicional] = useState([]);
  const [productoProvicionalState, setProductoProvicionalState] = useState(false);

  // paginacion de productos 
  const [page, setPage] = useState(1);

  const handlePage = async (event, value) => {
    setPage(value);
    ontenerProductos();
  };
  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setImg("");
    setNombre("");
    setIdvariante();
    setPlu("");
    setSku("");
    setTalla("");
    setCantidad();
    setMarca("");
    setCategoria("");
    setGenero("");
    setArticulo("");
    setColor("");
    setPrecio();
    setPrecioCosto();
    setOpen(false);
    setbtnProducto(false);
  };

  useEffect(() => {
    ontenerProductos();
  }, []);

  const buscarProducto = async () => {
    if ([skubusqueda, nombrebusqueda].includes == "") {
      return setAlerta({msg: "Ingresa el numero de orden o nombre para buscar", error: true})
    }
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/dashboard/producto/sku`,
          {
            skubusqueda,
            nombrebusqueda,
          }
        );
        setProductoState(false);
        setProductos({});
        setProductoProvicional({ data });
        setProductoProvicionalState(true);
        setAlerta({
          msg: data.msg,
          error: data.error,
        });
        setTimeout(() => {
          setAlerta({});
        }, 3000);
      } catch (error) {
        console.log(error);
      }
  };

  const ontenerProductos = async () => {
    setNombreBusqueda("");
    setSkuBusqueda("");
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard/productos`,
        {
          page
        }
      );
      setProductos({ data });
      setProductoState(true);
    } catch (error) {
      console.log(error);
      setProductoState(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        [
          img,
          nombre,
          idVariante,
          plu,
          sku,
          talla,
          cantidad,
          marca,
          categoria,
          genero,
          articulo,
          color,
          precio,
          precioCosto,
        ].includes("")
      ) {
        setAlerta({ msg: "Completa todos los campos", error: true });
        setTimeout(() => {
          setAlerta({});
        }, 5000);
        return;
      } else {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/dashboard/productos/new`,
          {
            img,
            nombre,
            idVariante,
            plu,
            sku,
            talla,
            cantidad,
            marca,
            categoria,
            genero,
            articulo,
            color,
            precio,
            precioCosto,
          }
        );
        setbtnProducto(true);
        if (data) {
          ontenerProductos();
          setImg("");
          setNombre("");
          setIdvariante();
          setPlu("");
          setSku("");
          setTalla("");
          setCantidad();
          setMarca("");
          setCategoria("");
          setGenero("");
          setArticulo("");
          setColor("");
          setPrecio();
          setPrecioCosto();

          setAlerta({ msg: "Producto Creado con exito" });

          setTimeout(() => {
            setAlerta({});
          }, 3000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitFile = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/dashboard/productos/new/file`,
      {productosFile}
    );
     setAlerta({ msg: data.msg });
    setTimeout(() => {
      handleClose2();
      setAlerta({});
      window.location.reload(true);
    }, 3000);
  };

    const handleSubmitFileActualizar = async (e) => {
      e.preventDefault();
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard/productos/put/file`,
        { productosFile , auth }
      );
      setAlerta({ msg: data.msg });
      setTimeout(() => {
        handleClose2();
        setAlerta({});
        window.location.reload(true);
      }, 3000);
    };

  const { msg } = alerta;
  let cont = 0;
  return (
    <>
      {msg && <Alerta alerta={alerta} />}
      <h1 className="tit_pri_productos">Listado de productos</h1>
      <div className="buscar_productos">
        <div>
          <input
            placeholder="Buscar por sku"
            value={skubusqueda}
            onChange={(e) => setSkuBusqueda(e.target.value.trim())}
          />
          <SearchIcon className="icon" onClick={buscarProducto} />
        </div>
        <div>
          <input
            placeholder="Buscar por nombre"
            value={nombrebusqueda}
            onChange={(e) => setNombreBusqueda(e.target.value.trim())}
          />
          <SearchIcon className="icon" onClick={buscarProducto} />
        </div>
        <div>
          {/* <input placeholder="Selecciona marca" />
          <SearchIcon className="icon" /> */}
        </div>
      </div>
      <div className="agregar_productos">
        {auth.role === "ADMIN" ? (
          <button onClick={handleOpen} className="btnn">
            Agregar Producto <AddBoxRoundedIcon />
          </button>
        ) : null}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="modalBox">
            <h1>Agregar Producto nuevo </h1>
            <form action="">
              <input
                type="text"
                placeholder="Url de imagen"
                value={img}
                onChange={(e) => setImg(e.target.value)}
              />
              <input
                type="text"
                placeholder="Nombre del producto"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <input
                type="number"
                placeholder="Id variante de Shopify"
                value={idVariante}
                onChange={(e) => setIdvariante(e.target.value)}
              />
              <input
                type="text"
                placeholder="plu"
                value={plu}
                onChange={(e) => setPlu(e.target.value)}
              />
              <input
                type="text"
                placeholder="sku"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
              <input
                type="text"
                placeholder="talla"
                value={talla}
                onChange={(e) => setTalla(e.target.value)}
              />
              <input
                type="number"
                placeholder="cantidad"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
              />
              <input
                type="text"
                placeholder="Marca"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
              />
              <input
                type="text"
                placeholder="Categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              />
              <input
                type="text"
                placeholder="Genero"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
              />
              <input
                type="text"
                placeholder="Arcticulo"
                value={articulo}
                onChange={(e) => setArticulo(e.target.value)}
              />
              <input
                type="text"
                placeholder="Color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <input
                type="number"
                placeholder="Precio venta "
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
              <input
                type="number"
                placeholder="Precio Costo"
                value={precioCosto}
                onChange={(e) => setPrecioCosto(e.target.value)}
              />

              {btnProducto == false ? (
                <input
                  style={{
                    background: "#1f0",
                    color: "#fff",
                    gridColumn: "2 / 3",
                    margin: "2rem",
                  }}
                  type="button"
                  className="btnn"
                  value="Subir Producto"
                  onClick={handleSubmit}
                />
              ) : (
                <input
                  onClick={handleClose}
                  style={{
                    color: "#fff",
                    background: "#f00",
                    gridColumn: "2 / 3",
                    margin: "2rem",
                  }}
                  type="button"
                  className="btnn"
                  value="Cerrar"
                />
              )}
            </form>
          </div>
        </Modal>
        <button className="btnn" onClick={ontenerProductos}>
          Ver todos los productos <UnarchiveRounded />
        </button>
        {auth.role === "ADMIN" ? (
          <button className="btnn" onClick={handleOpen2}>
            Crear Productos <UnarchiveRounded />
          </button>
        ) : null}
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="modalBoxxx">
            <h1>Agregar Archivo de productos</h1>
            <CSVReader
              onUploadAccepted={(results) => {
                setProductosFile([]);
                setProductosFile(results);
              }}
            >
              {({
                getRootProps,
                acceptedFile,
                ProgressBar,
                getRemoveFileProps,
              }) => (
                <>
                  <div className="modal_box_producto_file">
                    {acceptedFile ? (
                      <button
                        style={{ backgroundColor: "#f00" }}
                        className="btnn"
                        {...getRemoveFileProps()}
                      >
                        Borrar Archivo
                      </button>
                    ) : (
                      <button
                        style={{ background: "#000" }}
                        className="btnn"
                        type="button"
                        {...getRootProps()}
                      >
                        Subir Archivo
                      </button>
                    )}
                    <div className="nombre_archivo_csv">
                      {acceptedFile && acceptedFile.name}
                    </div>
                    <ProgressBar />
                    <br />
                    <br />
                    {acceptedFile ? (
                      <button className="btnn" onClick={handleSubmitFile}>
                        Subir Archivo al api <UnarchiveRounded />
                      </button>
                    ) : null}
                  </div>
                </>
              )}
            </CSVReader>
          </div>
        </Modal>
        {auth.role === "ADMIN" ? (
          <button className="btnn" onClick={handleOpen3}>
            Actualizar productos <UnarchiveRounded />
          </button>
        ) : null}
        <Modal
          open={open3}
          onClose={handleClose3}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="modalBoxxx">
            <h1>Actualizar productos</h1>
            <CSVReader
              onUploadAccepted={(results) => {
                setProductosFile([]);
                setProductosFile(results);
              }}
            >
              {({
                getRootProps,
                acceptedFile,
                ProgressBar,
                getRemoveFileProps,
              }) => (
                <>
                  <div className="modal_box_producto_file">
                    {acceptedFile ? (
                      <button
                        style={{ backgroundColor: "#f00" }}
                        className="btnn"
                        {...getRemoveFileProps()}
                      >
                        Borrar Archivo
                      </button>
                    ) : (
                      <button
                        style={{ background: "#000" }}
                        className="btnn"
                        type="button"
                        {...getRootProps()}
                      >
                        Subir Archivo
                      </button>
                    )}
                    <div className="nombre_archivo_csv">
                      {acceptedFile && acceptedFile.name}
                    </div>
                    <ProgressBar />
                    <br />
                    <br />
                    {acceptedFile ? (
                      <button
                        className="btnn"
                        onClick={handleSubmitFileActualizar}
                      >
                        Subir Archivo al api <UnarchiveRounded />
                      </button>
                    ) : null}
                  </div>
                </>
              )}
            </CSVReader>
          </div>
        </Modal>
      </div>
      <main className="main_pri_productos">
        {productoState == true ? (
          <div className="paginate_productos">
            <Stack spacing={1}>
              <Pagination
                count={productos.data.totalPages}
                variant="outlined"
                page={productos.data.page}
                color="secondary"
                onChange={handlePage}
              />
            </Stack>
          </div>
        ) : (
          ""
        )}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>imagen</th>
              <th>nombre</th>
              <th>Sku</th>
              <th>Talla</th>
              <th>Cantidad</th>
              <th>Marca</th>
              <th>Categoria</th>
              <th>genero</th>
              <th>Articulo</th>
              <th>Precio</th>
            </tr>
          </thead>
          {productoState
            ? productos.data.docs.map((item) => (
                <tbody>
                  <tr
                    className={item.cantidad <= 10 ? "pexistencias" : ""}
                    key={item._id}
                  >
                    <td>{(cont += 1)}</td>
                    <td>
                      <img width={50} src={item.img} />
                    </td>
                    <td>{item.nombre}</td>
                    <td>{item.sku}</td>
                    <td>{item.talla}</td>
                    <td>{item.cantidad}</td>
                    <td>{item.marca}</td>
                    <td>{item.categoria}</td>
                    <td>{item.genero}</td>
                    <td>{item.articulo}</td>
                    <td>
                      {"$" +
                        Intl.NumberFormat("es-ES", {
                          style: "currency",
                          currency: "COP",
                          minimumFractionDigits: 0,
                        }).format(item.precio)}
                    </td>
                  </tr>
                </tbody>
              ))
            : null}
          {productoProvicionalState ? (
            <tbody>
              <tr
                className={
                  productoProvicional.data.cantidad <= 10 ? "pexistencias" : ""
                }
              >
                <td>{(cont += 1)}</td>
                <td>
                  <img width={50} src={productoProvicional.data.img} />
                </td>
                <td>{productoProvicional.data.nombre}</td>
                <td>{productoProvicional.data.idvariante}</td>
                <td>{productoProvicional.data.plu}</td>
                <td>{productoProvicional.data.sku}</td>
                <td>{productoProvicional.data.talla}</td>
                <td>{productoProvicional.data.cantidad}</td>
                <td>{productoProvicional.data.marca}</td>
                <td>{productoProvicional.data.categoria}</td>
                <td>{productoProvicional.data.genero}</td>
                <td>{productoProvicional.data.articulo}</td>
                <td>{productoProvicional.data.color}</td>
                <td>
                  {"$" +
                    Intl.NumberFormat("es-ES", {
                      style: "currency",
                      currency: "COP",
                      minimumFractionDigits: 0,
                    }).format(productoProvicional.data.precio)}
                </td>
              </tr>
            </tbody>
          ) : (
            ""
          )}
        </table>
        {productoState == true ? (
          <div className="paginate_productos">
            <Stack spacing={1}>
              <Pagination
                count={productos.data.totalPages}
                variant="outlined"
                page={productos.data.page}
                color="secondary"
                onChange={handlePage}
                hideNextButton
              />
            </Stack>
          </div>
        ) : (
          ""
        )}
      </main>
    </>
  );
}

export default Productos;