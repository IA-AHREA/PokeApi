const { MongoClient } = require('mongodb');

class pokemonServices {
    constructor() {
        this.uri = 'mongodb://localhost:27017';
        this.client = new MongoClient(this.uri);
        this.database = null;
        this.collection = null;
    }

    async connect() {
        await this.client.connect();
        this.database = this.client.db('pokemonData');
        this.collection = this.database.collection('pokemons');
    }

    async disconnect() {
        await this.client.close();
    }

    async insertOne(data) {
        await this.collection.insertOne(data);
    }

    async deleteOne(filter) {
        await this.collection.deleteOne(filter);
    }

    async findAll() {
        return await this.collection.find({}).toArray();
    }
}

module.exports = pokemonServices;
