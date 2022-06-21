const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');

 
route.get('/', homeController.index);

//rotas de login
route.get('/login/index', loginController.index);

module.exports = route;


//mongodb+srv://rodolfo:<password>@cluster1.qfshu0q.mongodb.net/?retryWrites=true&w=majority