
const axios = require('axios');
const pokemonServices = require('../services/pokemonServices');
const mongoService = new pokemonServices();

// Controlador para obtener todos los pokemon
exports.getPokemons = async (req, res) => {
    try {
         // Extraer el valor del parámetro de la URL
         const pokemonName = req.query.Value;

         // Hacer una solicitud a la API de pokemon para buscar el pokemon
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        

        //Filtrar los primeros 4 movimientos

        let moves = response.data.moves;
        let movesFirst = [];
        

        moves.forEach(function(moves,indice) {
            if (indice < 4) {
                movesFirst.push(moves);
            }
        });


        // Extraer la información del pokemon de la respuesta
        const pokemonData = {
            id: response.data.id,
            name: response.data.name,
            moves: movesFirst , 
            types: response.data.types
        };


        await mongoService.connect();
        await mongoService.insertOne(pokemonData);
        await mongoService.disconnect();

        // Enviar la respuesta al cliente con la información del pokemon encontrado
        return res.status(200).json(pokemonData);

        

    } catch (error) {
        // Si ocurre un error, envía una respuesta de error al cliente
        return res.status(500).json({ error: 'Error al obtener los pokemon' });
    }
};

exports.deletePokemons = async (req, res) => {
    try {
        // Obtener el nombre o id  del pokemon a eliminar desde la solicitud ya que eliminara ambos en el mismo endpoint
        const pokemonToDelete = req.query.Value;
        const filter = {}; // Aquí se define el filtro adecuado

        await mongoService.connect();

        if (!isNaN(pokemonToDelete)) {
            // Si pokemonToDelete es un número, buscamos por id
            filter.id = parseInt(pokemonToDelete);
        } else {
            // Si pokemonToDelete es una cadena, buscamos por nombre
            filter.name = pokemonToDelete;
        }

        const result = await mongoService.deleteOne(filter);

        await mongoService.disconnect();

        return res.status(200).json({ message: "Pokemon eliminado correctamente" });

    } catch (error) {
        // Si ocurre un error, enviar una respuesta de error al cliente
        return res.status(500).json({ error: 'Error al eliminar el pokemon' });
    } 
};



exports.listPokemons = async (req, res) => {

    try {
        await mongoService.connect();
        const pokemons = await mongoService.findAll();
        await mongoService.disconnect();

        // Enviar la lista de pokemons al cliente
        if (pokemons.length === 0) {
            return res.status(200).json({ message: "No hay pokemon disponibles" });
        } else {
            return res.status(200).json(pokemons);
        }


    } catch (error) {
        // Si ocurre un error, enviar una respuesta de error al cliente
        return res.status(500).json({ error: 'Error al eliminar el pokemon' });
    } 
};
