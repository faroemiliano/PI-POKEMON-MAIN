import React from "react";
import styles from "../Styles/FilterBar.module.css";
import { setCurrentOrigin } from "../redux/actions";
import { useDispatch } from "react-redux"; //useDispatch permite ejecutar la funcion de nuestra actions, useSelector nos permite usar el estado global dentro de nues component

const filtrosOrigen = [
  {
    id: "",
    nombre: "Todos",
  },
  {
    id: "DB",
    nombre: "Origen (Base de datos)",
  },
  {
    id: "API",
    nombre: "Origen (API)",
  },
];

const OriginFilter = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.input}>
        <label htmlFor="filter">Filtrar por origen:</label>
        <select name="filter" id="filter" onChange={(event) => dispatch(setCurrentOrigin(event.target.value))}>
          {filtrosOrigen.map((f) => {
            return <option value={f.id}>{f.nombre}</option>;
          })}
        </select>
      </div>
    </>
  );
};

export default OriginFilter;
