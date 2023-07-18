import { Link } from "react-router-dom";
import styles from "../Styles/Landing.module.css";

const Landing = () => {
  return (
    <div className={styles.container}>
      <button className={styles.button}>
        <Link
          to="/home"
          className={styles.textoButton}
        >
          Unete a nosotros
        </Link>
      </button>
    </div>
  );
};

export default Landing;
