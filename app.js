const express = require("express");

const app = express();

//ROUTES
const routes = require('./routes/pokemonRoutes')
app.use(routes);

app.listen(3000,()=>{
    console.log("server OK");
})