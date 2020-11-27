import axios from "axios";

// Constantes
const dataInicial = {
  count: 0,
  next: null,
  previous: null,
  results: [],
}; // Es la misma estructura que devuelve el API de pokemones

// types
const OBTENER_POKEMONES_EXITO = "OBTENER_POKEMONES_EXITO";
const SIGUIENTE_POKEMONES_EXITO = "SIGUIENTE_POKEMONES_EXITO";
const RETROCEDER_POKEMONES_EXITO = "RETROCEDER_POKEMONES_EXITO";
const POKEINFO_EXITO = "POKEINFO_EXITO";

// Reducer
export default function pokeReducer(state = dataInicial, action) {
  switch (action.type) {
    case OBTENER_POKEMONES_EXITO:
      return { ...state, ...action.payload };
    case SIGUIENTE_POKEMONES_EXITO:
      return { ...state, ...action.payload };
    case RETROCEDER_POKEMONES_EXITO:
      return { ...state, ...action.payload };
    case POKEINFO_EXITO:
      return { ...state, unPokemon: action.payload };
    default:
      return state;
  }
}

// Acciones
export const unPokeDetalleAccion = (
  url = "https://pokeapi.co/api/v2/pokemon/1/"
) => async (dispatch) => {
  if (localStorage.getItem(url)) {
    dispatch({
      type: POKEINFO_EXITO,
      payload: JSON.parse(localStorage.getItem(url)),
    });

    return;
  }

  try {
    const res = await axios.get(url);
    dispatch({
      type: POKEINFO_EXITO,
      payload: {
        nombre: res.data.name,
        alto: res.data.height,
        ancho: res.data.weight,
        foto: res.data.sprites.front_default,
      },
    });

    localStorage.setItem(
      url,
      JSON.stringify({
        nombre: res.data.name,
        alto: res.data.height,
        ancho: res.data.weight,
        foto: res.data.sprites.front_default,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const obtenerPokemonesAccion = () => async (dispatch) => {
  if (localStorage.getItem("offset=0")) {
    dispatch({
      type: OBTENER_POKEMONES_EXITO,
      payload: JSON.parse(localStorage.getItem("offset=0")), // JSON.parse --> Destransforma toda la cadena de texto
    });

    return;
  }

  try {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`
    );

    dispatch({
      type: OBTENER_POKEMONES_EXITO,
      payload: res.data,
    });

    localStorage.setItem("offset=0", JSON.stringify(res.data)); // JSON.stringify --> Transforma todo en una cadena de texto
  } catch (error) {
    console.log(error);
  }
};

export const siguientesPokemonesAccion = () => async (dispatch, getState) => {
  const { next } = getState().pokemones; // obtenemos el campo next del objeto pokemones

  if (localStorage.getItem(next)) {
    dispatch({
      type: SIGUIENTE_POKEMONES_EXITO,
      payload: JSON.parse(localStorage.getItem(next)),
    });

    return;
  }
  try {
    const res = await axios.get(next);
    dispatch({
      type: SIGUIENTE_POKEMONES_EXITO,
      payload: res.data,
    });

    localStorage.setItem(next, JSON.stringify(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const retrocederPokemonesAccion = () => async (dispatch, getState) => {
  const { previous } = getState().pokemones; // obtenemos el campo next del objeto pokemones -->> 'pokemones' es el nombre que le di en el store.js

  if (localStorage.getItem(previous)) {
    dispatch({
      type: RETROCEDER_POKEMONES_EXITO,
      payload: JSON.parse(localStorage.getItem(previous)),
    });

    return;
  }

  try {
    const res = await axios.get(previous);
    dispatch({
      type: RETROCEDER_POKEMONES_EXITO,
      payload: res.data,
    });

    localStorage.setItem(previous, JSON.stringify(res.data));
  } catch (error) {
    console.log(error);
  }
};
