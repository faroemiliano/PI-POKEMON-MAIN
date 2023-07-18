import React, { useEffect } from "react";
import styles from "../Styles/TypeFilter.module.css";
import { setCurrentType } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux"; //useDispatch permite ejecutar la funcion de nuestra actions, useSelector nos permite usar el estado global dentro de nues component
import { getTypes } from "../redux/actions";

const TypeFilter = () => {
  const dispatch = useDispatch();
  const types = useSelector((store) => store.types)
  useEffect(() => {
    dispatch(getTypes());
  }, []);

  return (
    <>
      <div className={styles.input}>
        <label htmlFor="filter">Filtrar por tipos:</label>
        <select name="filter" id="filter" onChange={(event) => dispatch(setCurrentType(event.target.value))}>
          <option value="">Todos</option>
          {types.map((t) => {
            return <option value={t.id}>{t.nombre}</option>;
          })}
        </select>
      </div>
    </>
  );
};

export default TypeFilter;
