const jwt = require('jsonwebtoken');  
const { User, Token, Sequelize } = require('../models/index.js'); // importo el modelo Token porque vamos a comprobar el token en la tabla de tokens de la base de datos y el Sequelize
const { Op } = Sequelize; // desestructuro los operadores de Sequelize porque los vamos a utilizar en el tokenFound
const env = process.env.NODE_ENV || 'development'; 
const { jwt_secret } = require('../config/config.json')[env];

const authentication = async(req,res,next)=>{ 
    try{
        const token = req.headers.authorization; // Saco el token de los headers, donde lo había guardado
        const payload = jwt.verify(token,jwt_secret);  // Saco el payload de token
        const user = await User.findByPk(payload.id); // Busco el usuario en la base de datos con el id del payload
        const tokenFound = await Token.findOne({ // Aquí compruebo que el token coincida con el usuario. Busco el token y lo guardo en la variable tokenFound
            where:{ // y le digo que donde el token sea el token y el UserId sea el id del payload (que es lo que hemos verificado antes): 
                [Op.and]:[{ // Uso el operador de Sequelize "and" para compborar las dos condiciones y decirle que tienen que cumplirse ambas para ser válido
                    token:token // primera condición : que el token sea el correcto
                },{
                    UserId: payload.id // segunda condición: que el usuario sea el correcto
                }]
            }
        })
        if(!user || !tokenFound){ // y le digo que tanto si el user esta mal como si el token encontrado esta mal,
            res.status(401).send({  //  entonces me da mensaje de error: 
                message: 'No tienes autorización.',
                error
            })
        }
        req.user=user;  // Si todo ha ido bien, meto el usuario en el objeto request. Seteamos el usuario en el objeto request
        next(); // Le digo next para que pase a la siguiente línea y siga ejecutando código. Si no se lo ponemos, se quedaría parado en el primer parámetro, en el de autenticación, y no pasaría al getInfo. Pasamos a la siguiente función controladora o al siguiente middleware.
    } catch (error) {
        res.status(401).send({error, message: 'No tienes autorización.'});
    }    
}
const isAdmin = async (req,res,next)=>{
    const admins = ['superadmin', 'admin'];
    if(!admins.includes(req.user.role)){ // esto es como decirle: if(req.user.role !== 'admin' || req.user.role !== 'superAdmin') {
        return res.status(403).send({message: 'No tienes permisos para realizar esta gestión.'
        })
    }
    next();
}
const isSuperAdmin = async (req,res,next)=>{
    if(req.user.role !== 'superadmin'){ // esto es como decirle: if(req.user.role !== 'admin' || req.user.role !== 'superAdmin') {
        return res.status(403).send({message: 'No tienes permisos para realizar esta gestión.'
        })
    }
    next();
}
module.exports = {authentication, isAdmin, isSuperAdmin};