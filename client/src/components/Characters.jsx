import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux"; //useDispatch permite ejecutar la funcion de nuestra actions, useSelector nos permite usar el estado global dentro de nues component
import { getAllPokemons } from "../redux/actions";
import PokemonCard from "./PokemonCard";
import styles from "../Styles/Characters.module.css";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";
import SearchBar from "./SearchBar";
import OrderBar from "./OrderBar";
import OriginFilter from "./OriginFilter";
import TypeFilter from "./TypeFilter";

const Characters = () => {
  const ordenamientos = {
    na: (a, b) => {
      if (a.nombre < b.nombre) {
        return -1;
      }
      if (a.nombre > b.nombre) {
        return 1;
      }
      return 0;
    },
    nd: (a, b) => {
      if (a.nombre < b.nombre) {
        return 1;
      }
      if (a.nombre > b.nombre) {
        return -1;
      }
      return 0;
    },
    aa: (a, b) => {
      if (a.ataque < b.ataque) {
        return -1;
      }
      if (a.ataque > b.ataque) {
        return 1;
      }
      return 0;
    },
    ad: (a, b) => {
      if (a.ataque < b.ataque) {
        return 1;
      }
      if (a.ataque > b.ataque) {
        return -1;
      }
      return 0;
    },
  };

  const handleChangePage = (page) => {
    window.location = `/home/?page=${page}`;
  };
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page") ?? 1;
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const cantPaginas = useSelector((state) => state.paginas);
  const currentOrigin = useSelector((state) => state.current_origin);
  const currentType = useSelector((state) => state.current_type);
  const currentOrder = useSelector((state) => state.current_order);
  const currentLoading = useSelector((state) => state.current_loading);
  const paginas = [];
  for (let index = 0; index < cantPaginas; index++) {
    const page = index + 1;
    paginas.push(page);
  }
  useEffect(() => {
    dispatch(getAllPokemons(page));
  }, []);

  let pokemons;
  if (currentOrigin) {
    pokemons = allPokemons.filter((p) => p.origen === currentOrigin);
  } else {
    pokemons = allPokemons;
  }

  if (currentType) {
    pokemons = pokemons.filter((p) =>
      p.types.map((t) => t.id).includes(Number(currentType))
    );
  }

  pokemons = pokemons.sort(ordenamientos[currentOrder.toLowerCase()]);

  return (
    <div className={styles.containter}>
      <Navbar />
      <div className={styles.containerActions}>
        <OriginFilter />
        <TypeFilter />

        <OrderBar />

        <SearchBar />
      </div>
      <div className={styles.cartas}>
        {currentLoading && <Loader />}

        {!currentLoading &&
          pokemons &&
          pokemons.map((pokemon) => (
            <PokemonCard
              nombre={pokemon.nombre}
              imagen={pokemon.imagen}
              id={pokemon.id}
              origen={pokemon.origen}
              types={pokemon.types}
            />
          ))}

        {!currentLoading && !pokemons.length && <p className={styles.titulo}>No se encontraron pokemones.</p>}
      </div>
      <div>
        <select
          name="paginador"
          id="paginador"
          onChange={(event) => handleChangePage(event.target.value)}
          value={page}
        >
          {paginas.map((p) => {
            return (
              <option value={p} disabled={p === page}>
                {p}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Characters;
