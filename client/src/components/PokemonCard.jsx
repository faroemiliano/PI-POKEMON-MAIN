import React from "react";
import styles from "../Styles/PokemonCard.module.css";
import { Link } from "react-router-dom";

const PokemonCard = (props) => {
  return (
    <Link
      className={styles.container}
      to={`/pokemon/${props.id}/${props.origen}`}
    >
      {props.imagen && <img
        src={props.imagen}
        className={styles.imagen}
        alt="imagen de pokemon"
      />}
      {!props.imagen && <p>No hay imagen asociada</p>}
      <h1 className={styles.textOtros}>{props.nombre}</h1>
      <p className={styles.tituloTipos}>Tipos:</p>
      <div className={styles.types}>
        {props.types &&
          props.types.map((element, index) => (
            <p className={styles.tipos} key={`type-${element.id}-${index}`}>{element.nombre}</p>
          ))}
      </div>
    </Link>
  );
};

export default PokemonCard;
