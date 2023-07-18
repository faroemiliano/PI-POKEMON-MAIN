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

const initialState = {
  pokemons: [],
  pokemonDetail: {},
  types: [],
  paginas: 0,
  current_order: "NA",
  current_type: null,
  current_origin: null,
  current_loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
      };
    case TOTAL_PAGINAS:
      return {
        ...state,
        paginas: action.payload,
      };
    case CURRENT_ORDER:
      return {
        ...state,
        current_order: action.payload,
      };
    case CURRENT_ORIGIN:
      return {
        ...state,
        current_origin: action.payload,
      };
    case CURRENT_TYPE:
      return {
        ...state,
        current_type: action.payload,
      };
    case GET_POKEMON_DETAIL:
      return {
        ...state,
        pokemonDetail: action.payload,
      };

    case GET_POKEMON_BY_NAME:
      return {
        ...state,
        pokemons: action.payload,
      };
    case CREATE_POKEMON:
      return {
        ...state,
        pokemons: [action.payload, ...state.pokemons],
      };

    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };

    case CLEAR_DETAIL:
      return {
        ...state,
        pokemonDetail: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        current_loading: action.payload,
      };
    default:
      return { ...state };
  }
};

export default reducer;
