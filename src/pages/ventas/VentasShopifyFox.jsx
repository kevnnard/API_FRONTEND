import axios from "axios";
import React, { useEffect, useState } from "react";
import NavVentas from "./NavVentas";

function VentasShopifyFox() {
  const [ventas, setventas] = useState({});
  const [ventass, setVentas] = useState(false);

  useEffect(() => {
  }, []);
  const ontenerventas = async () => {
    try {
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/dashboard/ventas-shopify`;
      const { data } = await axios.get(url);
      setventas({ data });
      setVentas(true);
      console.log(data)
    } catch (error) {
      setVentas(false);
    }
  };

  let i = 0;
  if (ventass) {
    for (i in ventas.data.orders) {
      i++;
    }
  }
  let cont = 1;
  return (
    <>
    <NavVentas />
      <h3 style={{ fontSize: "2rem", padding: "10px 0" }}>
        PEDIDOS totales ={" "}
        <span
          style={{
            color: "#f00",
            padding: "3px",
            borderRadius: "20px",
            fontSize: "2.2rem",
          }}
        >
          {i}
        </span>
      </h3>
      <main className=" md:flex md:justify-center">
        <table>
          <thead>
            <th>#</th>
            <th>Fecha</th>
            <th>venta</th>
            <th>nombre</th>
            <th>ciudad</th>
            <th>correo</th>
            <th>Telefono</th>
            <th>metodo de pago</th>
            <th>Estado del pago</th>
            <th>Estado del pedido</th>
            <th>Total</th>
          </thead>
          {ventass == true
            ? ventas.data.orders.map((item) => (
                <tr key={item.name}>
                  <td>{cont++}</td>
                  <td>
                    {new Date(item.processed_at).toLocaleDateString()} a las{" "}
                    {new Date(item.processed_at).toLocaleTimeString()}
                  </td>
                  <td>{item.name}</td>
                  <td>
                    {item.customer.first_name}, {item.customer.last_name}
                  </td>
                  <td>{item.billing_address.city}</td>
                  <td>
                    {item.email ? (
                      item.email
                    ) : (
                      <div style={{ background: "#f00", padding: "10px 5px" }}>
                        Solicitar al cliente
                      </div>
                    )}
                  </td>
                  <td>{item.billing_address.phone}</td>
                  <td>
                    {item.gateway == "Cash on Delivery (COD)"
                      ? "Pago Contra entrega"
                      : item.gateway &&
                        item.gateway == "addi stating payment app"
                      ? "Addi credito"
                      : item.gateway}
                  </td>
                  <td>
                    {item.financial_status == "pending" ? (
                      <div style={{ background: "#f00", padding: "10px" }}>
                        Pago pendiente
                      </div>
                    ) : (
                      <div style={{ background: "#058105", padding: "10px" }}>
                        Pago exitoso
                      </div>
                    )}
                  </td>
                  <td>
                    {item.fulfillment_status == null ? (
                      <div style={{ background: "#f00", padding: "10px" }}>
                        Pedido No preparado
                      </div>
                    ) : (
                      <div style={{ background: "#058105", padding: "10px" }}>
                        Pedido preparado
                      </div>
                    )}
                  </td>
                  <td>
                    $
                    {item.subtotal_price
                      ? Intl.NumberFormat("es-ES", {
                          style: "currency",
                          currency: "COP",
                          minimumFractionDigits: 0,
                        }).format(item.subtotal_price)
                      : "No hay datos"}
                  </td>
                </tr>
              ))
            : "No hay datos disponibles"}
        </table>
      </main>
    </>
  );
}

export default VentasShopifyFox;