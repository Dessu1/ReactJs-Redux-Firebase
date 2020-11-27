import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cerrarSesionAccion } from "../redux/usuarioDucks";
import { withRouter } from "react-router-dom";

const Navbar = (props) => {
  const distpatch = useDispatch();
  const activo = useSelector((store) => store.usuario.activo);

  const cerrarSesion = () => {
    distpatch(cerrarSesionAccion());
    props.history.push("/login");
  };

  return (
    <div className='navbar navbar-dark bg-dark'>
      <Link className='navbar-brand' to='/'>
        APP POKE
      </Link>

      <div className='d-flex'>
        {activo ? (
          <>
            <NavLink className='btn btn-dark mr-2' exact to='/'>
              Inicio
            </NavLink>
            <NavLink className='btn btn-dark mr-2' exact to='/perfil'>
              Perfil
            </NavLink>
            <button className='btn btn-dark' onClick={() => cerrarSesion()}>
              Cerrar Sesion
            </button>
          </>
        ) : (
          <NavLink className='btn btn-dark mr-2' exact to='/login'>
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default withRouter(Navbar);
