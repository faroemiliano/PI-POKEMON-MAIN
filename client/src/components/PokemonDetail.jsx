import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonDetail, clearDetail } from "../redux/actions";
import styles from "../Styles/DetailStyles.module.css";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const PokemonDetail = () => {
  const navigate = useNavigate();

  const { id, origen } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearDetail());
    dispatch(getPokemonDetail(id, origen));
  }, []);
  const pokemon = useSelector((state) => state.pokemonDetail);
  const currentLoading = useSelector((state) => state.current_loading);

  return (
    <div className={styles.containerDetail}>


      <div className={styles.divLink}>
        <button className={styles.link} onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>

      <div className={styles.divDetail}>
        <div className={styles.textoDetail}>
          {currentLoading ? (
            <Loader />
          ) : (
            <>
              <div className={styles.habilidades}>
                <h2 className={styles.nombre}> {pokemon.nombre}</h2>

                <div className={styles.divDato}>
                  <h3>Defensa:</h3>
                  <p>{pokemon.defensa}</p>
                </div>
                <div className={styles.divDato}>
                  <h3>Ataque:</h3>
                  <p>{pokemon.ataque}</p>
                </div>
                <div className={styles.divDato}>
                  <h3>Origen:</h3>
                  <p>{pokemon.origen}</p>
                </div>
                <div className={styles.divDato}>
                  <h3>Velocidad:</h3>
                  <p>{pokemon.velocidad}</p>
                </div>
                <div className={styles.divDato}>
                  <h3>Peso:</h3>
                  <p>{pokemon.peso}</p>
                </div>

                <div className={styles.divDato}>
                  <h3>Altura:</h3>
                  <p>{pokemon.altura}</p>
                </div>
                <div className={styles.divTypes}>
                  <h3>Tipos:</h3>
                  <div className={styles.containerTypes}>
                    {pokemon.types &&
                      pokemon.types.map((element) => <p>{element.nombre}</p>)}
                  </div>
                </div>
              </div>
              <div>
                {pokemon.imagen && <img
                  className={styles.img}
                  src={pokemon.imagen}
                  alt="Imagen pokemon"
                />}
                {!pokemon.imagen && <p>No hay imagen asociada</p>}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

//REvisar porque se recarga y no nos muestra la info del pokemon

export default PokemonDetail;
