import React from "react";
import styles from "../Styles/Navbar.module.css";
import { Link } from "react-router-dom";
import imagen from "../imagenes/banner-removebg-preview.png";


function Navbar() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.divImagen}>
          <Link to="/" className={styles.link}>
            <img src={imagen} className={styles.imagen} alt="banner" />
          </Link>

        </div>
        <div className={styles.divButton}>
        <Link className={styles.buttonCreate} to="/create">
          Crear Pokemon
        </Link>

        </div>
      </div>
    </>
  );
}

export default Navbar;
