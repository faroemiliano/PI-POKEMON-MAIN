const { Type } = require("../db"); //me traigo la tabla de type
const { Router } = require("express"); // permite trabajar coin rutas
const axios = require("axios");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const types = await Type.findAll({
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
    });

    if (types.length === 0) {
      const response = await axios.get("https://pokeapi.co/api/v2/type");

      const typesAPI = response.data.results; //me traigo de "data.results" el array de los tipos
      const responseArray = []; //array para guardar los tipos con "name, id"

      for (let i = 0; i < typesAPI.length; i++) {
        // recorro el array de tipos obteidos de la API
        const typeName = typesAPI[i].name; // guardo el valor nombre
        const typeID = Number(typesAPI[i].url.split("/").slice(-2, -1)[0]); //guardo el valor id
        const typeData = { nombre: typeName, id: typeID }; // guardo el objeto completo

        const newType = await Type.create(typeData); // creamos el registro detro de la tabla con los valores obtenidos anteriormente.

        newType.save(); //guardamos el registro creado
        responseArray.push(typeData); //guardamos en el array, el objeto creado en la DB
      }

      return res.status(200).json(responseArray); //respondemos con un 200 y con el array que creamos para guardar los tipos, ya que la info en la base de datos, tarda en reflejarse.
    }

    //caso en el que la base de datos tiene informacion
    return res.status(200).json(types); // respondemos con un 200 y aplicamos un map sobre el array de tipos de nuestra base de datos, para unicamente tomar el valor de "nombre, id".
  } catch (error) {
    return res
      .status(400)
      .send(`Ocurrió un error al traer los types. Error: ${error.message}`);
  }
});

module.exports = router;

//try catch, señalizador de error para nosotros mismos.
