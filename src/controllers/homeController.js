// const HomeModel = require('../models/HomeModel');

// HomeModel.create({
//     titulo: 'Um titulo testes DB',
//     descricao: 'MongoDB teste1'
// })
// .then(dados => console.log(dados))
// .catch(e => console.log(e));

exports.paginaInicial = (req, res) => {
        // req.session.usuario = { nome: 'Motorhead', atividade: true };
        console.log(req.session.usuario);
        res.render('index', {
            nome: 'motorhead',
            genero: 'heave metal',
            shows: [15, 18, 25, 30]
        });
        return;
    };
    
exports.paginaPost = (req, res) => {
    res.send(req.body);
}