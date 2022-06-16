import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";

const List = () => {
  const [ventas, setventas] = useState({});
  const [ventass, setVentas] = useState(false);

  useEffect(() => {
    ontenerventas();
  }, []);
  const ontenerventas = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/dashboard`;
      const { data } = await axios.get(url);
      setventas({ data });
      setVentas(true);
    } catch (error) {
      setVentas(false);
    }
  };
  let cont = 1;
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">#</TableCell>
            <TableCell className="tableCell">Venta id</TableCell>
            <TableCell className="tableCell">Producto</TableCell>
            <TableCell className="tableCell">Comprador</TableCell>
            <TableCell className="tableCell">Fecha</TableCell>
            <TableCell className="tableCell">Total</TableCell>
            <TableCell className="tableCell">Metodo de pago</TableCell>
            <TableCell className="tableCell">Estado del pago</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ventass == true
            ? ventas.data.orders.map((row) => (
                <TableRow key={row.name}>
                  <TableCell className="tableCell">{cont++}</TableCell>
                  <TableCell className="tableCell">{row.name}</TableCell>
                  <TableCell className="tableCell">
                    <div className="cellWrapper">
                      {/* <img src={row.line_items} alt="" className="image" /> */}
                      {ventass == true && row.line_items.lenght >= 2
                        ? row.line_items.map((row2) => {
                            <p>- {row2.title}</p>;
                          })
                        : row.line_items[0].title}
                    </div>
                  </TableCell>
                  <TableCell className="tableCell">
                    {row.customer.first_name}, {row.customer.last_name}
                  </TableCell>
                  <TableCell className="tableCell">
                    {new Date(row.processed_at).toLocaleDateString()} a las{" "}
                    {new Date(row.processed_at).toLocaleTimeString()}
                  </TableCell>
                  <TableCell className="tableCell">
                    ${""}
                    {row.current_total_price}
                  </TableCell>
                  <TableCell className="tableCell">{row.gateway}</TableCell>
                  <TableCell className="tableCell">
                    {row.financial_status == "pending" ? (
                      <div style={{ background: "#f00", padding: "10px" }}>
                        Pago pendiente
                      </div>
                    ) : (
                      <div style={{ background: "#058105", padding: "10px" }}>
                        Pago exitoso
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            : "No hay datos disponibles"}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
