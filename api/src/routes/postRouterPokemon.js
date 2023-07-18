const {Pokemon, Type, Type_pokemons} = require('../db') //Pokemon hace referencia a la tabla heacha en la BD
const {Router} = require('express')
const axios = require('axios')

const router = Router()

const validatePokemonExists = async(nombrePokemon) => {
    try{
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`)
        if(response.status === 200) return true
    }catch(error){
        const pokemonDB = await Pokemon.findOne({ where: { nombre: nombrePokemon } })
        if(pokemonDB) return true

    }
    return false

}

router.post("/", async(req, res) => {

    try{
        const body = req.body // tomamos el body de la request que nos llega.
        if(body.nombre && body.imagen && body.vida && body.defensa && body.ataque && body.types_ids.length >= 2){ //validamos que en el body lleguen todos estos campos ya que son obligatorios en la base de datos
            if(await validatePokemonExists(body.nombre.toLowerCase())){
                return res.status(404).send("Ese pokemon ya existe.")
            }
            
            const newPokemon = await Pokemon.create({ //crear el nuevo pokemon
                nombre: body.nombre.toLowerCase(),
                imagen: body.imagen,
                defensa: body.defensa,
                ataque: body.ataque,
                vida: body.vida,
                velocidad: body.velocidad ? body.velocidad : null,
                peso: body.peso ? body.peso : null,
                altura: body.altura ? body.altura : null,
            })

            for(let i = 0; i<body.types_ids.length;i++){
                const type = await Type.findOne({ where: { id: body.types_ids[i] } }) //Le pedimos a la tabla Type, que nos encuentre un solo type, cuando el id del type sea igual al id que recibimos por body.
                await newPokemon.addType(type, {through: Type_pokemons}) //Creamos la relacion de muchos a muchos, con el nuevo pokemon creado y con los types que encontramos en la base de datos.
            }

            newPokemon.save()// guardamos de forma permanente el nuevo pokemon
            return res.status(200).send("Ok")
        }
        return res.status(400).send("Falta información obligatoria")
    }catch (error){
        return res.status(400).send(`Ocurrió un error: ${error.message}`)
    }
})

module.exports = router;