const { Store, Product, StoreProduct, Sequelize } = require('../models/index.js') ;
const { Op } = Sequelize;
const StoreController = { 
    getAll(req,res){  
        Store.findAll({
            include:[Product]   
        })
        .then(stores=>res.status(200).send(stores))
        .catch(error=>{
            console.log(error);
            res.status(500).send({message: 'Ha surgido un error al intentar tramitar la petición.', error})
        })
    },
    getOne(req, res) { 
        Store.findByPk(req.params.id, {
                include: [Product]
            })
            .then(store => res.send(store))
            .catch(error=>{
                console.log(error);
                res.status(500).send({message: 'Ha surgido un error al intentar tramitar la petición.', error})
            })
    },
    getAllByName(req, res) { 
        Store.findAll({  
                where: {  
                    name: {
                        [Op.like]: `%${req.params.name}%` 
                    }  
                },
                include: [Product]
            })
            .then(store => res.send(store))
            .catch(error=>{
                console.log(error);
                res.status(500).send({message: 'Ha surgido un error al intentar tramitar la petición.', error})
            })
    },
    insert(req,res){ 
        Store.create({...req.body})
        .then(store=> {  
            const products = req.body.products.map(product=>({ 
                ...product,StoreId:store.id,
            }));
            StoreProduct.bulkCreate(products);
            res.status(201).send({
                message: "El almacén ha sido añadido.", store
            })
        })
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar añadir el almacén.'
            })
        })
    },
    async put(req, res) { 
        try{
            const store = await Store.update({...req.body}, 
                {
                    where: {
                        id: req.params.id  
                    }
                })
            await StoreProduct.destroy({ 
                    where: {
                        StoreId: req.params.id 
                    }    
            })
            req.body.products.forEach(product =>{  
                StoreProduct.create({  
                    StoreId: req.params.id,
                    ProductId: product.ProductId,
                    ammount: product.ammount,
                    stockMin: product.stockMin,
                    stockMax: product.stockMax
                })    
            })
            res.send({message:'Los datos del almacén han sido modificados.', store})
        } catch{(error=> {
                    console.log(error);
                     res.status(500).send({
                        message: 'Ha habido un error al intentar modificar los datos del almacén.'
                    })
                })      
        }
    },     
    delete(req,res){  
        Store.destroy({
            where:{
                id:req.params.id 
            }  
        }) 
        .then(()=>{
            StoreProduct.destroy({
                where:{
                    StoreId:req.params.id 
                }  
            }) 
            res.status(200).send({
            message: "Los datos del almacén han sido eliminados."
        })
    })
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar eliminar los datos del almacén.'
            })
        })
    },
}
module.exports = StoreController; 