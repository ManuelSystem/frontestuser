import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

//API Conection
import http from '../conection/http'


export default function Edit(props) {
    const navigate = useNavigate();
    const [inputs,setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const {id} = useParams();

    useEffect(()=>{
        fetchUser()
    },[]);

     // toast para validación de form
     const successForm = () => {
        toast.success("Usuario Actualizado Correctamente !", {
            position: "top-right",
          });
    };

    const errorForm = () => {
        toast.error("Ocurrió un error!", {
            position: "top-right",
          });
    };

    //endpoint para obtener usuario por id
    const fetchUser= () =>{
        http.get('/users/'+id+'/edit').then((res)=>{
            //console.log(res);
            setInputs({
                name:res.data.name,
                email:res.data.email,
            });
        });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values,[name]:value}))
    }

    //endpoint para actualizar datos del usuario
    const submitForm = () =>{
        http.put('/users/'+id,inputs).then((res)=>{
            successForm();
            setTimeout(() => {
                navigate("/");
            }, 1000); // Esperar 1 segundo antes de redirigir
        }).catch((error) => {
            if (error.response && error.response.status === 422) {
                // Manejar los errores de validación del servidor
                setErrors(error.response.data.errors);
                errorForm();
              } else {
                // Otros tipos de errores
                errorForm();
              }
          });
    }
    return (
        <div>
            <h2>Editar Usuario</h2>
            <div className="row">
                <div className="col-sm-6">
                    <div className="card p-4">
                        <label>Nombres</label>
                        <input type="text" name="name" className="form-control mb-2"
                                value={inputs.name || ''}
                                onChange={handleChange}
                             />

                        <label>Correo Electrónico</label>
                        <input type="email" name="email" className="form-control mb-2"
                            value={inputs.email || ''}
                            onChange={handleChange}
                        />

                        <button type="button" onClick={submitForm} className="btn btn-info mt-2">Update</button>
                        {/* component para mostrar contenido de toast */}
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </div>

    )
}