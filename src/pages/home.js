//components
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

//API Conection
import http from "../conection/http";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

   // toast para eliminacion correcta
   const successForm = () => {
    toast.success("Usuario Eliminado Exitosamente!", {
        position: "top-right",
      });
};

  /* endpoint para obtener los usuarios */
  const fetchAllUsers = () => {
    http.get("/users").then((res) => {
      setUsers(res.data);
    });
  };

  /* endpoint para eliminar un usuario */
  const deleteUser = (id) => {
    http.delete("/users/" + id).then((res) => {
        successForm();
        fetchAllUsers();
    });
  };

  return (
    <div>
      <div className="row mt-3">
        <div className="col-md-12">
          <h2>Listado de Usuarios </h2>
          <div className="text-end">
            <Link className="btn btn-success" to={{ pathname: "/create" }}>
              Añadir Usuario 
            </Link>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>N°.</th>
                <th>Nombres</th>
                <th>Email</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{++index}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link
                      className="btn btn-info"
                      to={{ pathname: "/edit/" + user.id }}
                    >
                      Editar
                    </Link>
                    &nbsp;
                    <Link
                      className="btn btn-primary"
                      to={{ pathname: "/view/" + user.id }}
                    >
                      Ver
                    </Link>
                    &nbsp;
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        deleteUser(user.id);
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* component para mostrar contenido de toast */}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
