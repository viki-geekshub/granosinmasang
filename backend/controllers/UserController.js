const { User, Order, Token, Sequelize } = require('../models/index.js');
const { Op } = Sequelize;

const bcrypt = require('bcryptjs');  // Importo el bcryptjs para encriptar las contraseñas
const jwt = require('jsonwebtoken');  // Importo el jsonwebtoken para crear tokens
const env = process.env.NODE_ENV || 'development'; // Defino el entorno dentro de la constante "env" y le digo que será cualquier entorno que le digamos en un momento dado o el de desarrollo 'development'
const { jwt_secret, API_URL } = require('../config/config.json')[env]; // Importo y desectructuro el secreto aquí y le añado la constante env (entre corchetes para decirle que es una variable) 
const transporter = require('../config/nodemailer');  // Importo el transporter (que es quien enviará los mails de confirmación)

const UserController = { 
    getAll(req,res){  
        User.findAll({
            include:[Order],
            order: [
                ['name', 'ASC']
            ]
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
                include: [Order],
                order: [
                    ['name', 'ASC']
                ]
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
            include: [Order],
            order: [
                ['name', 'ASC']
            ]
        })
        .then(user => res.send(user))
        .catch(error=>{
            console.log(error);
            res.status(500).send({message: 'Ha surgido un error al intentar tramitar la petición.', error})
        })
    },
    async register(req, res) {  // Función para registrar un usuario  // La tengo que hacer asíncrona por la encriptación, para que puedan registrarse varios usuarios a la vez y no tengan que estar esperando cola para registrarse
        try {
            // 1º - Encripto la contraseña:
            const textPassword = req.body.password; // Creo una constante para guardar dentro el password introducido por el usuario
            const hash = await bcrypt.hash(textPassword, 9);  // Creo otra para crear el hash y le doy como parámetros el password en texto plano y le digo que haga 9 rondas
            
            // 2º - Cuando el usuario se registre, se enviará un mail:
            const email= req.body.email;

            const emailToken = jwt.sign({ email }, jwt_secret, { expiresIn: '48h' }); // Creo el token. Lo firmo para el mail que corresponda, le añado el secreto para poderlo firmar y una caducidad de 48h
            const url = API_URL + '/users/confirm/' + emailToken; //Creo la url y le concateno el token recién creado y firmado.
            await transporter.sendMail({  // Función que envía el mail de confirmación de registro
                to: email,  // Le decimos a donde debe enviarlo
                subject: 'Confirme su registro en Grano Sin Más',  // Le decimos el asunto que debe llevar
                html: `
                <h2>¡Bienvenid@ ${req.body.name} a Grano Sin Más!</h2>
                <a href=${url}>Por favor, haz click aquí para confirmar tu registro.</a> <p>Este enlace caduca en 48 horas.</p>`
            });  // Y por último le decimos el texto que incluirá el mail y donde irá el link de confirmación.
            
            // 3º - Creo el registro como tal:
            const user = await User.create({...req.body, // Creo el registro del usuario con todas sus propiedades que vienen en el body de la petición
                password: hash, // pero le especifico que en el password me tiene que meter el hash creado anteriormente (que es la contraseña ya encriptada)
                role:"customer", // y que en el role ponga por defecto "customer". Con esto se sobreescribe el campo "role" para que siempre se registren inicialmente como "customer"
                confirmed: false // Añado por defecto que el campo confirmed sea falso. Así al registrarse el usuario siempre estará pendiente de confirmación. Esto cambiará cuando el usuario haga la confirmación en su mail.
            });

            // 4º - Envío la respuesta con un mensaje de aviso para el usuario:
            res.status(201).send({
                user, 
                message: 'Te hemos enviado un mail para confirmar tu registro.' // Y se lo avisamos al usuario con este mensaje
            });

            // 5º - Capturo el error
        } catch (error) {
            console.log(error)
            res.status(500).send({message: 'Ha surgido un error al intentar registrar el usuario.', error
            });
        }
    },
    async confirm(req,res){  // Función para confirmar el mail y el token del usuario de registro
        try{
            const emailToken = req.params.emailToken; // Cojo el token que me llega con la url al hacer el registro
            const payload = jwt.verify(emailToken, jwt_secret); // Realizo la verificación del token mediante el secreto para ver si es válido
            const email = payload.email; // Saco el mail del payload, porque me viene guardado dentro.
            await User.update({ // Función que modifica el campo "confirmed" de false (que venía por defecto) a true
                confirmed: true
            },{
                where:{ email }
            });
            const user = await User.findOne({where: {email}}); // Busco el usuario que tenga el mail que corresponda
            const authToken = jwt.sign({ // Firmo el token 
                id: user.id  
            }, jwt_secret);
            await Token.create({  //  Y creo el token en la base de datos
                token: authToken,
                UserId: user.id
            })
            res.redirect('http://localhost:4200/userconfirmed/' + authToken); // Redirijo al usuario confirmado a la vista de user-confirmed donde se le confirmará la confirmación del registro
        }catch(error) { 
            console.error(error)
            res.status(500).send('Ha surgido un problema en la confirmación de su email.')
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
            if(!user.confirmed){ // Si el usuario no esta confirmado, si el campo confirmed es "false", entonces devuelveme un error con un mensaje de aviso.
                return res.status(400).send({  // Meto aquí un return para que pare y no ejecute lo siguiente si el usuario no ha confirmado el mail. Porque return siempre es lo último que se ejecuta.
                    message: 'Debes confirmar tu email.' // Avisamos de que no podrá logearse sin confirmar antes el mail
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
        console.log(req.user);
        res.send(req.user.dataValues);
    }
}
module.exports = UserController; 