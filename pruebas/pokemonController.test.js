const axios = require('axios');
const {
    getPokemons,
    deletePokemons,
    listPokemons
} = require('../controllers/pokemonController');
const pokemonServices = require('../services/pokemonServices');

// Mock de axios
jest.mock('axios');

// Mock de pokemonServices
jest.mock('../services/pokemonServices');

describe('getPokemons', () => {
    // Datos de prueba para un Pokemon
    const pokemonData = {
        id: 1,
        name: 'bulbasaur',
        moves: ['move1', 'move2', 'move3', 'move4'],
        types: ['type1', 'type2']
    };

    // Limpiar los mocks después de cada prueba
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Prueba para obtener y guardar un Pokemon en la base de datos
    test('Debería obtener correctamente un pokemon y guardarlo en la base de datos', async () => {
        // Mock de la solicitud HTTP y definición de los datos de la solicitud y respuesta
        const req = { query: { Value: 'bulbasaur' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const response = { data: pokemonData };
        axios.get.mockResolvedValue(response);

        // Llamar a la función getPokemons
        await getPokemons(req, res);

        // Aserciones sobre el comportamiento esperado
        expect(axios.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/bulbasaur');
        expect(pokemonServices.prototype.insertOne).toHaveBeenCalledWith(pokemonData);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(pokemonData);
    });
});

describe('deletePokemons', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Debería eliminar correctamente un pokemon por nombre', async () => {
        // Mock de la solicitud HTTP y definición de los datos de la solicitud y respuesta
        const req = { query: { Value: 'bulbasaur' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const mockDeleteOne = jest.fn().mockResolvedValue({});

        pokemonServices.prototype.deleteOne.mockResolvedValue(mockDeleteOne);

        // Llamar a la función deletePokemons
        await deletePokemons(req, res);

        // Aserciones sobre el comportamiento esperado
        expect(pokemonServices.prototype.deleteOne).toHaveBeenCalledWith({ name: 'bulbasaur' });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Pokemon eliminado correctamente' });
    });
});

describe('listPokemons', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Debería listar correctamente todos los pokemons disponibles', async () => {
        // Datos de prueba para la lista de pokemons
        const pokemons = [
            { id: 1, name: 'bulbasaur' },
            { id: 2, name: 'charmander' }
        ];

        // Mock de la solicitud HTTP y definición de los datos de la solicitud y respuesta
        const req = {};
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        pokemonServices.prototype.findAll.mockResolvedValue(pokemons);

        // Llamar a la función listPokemons
        await listPokemons(req, res);

        // Aserciones sobre el comportamiento esperado
        expect(pokemonServices.prototype.findAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(pokemons);
    });

    test('Debería manejar correctamente el caso en que no hay pokemons disponibles', async () => {
        // Mock de la solicitud HTTP y definición de los datos de la solicitud y respuesta
        const req = {};
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        pokemonServices.prototype.findAll.mockResolvedValue([]);

        // Llamar a la función listPokemons
        await listPokemons(req, res);

        // Aserciones sobre el comportamiento esperado
        expect(pokemonServices.prototype.findAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'No hay pokemon disponibles' });
    });
});
