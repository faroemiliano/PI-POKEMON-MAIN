import axios from "axios";
import {
  GET_ALL_POKEMONS,
  GET_POKEMON_DETAIL,
  GET_POKEMON_BY_NAME,
  CREATE_POKEMON,
  GET_TYPES,
  CLEAR_DETAIL,
  TOTAL_PAGINAS,
  CURRENT_ORDER,
  CURRENT_ORIGIN,
  CURRENT_TYPE,
  SET_LOADING,
} from "./actions-types";

export const getAllPokemons = (page = 1) => {
  return async function (dispatch) {
    try {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });
      let response = await axios.get(
        `http://localhost:3001/pokemon/?page=${page}`
      );
      dispatch({
        type: GET_ALL_POKEMONS,
        payload: response.data.data,
      });
      dispatch({
        type: TOTAL_PAGINAS,
        payload: response.data.paginas,
      });
    } catch {
      dispatch({
        type: GET_ALL_POKEMONS,
        payload: [],
      });

      dispatch({
        type: TOTAL_PAGINAS,
        payload: 0,
      });
    }

    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  };
};

export const getPokemonDetail = (id, origen) => {
  return async function (dispatch) {
    try {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });
      const response = await axios.get(
        `http://localhost:3001/pokemon/${id}/${origen}`
      );
      const pokemonByID = response.data;
      dispatch({
        type: GET_POKEMON_DETAIL,
        payload: pokemonByID,
      });
    } catch {
      dispatch({
        type: GET_POKEMON_DETAIL,
        payload: {},
      });
    }
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  };
};

export const getPokemonByName = (nombre) => {
  return async function (dispatch) {
    try {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });
      const response = await axios.get(
        `http://localhost:3001/pokemon/name?name=${nombre}`
      );

      const pokemonByName = response.data;

      dispatch({
        type: GET_POKEMON_BY_NAME,
        payload: [pokemonByName], //Al pasarlo con corchetes, estamos poniendo el objeto dentro de un array. [{name:pikachu...etc}]
      });
    } catch {
      dispatch({
        type: GET_POKEMON_BY_NAME,
        payload: [],
      });
    }

    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  };
};

export const createPokemon = (pokemon) => {
  return async function (dispatch) {
    try {
      await axios.post("http://localhost:3001/pokemon/", pokemon);
      dispatch({
        type: CREATE_POKEMON,
        payload: pokemon,
      });
      return "OK";
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return error.message;
    }
  };
};

export const getTypes = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/types/");
      dispatch({
        type: GET_TYPES,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_TYPES,
        payload: [],
      });
    }
  };
};
export const clearDetail = () => {
  return function (dispatch) {
    dispatch({
      type: CLEAR_DETAIL,
      payload: {},
    });
  };
};
export const setCurrentOrder = (order) => {
  return function (dispatch) {
    dispatch({
      type: CURRENT_ORDER,
      payload: order,
    });
  };
};

export const setCurrentOrigin = (origin) => {
  return function (dispatch) {
    dispatch({
      type: CURRENT_ORIGIN,
      payload: origin,
    });
  };
};

export const setCurrentType = (type) => {
  return function (dispatch) {
    dispatch({
      type: CURRENT_TYPE,
      payload: type,
    });
  };
};

export const setLoading = (type) => {
  return function (dispatch) {
    dispatch({
      type: CURRENT_TYPE,
      payload: type,
    });
  };
};

//Ver como traernos la respuesta de estas acciones.
