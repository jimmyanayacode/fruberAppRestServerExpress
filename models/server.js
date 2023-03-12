const cors = require('cors')
const express = require("express");
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usersPath = '/api/users';

        //Conectar a base datos
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Rutas de la aplicación
        this.routes();
    }

    async connectDB(){
        await dbConnection();
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
        
        this.app.use( this.usersPath, require('../routes/users'));        

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo puesto ', this.port);
        });
    }
}

module.exports = Server;
