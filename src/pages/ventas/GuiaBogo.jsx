import { useState } from "react";
import "./guiabogo.scss"

function GuiaBogo({venta}) {

 let totall = 0
 const total = venta.data.productos.map((e) => {
    totall = totall +  e.precioVenta
 });
  return (
    <>
      <div className="box_bogo_guia">
        <h1>Fox Racing Colombia</h1>
        <p className="nu_orden_box">
          Orden # {venta.data.nuVenta}
          <br />{" "}
          <span>
            {" "}
            {new Date(Date.now()).toLocaleDateString()} a las{" "}
            {new Date(Date.now()).toLocaleTimeString()}
          </span>
        </p>

        <div className="table_order_box_guia">
          <h2>Datos de Envio:</h2>
          <p>
            Nombre Cliente: <span>{venta.data.cliente.nombre}</span>
          </p>
          <p>
            Cedula o Nit:{" "}
            <span>{venta.data.datos_envio.destinatario_envio}</span>
          </p>
          <p>
            Telefono: <span>{venta.data.datos_envio.telefono_envio}</span>
          </p>
          <p>
            Dirección: <span>{venta.data.datos_envio.direccion_envio}</span>
          </p>
          <p>
            Indicaciones Exactas:{" "}
            <span>{venta.data.datos_envio.indicaciones_envio}</span>
          </p>
          <p>
            Ciudad: <span>{venta.data.datos_envio.ciudad_envio}</span>
          </p>
        </div>
        <div className="table_order_box_guia unidad2">
          <h2>Datos de Compra:</h2>
          <p>
            Medio de pago:{" "}
            <span>
              {venta.data.pago.metodo_pago == "Cash on Delivery (COD)"
                ? "Contra Entrega"
                : venta.data.pago.metodo_pago &&
              venta.data.pago.metodo_pago == "addi stating payment app"
                ? "Credito Addi"
                : venta.data.pago.metodo_pago}
            </span>
          </p>
          <p>
            Estado del pago:{" "}
            <span>
              {venta.data.pago.estado_pago == "pending"
                ? "Pendiente"
                : venta.data.pago.estado_pago == "paid"
                ? "Completado"
                : "Pendiente"}
            </span>
          </p>
          <br />
          <br />
          <br />
          <br />
          <p>
            TOTAL A COBRAR:{" "}
            <span>
              {venta.data.tienda == "Shopify"
                ? venta.data.pago.estado_pago == "pending"
                  ? "$" +
                    Intl.NumberFormat("es-ES", {
                      style: "currency",
                      currency: "COP",
                      minimumFractionDigits: 0,
                    }).format(venta.data.ventaTotalShopify)
                  : 0
                : venta.data.pago.estado_pago == "pendiente"
                ? "$" +
                  Intl.NumberFormat("es-ES", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0,
                  }).format(totall)
                : 0}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default GuiaBogo