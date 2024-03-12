const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');


router.get('/', (req,res)=>{
    res.send('conexion OK')
})

// Ruta para obtener todos los pokemon
router.get('/pokemon', pokemonController.getPokemons);

// Ruta para eliminar el pokemon de la BD
router.delete('/pokemon', pokemonController.deletePokemons);

// Ruta para listar todos los pokemon en la BD
router.get('/ListPokemons', pokemonController.listPokemons);

module.exports = router;