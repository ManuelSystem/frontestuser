import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

//API Conection
import http from '../conection/http'

export default function Create() {
    const navigate = useNavigate();
    const [inputs,setInputs] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values,[name]:value}))
    }

    // toast para validación de form
    const successForm = () => {
        toast.success("Usuario Creado Correctamente !", {
            position: "top-right",
          });
    };

    const errorForm = () => {
        toast.error("Ocurrió un error!", {
            position: "top-right",
          });
    };

    //endpoint para guardar usuario
    const submitForm = () =>{
        http.post('/users',inputs).then((res)=>{
            //console.log(res);
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
            <div className="row">
                <div className="col-md-12 mt-3">
                    <h2 className="text-center">Usuario Nuevo</h2>
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <div className="card p-4">
                                <label>Nombres</label>
                                <input type="text" name="name" className="form-control mb-2"
                                        value={inputs.name || ''}
                                        onChange={handleChange}
                                />
                                {errors.name && <span className="text-danger">{errors.name[0]}</span>}

                                <label>Correo Electrónico</label>
                                <input type="email" name="email" className="form-control mb-2"
                                    value={inputs.email || ''}
                                    onChange={handleChange}
                                />
                                {errors.email && <span className="text-danger">{errors.email[0]}</span>}

                                <label>Contraseña</label>
                                <input type="password" name="password" className="form-control mb-2"
                                    value={inputs.password || ''}
                                    onChange={handleChange}
                                />
                                {errors.password && <span className="text-danger">{errors.password[0]}</span>}

                                <button type="button" onClick={submitForm} className="btn btn-info mt-2">Crear Usuario</button>

                                {/* component para mostrar contenido de toast */}
                                <ToastContainer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

    )
}