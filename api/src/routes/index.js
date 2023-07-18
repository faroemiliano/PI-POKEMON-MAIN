const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routerTypes = require("./getTypesPokemon");
const routerPostPokemon = require("./postRouterPokemon");
const routerGetByName = require("./getPokemonByName");
const routerPokemonById = require("./getPokemonById");
const routerGetAllPolemons = require("./getAllPokemons");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/types", routerTypes);
router.use("/pokemon", routerPostPokemon);
router.use("/pokemon", routerGetByName);
router.use("/pokemon", routerPokemonById);
router.use("/pokemon", routerGetAllPolemons);

module.exports = router;
