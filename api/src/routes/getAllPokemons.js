//Traer todos los pokemones, tanto de la base de datoss como de la api.
//Tenemos que devolver si o si los siguientes datos: ID, Origen, nombre, tipos, imagen, total de todos los pokemones.
//El id y el origen, lo necesitamos para poder traernos el detalle del pokemon (GET | /pokemons/:idPokemon).
//El nombre, tipo y imagen, es lo minimo que debe mostrar la card según la consigna.
//Se debe retornar de a 12 pokemones como máximo.
const { Pokemon, Type } = require("../db"); // ambas son tablas/// me traigo las tablas de la base de datos.
const { Router } = require("express"); // permite trabajar coin rutas
const axios = require("axios");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const { page } = req.query;
    const pageSize = 12;
    const offset = (page - 1) * pageSize;
    const limit = page * pageSize - 1;
    const totalPokemons = [];

    const pokemonsDB = await Pokemon.findAll({
      include: [
        {
          //Incluimos la relacion con los types atraves de la tabla Type.
          model: Type,
          required: true,
          attributes: {
            exclude: ["createdAt", "updatedAt"], //Excluimos estos atributos de la tabla type.
          },
        },
      ],
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "vida",
          "defensa",
          "peso",
          "altura",
          "velocidad",
        ], //Excluimos estos atributos de la tabla pokemon.
      },
    });

    const responseAPI = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1281"
    );

    if (pokemonsDB.length > 0) {
      pokemonsDB.map((element) => totalPokemons.push(element));
    }

    if (responseAPI.data.results) {
      responseAPI.data.results.map((element) =>
        totalPokemons.push({
          nombre: element.name,
          url: element.url,
          origen: "API",
        })
      );

      const pokemonPaginados = totalPokemons.slice(
        Number(offset),
        Number(limit + 1)
      );

      let paginas = parseInt(totalPokemons.length / 12);
      if (totalPokemons.length % 12) {
        paginas++;
      }

      const PokemonResponse = [];

      for (let i = 0; i < pokemonPaginados.length; i++) {
        if (!pokemonPaginados[i].hasOwnProperty("url")) {
          PokemonResponse.push(pokemonPaginados[i]);
          continue;
        }
        const response = await axios.get(pokemonPaginados[i].url);
        const typesPokemon = response.data.types.map((element) => {
          return {
            nombre: element.type.name,
            id: Number(element.type.url.split("/").slice(-2, -1)[0]),
          }; //al retornar la info entre corchetes, solicito que cree un nuevo objeto. En el ID cambio el formato de string a numero (Number())
        });
        const pokemonAPIData = {
          nombre: pokemonPaginados[i].nombre,
          id: response.data.id,
          types: typesPokemon,
          imagen: response.data.sprites.front_default,
          origen: pokemonPaginados[i].origen,
          ataque: response.data.stats.filter(
            (element) => element.stat.name === "attack"
          )[0].base_stat,
        };
        PokemonResponse.push(pokemonAPIData);
      }

      return res.status(200).json({
        totalPokemons: totalPokemons.length,
        totalPagina: PokemonResponse.length,
        paginas,
        data: PokemonResponse,
      });
    }
  } catch (error) {
    return res
      .status(400)
      .send(
        `Ocurrió un error al traer todos los pokemones. Error: ${error.message}`
      );
  }
});

module.exports = router;
