# PokeApi
API de Pokemons
Esta API proporciona funcionalidades para trabajar con información sobre Pokemons, incluyendo la obtención, eliminación y listado de Pokemons.

Instalación
Clona este repositorio en tu máquina local.
Instala las dependencias utilizando npm:
npm install

Uso
Endpoints Disponibles
GET /pokemons: Obtiene información sobre un Pokemon y lo guarda en la base de datos.
Parámetros de consulta:
Value: Nombre del Pokemon a buscar.
Ejemplo de uso:

curl -X GET 'http://localhost:3000/pokemons?Value=bulbasaur'

DELETE /pokemons: Elimina un Pokemon de la base de datos.
Parámetros de consulta:
Value: Nombre o ID del Pokemon a eliminar.
Ejemplo de uso:

curl -X DELETE 'http://localhost:3000/pokemons?Value=bulbasaur'

GET /ListPokemons: Lista todos los Pokemons disponibles en la base de datos.
Ejemplo de uso:

curl -X GET 'http://localhost:3000/pokemons/all'

Pruebas
Para ejecutar las pruebas unitarias, puedes utilizar el siguiente comando:

npm test

Autor
Nombre: [ANGEL TORRES]
Contacto: [erosarkus@gmail.com]