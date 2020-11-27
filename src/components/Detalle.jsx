import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { unPokeDetalleAccion } from "../redux/pokeDucks";

const Detalle = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      dispatch(unPokeDetalleAccion());
    };

    fetchData();
  }, [dispatch]);

  const pokemon = useSelector((store) => store.pokemones.unPokemon);

  return pokemon ? (
    <div className='card text-uppercase text-center mt-4'>
      <div className='card-body'>
        <img src={pokemon.foto} alt='imgPoke' className='img-fluid' />
        <div className='card-title '>{pokemon.nombre}</div>
        <p className='card-text'>
          Alto: {pokemon.alto} | Ancho: {pokemon.ancho}
        </p>
      </div>
    </div>
  ) : null;
};

export default Detalle;
