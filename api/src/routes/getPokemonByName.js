const { Pokemon, Type } = require("../db"); //me traigo la tabla de type
const { Router } = require("express"); // permite trabajar coin rutas
const axios = require("axios");

const router = Router();

router.get("/name", async (req, res) => {
  //creo ruta "/name" para buscar un pok por sus nombre, tanto en la DB como en la api
  try {
    const nombrePokemon = req.query.name.toLowerCase(); //guardo en una const, el nombre que llega por query e luego lo transformo en minusculas
    const pokemonByDB = await Pokemon.findOne({
      where: { nombre: nombrePokemon },
      include: [
        {
          //Incluimos la relacion con los types a tarves de la tabla Type.
          model: Type,
          required: true,
          attributes: {
            exclude: ["createdAt", "updatedAt"], //Excluimos estos atributos de la tabla type.
          },
        },
      ],
      attributes: {
        exclude:[
          "createdAt",
          "updatedAt",
          "vida",
          "defensa",
          "peso",
          "altura",
          "ataque",
          "velocidad",
        ], //excluimos estos atributos de la tabla pokemon.
      },
    }); //hago la peticion para que me traiga un solo pok de la DB solo por nombre completo

    if (pokemonByDB) {
      return res.status(200).json(pokemonByDB); //si encuentra ese pokemon realizo la respueta con status 200 y devuelvo la info en formato json
    }

    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`
    ); // si no encuentra un pok en la DB  efectuo la consulta en la api y guardo el resultado en la const RESPONSE

    // consulto: si el estatus de mi consulta es 200, respondo con la info solicitada (id, nombre, imagen, types) de mi pok
    const pokemonByAPI = {
      id: response.data.id,
      nombre: response.data.name,
      imagen: response.data.sprites.front_default,
      origen: "API",
      types: response.data.types.map((element) => {
        return {
          nombre: element.type.name,
          id: Number(element.type.url.split("/").slice(-2, -1)[0]),
        }; //retorno la info solicitada cambiando el formato de string a numero (Number())
      }),
    };
    return res.status(200).json(pokemonByAPI); // retorno con el status 200 y con la informacion completa en formato JSON
  } catch (error) {
    if (
      error.response &&
      error.response.status === 404 &&
      error.response.statusText === "Not Found"
    ) {
      //manejamos el error: si se cumple la condicion con alguno de estos errores, debo retornar un status 404 indicando que no se ha cumplido con lo solicitado (queriendo decir que el pokemon no existe, habla solamente del pedido al pokemon)
      return res.status(404).send("No se encontro un pokemon con ese nombre.");
    }
    return res
      .status(400)
      .send(`Ocurrió un error al traer los pokemones. Error: ${error.message}`); // en este caso no se esta refiriendo a un pokemon, si no en algun otro error general.
  }
});

module.exports = router;
