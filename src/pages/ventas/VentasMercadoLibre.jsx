import axios from "axios";
import { useEffect } from "react";

function VentasMercadoLibre() {

 useEffect(() => {
    handleNotificationMercado();
 }, [])
  const handleNotificationMercado = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/dashboard/ventas-mercadoLibre`);

        console.log(data)
    } catch (error) {
      console.log(error);
    }
  };
  return <div>VentasMercadoLibre</div>;
}

export default VentasMercadoLibre;
