import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  obtenerPokemonesAccion,
  siguientesPokemonesAccion,
  retrocederPokemonesAccion,
  unPokeDetalleAccion,
} from "../redux/pokeDucks";

import Detalle from "./Detalle";

const Pokemones = () => {
  const dispatch = useDispatch();
  const pokemones = useSelector((store) => store.pokemones.results);
  const next = useSelector((store) => store.pokemones.next);
  const previous = useSelector((store) => store.pokemones.previous);

  return (
    <div className='row'>
      <div className='col-md-6'>
        <h2 className='text-center mt-5'>Lista de Pokemones</h2>
        <hr />

        <ul className='list-group mt-4'>
          {pokemones.map((item) => (
            <li className='list-group-item text-uppercase' key={item.name}>
              {item.name}

              <button
                className='btn btn-dark btn-sm float-right'
                onClick={() => dispatch(unPokeDetalleAccion(item.url))}
              >
                Info
              </button>
            </li>
          ))}
        </ul>

        <div className='d-flex justify-content-center mt-4'>
          {pokemones.length === 0 && (
            <button
              className='ml-5 btn btn-dark btn-sm mr-3'
              onClick={() => dispatch(obtenerPokemonesAccion())}
            >
              Get Pokemones
            </button>
          )}
          {previous && (
            <button
              className='btn btn-sm btn-dark mr-3'
              onClick={() => dispatch(retrocederPokemonesAccion())}
            >
              Retroceder
            </button>
          )}

          {next && (
            <button
              className='btn btn-sm btn-dark'
              onClick={() => dispatch(siguientesPokemonesAccion())}
            >
              Siguiente
            </button>
          )}
        </div>
      </div>

      <div className='col-md-6'>
        <h2 className='text-center mt-5'>Detalle Pokemon</h2>
        <hr />
        <Detalle />
      </div>
    </div>
  );
};

export default Pokemones;
