export const validateNombre = (nombre) => {
  if (/\d/.test(nombre)) {
    return "El nombre no puede contener numeros";
  }
  return "";
};

export const validateImagen = (imagen) => {
  if (/\.(jpeg|jpg|gif|png)$/i.test(imagen)) {
    return "";
  }
  return "Permite formato jpeg | jpg | gif | png";
};

export const validateXNumero = (numero) => {
  if (/^(?:[1-9][0-9]?|100)$/.test(numero)) {
    return "";
  }
  return "el valor debe ser de 1 a 100";
};

// nombre: "",
// imagen: "",
// vida: 0,
// ataque: 0,
// defensa: 0,
