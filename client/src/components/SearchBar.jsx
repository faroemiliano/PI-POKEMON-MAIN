import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName, getAllPokemons } from "../redux/actions";
import styles from "../Styles/SearchBar.module.css";
import { useLocation } from "react-router";

const SearchBar = () => {
  const [pokemonName, setPokemonName] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page") ?? 1;

  const handleChange = (event) => {
    if (event.target.value === "") {
      dispatch(getAllPokemons(page));
    }
    setPokemonName(event.target.value);
  };

  const dispatch = useDispatch();

  const onSearch = () => {
    dispatch(getPokemonByName(pokemonName));
  };

  return (
    <>
      <div className={styles.input}>
        <input
          type="search"
          onChange={handleChange}
          value={pokemonName}
          placeholder="Nombre del Pokemon"
        />

        <button onClick={onSearch}>Buscar</button>
      </div>
    </>
  );
};

export default SearchBar;
