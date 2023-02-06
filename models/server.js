const cors = require('cors')
const express = require("express");

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios';

        // Middlewares
        this.middlewares();

        // Rutas de la aplicación
        this.routes();
    }


    middlewares() {

        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use( express.json())

        // Directorio Público
        this.app.use(express.static('public'));
    }

    routes() {
        
        this.app.use( this.usuariosPath, require('../routes/users.route'));        

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo puesto ', this.port);
        });
    }
}

module.exports = Server;
