const { Token, User } = require('../models/index.js') 
const TokenController = { 
    getAll(req,res){  
        Token.findAll({
            include:[User]   
        })
        .then(tokens=>res.status(200).send(tokens))
        .catch(error=>{
            console.log(error);
            res.status(500).send({message: 'Ha surgido un error al intentar tramitar la petición.', error})
        })
    },
    getOneByUserId(req, res) { // Función para buscar un producto por el id del usuario que tiene asociado
        Token.findOne({  
            where:{
                UserId:req.params.id
            },
            include: [User]
        })
        .then(token => res.send(token))
        .catch(error=>{
            console.log(error);
            res.status(500).send({message: 'Ha surgido un error al intentar tramitar la petición.', error})
        })
    },
    delete(req,res){  
        Token.destroy({
            where:{
                id:req.params.id 
            }  
        })
        .then(res.status(200).send({
            message: "El token ha sido eliminado."
        }))
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar eliminar el token.'
            })
        })
    } 
}
module.exports = TokenController; 