const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.erros = [];
        this.user = null;
    }

    async Login() {
        this.valida();
        if(this.erros.length > 0) return;
         this.user = await LoginModel.findOne({ email: this.body.email });

         if(!this.user) {
            this.erros.push('Usuário não existe');
            return;
         }

         if(! bcryptjs.compareSync(this.body.password, this.user.password)){
            this.erros.push('Senha inválida');
            this.user = null;
            return;
         }
    }

    async register() {
        this.valida();
        if(this.erros.length > 0) return;

        await this.userExists();

        if(this.erros.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);
        this.user = await LoginModel.create(this.body); 
        
    }

    async userExists() {
        this.user = await LoginModel.findOne({ email: this.body.email });
        if (this.user) this.erros.push('Usuário já existe.');
        
    }

    valida() {
        //validação || email precisa ser valido || passwords precisa ter entre 5 e 50 caracterer
        this.cleanUp();

        if(!validator.isEmail(this.body.email)) this.erros.push('E-mail inválido');

        if(this.body.password.length < 5 || this.body.password.length > 50) {
            this.erros.push('A senha precisa ter entre 5 e 50 caracteres.');
        }
    }

    cleanUp() {
        for(const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        };
    }
}

module.exports = Login;