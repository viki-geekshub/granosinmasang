const { User, Order, Token, Sequelize } = require('../models/index.js');
const { Op } = Sequelize;

const bcrypt = require('bcryptjs');  // Importo el bcryptjs para encriptar las contraseñas
const jwt = require('jsonwebtoken');  // Importo el jsonwebtoken para crear tokens
const env = process.env.NODE_ENV || 'development'; // Defino el entorno dentro de la constante "env" y le digo que será cualquier entorno que le digamos en un momento dado o el de desarrollo 'development'
const { jwt_secret } = require('../config/config.json')[env]; // Importo y desectructuro el secreto aquí y le añado la constante env (entre corchetes para decirle que es una variable) 

const UserController = { 
    getAll(req,res){  
        User.findAll({
            include:[Order]  
        })
        .then(users=>res.status(200).send(users))
        .catch(error=>{
            console.log(error);
            res.status(500).send({message: 'Ha surgido un error al intentar tramitar la petición.', error})
        })
    },
    getOne(req, res) { 
        User.findByPk(req.params.id, {
                include: [Order]
            })
            .then(user => res.send(user))
            .catch(error=>{
                console.log(error);
                res.status(500).send({message: 'Ha surgido un error al intentar tramitar la petición.', error})
            })
    },
    getAllByName(req, res) { 
        User.findAll({  
                where: {  
                    name: {
                        [Op.like]: `%${req.params.name}%` 
                    }  
                },
                include: [Order]
            })
            .then(user => res.send(user))
            .catch(error=>{
                console.log(error);
                res.status(500).send({message: 'Ha surgido un error al intentar tramitar la petición.', error})
            })
    },
    getOneByemail(req, res) { // Función para buscar un usuario por su email de registro
        User.findOne({  
            where:{
                email:req.params.email
            },
            include: [Order]
        })
        .then(user => res.send(user))
        .catch(error=>{
            console.log(error);
            res.status(500).send({message: 'Ha surgido un error al intentar tramitar la petición.', error})
        })
    },
    async register(req, res) {  // Función para registrar un usuario  // La tengo que hacer asíncrona por la encriptación, para que puedan registrarse varios usuarios a la vez y no tengan que estar esperando cola para registrarse
        try {
            const textPassword = req.body.password; // Creo una constante para guardar dentro el password introducido por el usuario
            const hash = await bcrypt.hash(textPassword, 9);  // Creo otra para crear el hash y le doy como parámetros el password en texto plano y le digo que haga 9 rondas
            const user = await User.create({...req.body, // Creo el registro del usuario con todas sus propiedades que vienen en el body de la petición
                password: hash, // pero le especifico que en el password me tiene que meter el hash creado anteriormente (que es la contraseña ya encriptada)
                role:"customer", // y que en el role ponga por defecto "customer". Con esto se sobreescribe el campo "role" para que siempre se registren inicialmente como "customer"
                confirmed: false // Añado por defecto que el campo confirmed sea falso. Así al registrarse el usuario siempre estará pendiente de confirmación. Esto cambiará cuando el usuario haga la confirmación en su mail.
            })
            res.status(201).send({user, message: 'Usuario registrado correctamente.'})
        } catch (error) {
            console.log(error)
            res.status(500).send({message: 'Ha surgido un error al intentar registrar el usuario.', error
            })
        }
    },
    async login(req,res) {  // Función para conectarse  
        try{
            const user = await User.findOne({
                where: {
                    email:req.body.email,
                }
            })
            if(!user){
                    return res.status(400).send({  // Meto aquí un return para que pare y no ejecute lo siguiente si el usuario es incorrecto. Porque return siempre es lo último que se ejecuta.
                        message: 'Usuario o contraseña incorrectos.'
                    }); 
                }
            const hash = user.password; // user.password es el password con el hash ya incluido
            const textPassword = req.body.password; // req.body.password es el texto plano de la contraseña (sin hash)
            
            const isMatch = await bcrypt.compare(textPassword, hash); // Aqui uso el método compareSync para comparar si el texto plano puede dar lugar al hash que nos han pasado
            if(!isMatch){ // Si no hay coincidencia, me devuelve un status 400 y un mensaje de error
                return res.status(400).send({message: 'Usuario o contraseña incorrectos.'});
            } // Si hay coincidencia, me devuelve el usuario, el token y un mensaje de bienvenida.
            
            const token = jwt.sign({id:user.id}, jwt_secret); // Creo el token con el metodo sign (lo firmo) y le doy como parametros el id que corresponda y el jwt_secret. No le pongo caducidad. Si se la quiero poner lo haría con {expiresIn:1d} --> para un 1 día, por ejemplo
            Token.create({UserId: user.id, token});  // Guardo el token en la base de datos  
            res.status(200).send({  // Envío el usuario, el token y el mensaje de bienvenida. El status(200) no es obligatorio ponerlo, porque ya sale por defecto
                user, 
                token,
                message: 'Bienvenid@ ' + user.name  
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({error, message: 'Hubo un problema en la conexión.'})
        }
    },
    async put(req,res){ // Función para modificar todos los datos del usuario menos el role
        try{
            const textPassword = req.body.password; 
            const hash = await bcrypt.hash(textPassword, 9);
            const user = await User.update({ 
                name: req.body.name,
                surnames: req.body.surnames,
                email: req.body.email,
                password: hash,
                dni: req.body.dni,
                address: req.body.address,
                phone: req.body.phone,
                observations: req.body.observations
            },{
                where: {id:req.params.id}
            })
            await User.findByPk(req.params.id)
            res.status(200).send({
                message: "Los datos del usuario han sido modificados correctamente.", user
            })
        } catch(error) {
            console.log(error);
            res.status(500).send({
                message:'Ha habido un error al intentar modificar los datos del usuario.'
            })
        }    
    },
    async putRole(req,res){ // Función para modificar el role de un usuario (solo para superadmin)
        try{
            const user = await User.update({
                role: req.body.role
            },{
                where: {id:req.params.id}
            })
            await User.findByPk(req.params.id)
            res.status(200).send({
                message: "Los permisos han sido modificados correctamente.", user
            })
        } catch(error) {
            console.log(error);
            res.status(500).send({
                message:'Ha habido un error al intentar modificar los permisos.'
            })
        }    
    },
    delete(req,res){   
        User.destroy({
            where:{
                id:req.params.id 
            }  
        }) 
        .then(()=>{
            Token.destroy({
                where:{
                    UserId:req.params.id 
                }  
            }) 
            Order.destroy({
                where:{
                    UserId:req.params.id 
                }  
            }) 
            res.status(200).send({
            message: "El usuario ha sido eliminado."
        })
    })
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar eliminar el usuario.'
            })
        })
    },
    async getInfo(req,res){  // Endpoing para que nos dé la información del usuario. Hace lo mismo que el getOne, pero de otro modo. Aquí le estamos diciendo que nos devuelva el usuario, que viene ya guardado en la petición. (PERO NO NOS TRAE LOS PEDIDOS)
        res.send(req.user);
    }
}
module.exports = UserController; 