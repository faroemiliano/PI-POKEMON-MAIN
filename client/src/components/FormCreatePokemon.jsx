import React, { useState, useEffect } from "react";
import styles from "../Styles/Form.module.css";
import MultiSelectDropdown from "./MultiSelectDropdown";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, createPokemon } from "../redux/actions";
import {
  validateXNumero,
  validateImagen,
  validateNombre,
} from "../validatePokemon";
import { Link } from "react-router-dom";

const FormCreatePokemon = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    imagen: "",
    vida: 0,
    ataque: 0,
    defensa: 0,
    velocidad: 0,
    peso: 0,
    altura: 0,
  });

  const [errorFormData, setErrorFormData] = useState({
    nombre: "",
    imagen: "",
    vida: "",
    ataque: "",
    defensa: "",
    types: "",
  });

  const [errorCreate, setErrorCreate] = useState("");

  const validateFormInput = (input) => {
    if (
      input.name === "defensa" ||
      input.name === "ataque" ||
      input.name === "vida"
    ) {
      if (input.value) {
        const responseValidateNumero = validateXNumero(
          Number(input.value)
        );
        setErrorFormData({
          ...errorFormData,
          [input.name]: responseValidateNumero,
        });
      } else {

        setErrorFormData({
          ...errorFormData,
          [input.name]: "Campo requerido",
        });
      }
    }
    if (input.name === "imagen") {
      if (input.value) {
        const responseValidateImagen = validateImagen(input.value);
        setErrorFormData({
          ...errorFormData,
          [input.name]: responseValidateImagen,
        });
      } else {
        setErrorFormData({
          ...errorFormData,
          [input.name]: "Campo requerido",
        });
      }
    }

    if (input.name === "nombre") {
      if (input.value) {
        const responseValidateNombre = validateNombre(input.value);
        setErrorFormData({
          ...errorFormData,
          [input.name]: responseValidateNombre,
        });
      } else {
        setErrorFormData({
          ...errorFormData,
          [input.name]: "Campo requerido",
        });
      }
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  const types = useSelector((state) => state.types);

  const toggleType = ({ id }) => {
    setSelectedTypes((prevSelected) => {
      
      const newArray = [...prevSelected];
      if (newArray.includes(id)) {
        return newArray.filter((item) => item != id);
        
      } else {
        newArray.push(id);
        return newArray;
      }
    });
  };

  const handleChange = (event) => {
    validateFormInput(event.target);
    setFormData({
      ...formData,
      [event.target.name]:
        event.target.type === "number"
          ? Number(event.target.value)
          : event.target.value, // si event.target.type es igual a un numero (?) entonces convertilo en numero ( Number(event.target.value)) sino (:), dejalo igual (string, event.target.value )
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedTypes.length < 2) {
      setErrorCreate("Debe seleccionar minimo 2 tipos.");
      return;
    }

    if (
      !errorFormData.nombre &&
      !errorFormData.ataque &&
      !errorFormData.imagen &&
      !errorFormData.defensa &&
      !errorFormData.vida &&
      !errorFormData.types
    ) {
      const payload = { ...formData, types_ids: selectedTypes };

      const response = await dispatch(createPokemon(payload));
      if (response === "OK") {
        window.location.href = "/home";
      } else {
        setErrorCreate(response);
      }
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formulario}>
        <h3 className={styles.titulo}>Crea tu Pokemon</h3>

        <div className={styles.containerInputs}>
          <div className={styles.inputs}>
            <label>Nombre:</label>
            <div>
              <input
                name="nombre"
                placeholder="Nombre pokemon"
                type="text"
                onChange={handleChange}
              />
              {errorFormData.nombre && (
                <p className={styles.errors}>{errorFormData.nombre}</p>
              )}
            </div>
          </div>

          <div className={styles.inputs}>
            <label>Imagen:</label>
            <div>
              <input
                name="imagen"
                placeholder="URL de imagen"
                type="text"
                onChange={handleChange}
              />
              {errorFormData.imagen && (
                <p className={styles.errors}>{errorFormData.imagen}</p>
              )}
            </div>
          </div>

          <div className={styles.inputs}>
            <label>Vida:</label>
            <div>
              <input name="vida" type="number" onChange={handleChange} />
              {errorFormData.vida && (
                <p className={styles.errors}>{errorFormData.vida}</p>
              )}
            </div>
          </div>
          <div className={styles.inputs}>
            <label>Ataque:</label>
            <div>
              <input name="ataque" type="number" onChange={handleChange} />
              {errorFormData.ataque && (
                <p className={styles.errors}>{errorFormData.ataque}</p>
              )}
            </div>
          </div>

          <div className={styles.inputs}>
            <label>Defensa:</label>
            <div>
              <input name="defensa" type="number" onChange={handleChange} />
              {errorFormData.defensa && (
                <p className={styles.errors}>{errorFormData.defensa}</p>
              )}
            </div>
          </div>

          <div className={styles.inputs}>
            <label>Velocidad:</label>
            <div>
              <input name="velocidad" type="number" onChange={handleChange} />
            </div>
          </div>

          <div className={styles.inputs}>
            <label>Altura:</label>
            <div>
              <input name="altura" type="number" onChange={handleChange} />
            </div>
          </div>

          <div className={styles.inputs}>
            <label>Peso:</label>
            <div>
              <input name="peso" type="number" onChange={handleChange} />
            </div>
          </div>

          <div className={styles.inputs}>
            <label>Tipos:</label>
            <div>
              <MultiSelectDropdown
                options={types}
                selected={selectedTypes}
                toggleOption={toggleType}
              />
            </div>
          </div>
        </div>

        {errorCreate && <p>{errorCreate}</p>}

        <div className={styles.buttons}>
          <Link className={styles.link} to="/home?offset=0&limit=12&page=1">
            Volver
          </Link>

          <button type="submit" className={styles.button}>
            Crear
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormCreatePokemon;
