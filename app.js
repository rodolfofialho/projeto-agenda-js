require('dotenv').config();


const express = require('express');
const app = express();

//conexao cm BD MongoDB 
const mongoose = require('mongoose');
 
mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.emit('pronto');
    })
    .catch(e => console.log(e));
// fim 

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middleware/middleware');

//http://site.com.br

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: 'dcvdvdjhvjchdvjchvdjchvdjchvdjhcvdjhcvdjhcvjcdhjdcdcvhjdvcjhdcjvhcdhjvdjhvvhjcd',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views')); //caminho absoluto   tbm pode ser usado  //caminho relativo './src/views'
app.set('view engine', 'ejs');

//nosso middleware
app.use(csrf());
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware)
app.use(routes);

app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000');
        console.log('Servidor ON  port: 3000');
    });
});
