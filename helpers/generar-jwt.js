const jwt = require('jsonwebtoken')

const generarJWT = (uid = '') => {

    return new Promise( (resolve, reject) => {
        // Solo guardo el uid del body del payload
        const payload = { uid };
        // Genero el JWT
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h' // fecha de expiración
        }, ( err, token ) => {
            // Si se presenta un error
            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el jwt' )
            } else {
                resolve( token ); // Si no, se entrega el token
            }
        } )

    } )


}


module.exports = {
    generarJWT
}

