import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//API Conection
import http from '../conection/http'


export default function View(props) {
    const [inputs,setInputs] = useState({});
    const {id} = useParams();

    useEffect(()=>{
        fetchUser()
    },[]);

    //endpoint para obtener usuario por id
    const fetchUser= () =>{
        http.get('/users/'+id+'/edit').then((res)=>{
            setInputs({
                name:res.data.name,
                email:res.data.email,
            });
        });
    }
    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <h2 className="text-info mt-3">Datos del Usuario</h2>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="card p-4">
                                <h4>Nombres</h4>
                                <p>{ inputs.name }</p>
                                <h4>Correo Electrónico</h4>
                                <p>{ inputs.email }</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

    )
}