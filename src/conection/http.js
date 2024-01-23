/*
  Este archivo define una instancia de Axios con una URL base y encabezados predeterminados.
*/
import axios from 'axios';

/*
  Crea y exporta una instancia de Axios con configuraciones predeterminadas.
  - baseURL: URL base para las solicitudes
  - headers: Encabezado Content-Type predeterminado para las solicitudes
  - baseURL: E dejado definido la base URL para la web(producción) que definí en mi hosting personal y la local al desplegar el server local
*/
export default axios.create({
    //baseURL:"https://apiusers.manueldev.online/api",
    baseURL:"http://localhost:8000/api",
    headers:{
        "Content-type":"application/json"
    }
})