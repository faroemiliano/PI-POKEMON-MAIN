const { Pokemon, Type } = require('../db') //me traigo la tabla de type
const { Router } = require('express')// permite trabajar coin rutas
const axios = require('axios')
const router = Router()

router.get("/:id/:origen", async (req, res) => {
    try{

        const pokemonID = req.params.id
        const pokemonOrigen = req.params.origen
    
        if (pokemonOrigen === 'DB'){
            const pokemonByDB = await Pokemon.findOne(
                { 
                    where: { id: pokemonID }, 
                    include: [{ //Incluimos la relacion con los types a tarves de la tabla Type. 
                        model: Type,
                        required: true,                
                        attributes: {
                            exclude: ['createdAt', 'updatedAt'] //Excluimos estos atributos de la tabla type.
                        }
                  }],
                  attributes: {
                    exclude: ['createdAt', 'updatedAt']//excluimos estos atributos de la tabla pokemon.
                }
                }
            )
        if (pokemonByDB){
            return res.status(200).json(pokemonByDB)
        }
        return res.status(404).send(`No existe un pokemon con el ID ${pokemonID}` )
        }
    
        const response = await axios.get (`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
    
        const typesPokemon = response.data.types.map((element) => {
            return {nombre: element.type.name, id: Number(element.type.url.split("/").slice(-2, -1)[0])} //al retornar la info entre corchetes, solicito que cree un nuevo objeto. En el ID cambio el formato de string a numero (Number())
        })
    
        const vidaPokemon = response.data.stats.filter((element) => element.stat.name === 'hp')
        const ataquePokemon = response.data.stats.filter((element) => element.stat.name === "attack")
        const defensaPokemon = response.data.stats.filter((element) => element.stat.name === "defense")
        const velocidadPokemon = response.data.stats.filter((element) => element.stat.name === "speed")
        
    
            const pokemonByAPI = {
                id: response.data.id,
                nombre: response.data.name,
                imagen: response.data.sprites.front_default,
                altura: response.data.height,
                origen: "API",
                peso: response.data.weight,
                types: typesPokemon,
                vida: vidaPokemon[0].base_stat,
                ataque: ataquePokemon[0].base_stat,
                defensa: defensaPokemon[0].base_stat,
                velocidad: velocidadPokemon[0].base_stat 
    
        }
    
        return res.status(200).json(pokemonByAPI)
    }catch (error){
        if(error.response.status === 404 && error.response.statusText === 'Not Found'){ //manejamos el error: si se cumple la condicion con alguno de estos errores, debo retornar un status 404 indicando que no se ha cumplido con lo solicitado (queriendo decir que el pokemon no existe, habla solamente del pedido al pokemon)
            return res.status(404).send(`No se encontro un pokemon con el ID ${req.params.id}.`)
        }
        return res.status(400).send(`Ocurrió un error al traer los pokemones. Error: ${error.message}`) // en este caso no se esta refiriendo a un pokemon, si no en algun otro error general.
    }

})


module.exports = router;
