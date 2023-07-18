import React from "react";
import styles from "../Styles/OrderBar.module.css";
import { useDispatch } from "react-redux"; //useDispatch permite ejecutar la funcion de nuestra actions, useSelector nos permite usar el estado global dentro de nues component
import { setCurrentOrder } from "../redux/actions";

const ordenes = [
  {
    id: "NA",
    nombre: "Nombre (Ascendente)",
  },
  {
    id: "ND",
    nombre: "Nombre (Descendente)",
  },
  {
    id: "AA",
    nombre: "Ataque (Ascendente)",
  },
  {
    id: "AD",
    nombre: "Ataque (Descendente)",
  },
];

const OrderBar = () => {
  const dispatch = useDispatch();
  const handleChangeOrder = (order) => {
    dispatch(setCurrentOrder(order));
  }

  return (
    <>
      <div className={styles.input}>
        <label htmlFor="orden">Ordenar por:</label>
        <select name="orden" id="orden" onChange={(event) => handleChangeOrder(event.target.value)}>
          {ordenes.map((o) => {
            return <option value={o.id}>{o.nombre}</option>;
          })}
        </select>
      </div>
    </>
  );
};

export default OrderBar;
