const express = require("express")
const cors = require('cors');
const { dbConn } = require("../db/config");


class Server {

    constructor() {

        this.app    = express();
        this.port   = process.env.PORT;

        this.paths = {
            auth:           '/api/auth',
            categorias:     '/api/categorias',
            laboratorios:   '/api/laboratorios',
            presentaciones: '/api/presentaciones',
            productos:      '/api/productos',
            users:          '/api/users'
        }


        // COnexion a mongo db
        this.conectarDB()


        // Middlewares
        this.middlewares()

        // llamo las rutas 
        this.routes()

    }
    // Metodo de conexion a mongo
    async conectarDB() {

        await dbConn()
        
    }

    middlewares() {
        // CORS
        this.app.use( cors() )

        // lectura y parseo del body
        this.app.use( express.json() )

        // Directorio publico
        this.app.use( express.static('public') )
    }

    routes() {

        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.laboratorios, require('../routes/laboratorios'))
        this.app.use(this.paths.categorias, require('../routes/categorias'))
        this.app.use(this.paths.presentaciones, require('../routes/presentaciones'))
        this.app.use(this.paths.productos, require('../routes/productos'))
        this.app.use(this.paths.users, require('../routes/user'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port)
        })
    }

}



module.exports = Server