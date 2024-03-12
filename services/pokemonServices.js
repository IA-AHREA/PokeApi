const { MongoClient } = require('mongodb');

class pokemonServices {
    constructor() {
        // URL de la base de datos MongoDB
        this.uri = 'mongodb://localhost:27017';
        // Inicialización del cliente de MongoDB
        this.client = new MongoClient(this.uri);
        // Inicialización de variables para la base de datos y la colección
        this.database = null;
        this.collection = null;
    }

    // Método para conectar a la base de datos
    async connect() {
        await this.client.connect();
        // Asignación de la base de datos y la colección una vez conectados
        this.database = this.client.db('pokemonData');
        this.collection = this.database.collection('pokemons');
    }

    // Método para desconectar de la base de datos
    async disconnect() {
        await this.client.close();
    }

    // Método para insertar un documento en la colección
    async insertOne(data) {
        await this.collection.insertOne(data);
    }

    // Método para eliminar un documento de la colección basado en un filtro
    async deleteOne(filter) {
        await this.collection.deleteOne(filter);
    }

    // Método para buscar y devolver todos los documentos de la colección
    async findAll() {
        return await this.collection.find({}).toArray();
    }
}

module.exports = pokemonServices;
