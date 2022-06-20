const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const contatoController = require('./src/controllers/contatoController');

 
route.get('/', homeController.paginaInicial);

route.post('/', homeController.paginaPost);

module.exports = route;


//mongodb+srv://rodolfo:<password>@cluster1.qfshu0q.mongodb.net/?retryWrites=true&w=majority