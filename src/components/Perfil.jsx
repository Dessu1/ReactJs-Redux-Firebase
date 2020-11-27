import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  actualizarUsuarioAccion,
  editarFotoAccion,
} from "../redux/usuarioDucks";

const Perfil = () => {
  const usuario = useSelector((store) => store.usuario.user);

  const [nombreUsuario, setNombreUsuario] = useState(usuario.displayName);
  const [activarFormulario, setActivarFormulario] = useState(false);
  const loading = useSelector((store) => store.usuario.loading);

  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const actualizarUsuario = async () => {
    if (!nombreUsuario.trim()) {
      console.log("nombre vacio");
      return;
    }
    dispatch(actualizarUsuarioAccion(nombreUsuario));
    setActivarFormulario(false);
  };

  const seleccionarArchivo = (imagen) => {
    const imagenCliente = imagen.target.files[0];

    if (imagenCliente === undefined) {
      console.log("Selecciona una imagen");
      return;
    }

    if (
      imagenCliente.type === "image/png" ||
      imagenCliente.type === "image/jpeg" ||
      imagenCliente.type === "image/jpg"
    ) {
      dispatch(editarFotoAccion(imagenCliente));
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className='mt-5 text-center'>
      <div className='card'>
        <div className='card-body'>
          <img
            src={usuario.photoURL}
            alt='foto-perfil'
            width='100px'
            className='img-fluid border-img-perfil'
          />

          <h5 className='card-tittle'>{usuario.displayName}</h5>
          <p className='card-text'>{usuario.email}</p>

          <button
            className='btn btn-dark'
            onClick={() => setActivarFormulario(true)}
          >
            Editar Nombre
          </button>

          {error && (
            <div className='aler alert-warning my-3'>
              Solo archivos png / jpg / jpeg
            </div>
          )}

          <div className='custom-file'>
            <input
              type='file'
              className='custom-file-input'
              id='inputGroupFile01'
              style={{ display: "none" }} // ocultar el input
              onChange={(e) => seleccionarArchivo(e)}
              disabled={loading}
            />
            <label
              className={
                loading ? "btn btn-dark mt-2 disabled" : "btn btn-dark mt-2"
              }
              htmlFor='inputGroupFile01'
            >
              Actualizar imagen
            </label>
          </div>
        </div>

        {loading && (
          <div className='card-body'>
            <div className='d-flex justify-content-center my-3'>
              <div className='spinner-border' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            </div>
          </div>
        )}

        {activarFormulario && (
          <div className='card-body'>
            <div className='row justify-content-center'>
              <div className='col-md-5'>
                <div className='input-group mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Escriba su nuevo nombre de Usuario'
                    value={nombreUsuario}
                    onChange={(e) => setNombreUsuario(e.target.value)}
                  />
                  <div className='input-group-append'>
                    <button
                      className='btn btn-outline-secondary btn-dark'
                      type='button'
                      onClick={() => actualizarUsuario()}
                    >
                      Actualizar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Perfil;
