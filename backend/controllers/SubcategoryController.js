const { Subcategory, Category, Product, Sequelize } = require('../models/index.js') ;
const { Op } = Sequelize;
const SubcategoryController = { 
    getAll(req,res){ 
        Subcategory.findAll({
            include: [Category, Product] ,
            order: [
                ['code', 'ASC']
            ]
        })
        .then(subcategories=>res.status(200).send(subcategories))
        .catch(error=>{
            console.log(error);
            res.status(500).send({message: 'Ha surgido un error al intentar tramitar la petición.', error})
        })
    },
    getOne(req, res) { 
        Subcategory.findByPk(req.params.id, {
                include: [Category, Product]
            })
            .then(subcategory => res.send(subcategory))
            .catch(error=>{
                console.log(error);
                res.status(500).send({message: 'Ha surgido un error al intentar tramitar la petición.', error})
            })
    },
    getOneByCode(req, res) { 
        Subcategory.findOne({  
             where:{
                code:req.params.code
            },
            include: [Category, Product],
            order: [
                ['code', 'ASC']
            ]
        })
        .then(subcategory => res.send(subcategory))
        .catch(error=>{
            console.log(error);
            res.status(500).send({message: 'Ha surgido un error al intentar tramitar la petición.', error})
        })
    },
    getAllByName(req, res) { 
        Subcategory.findAll({  
                where: {  
                    name: {
                        [Op.like]: `%${req.params.name}%` 
                    }  
                },
                include: [Category, Product],
                order: [
                    ['code', 'ASC']
                ]
            })
            .then(subcategory => res.send(subcategory))
            .catch(error=>{
                console.log(error);
                res.status(500).send({message: 'Ha surgido un error al intentar tramitar la petición.', error})
            })
    },
    insert(req,res){ 
        Subcategory.create({...req.body}) 
        .then(subcategory => {
            subcategory.addProduct(req.body.ProductId)
            res.status(201).send({
                message: "La nueva subcategoría ha sido añadida correctamente.", subcategory
            })})
        
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar añadir la nueva subcategoría.'
            })
        })
    },
    // insertMany(req,res){  // ENDPOINT DE CONRADO
    //     Subcategory.bulkCreate([...req.body])
    //     .then(subcategory => res.status(201).send({message: 'Las nuevas categorías han sido añadidas.', subcategory
    // }))
    //     .catch(error => res.status(500).send('Ha habido un error al intentar añadir las nuevas categorías.'))
    // }
    async insertMany(req,res){  
        try {
          const subcategories =req.body;
          const subcategoriesResponse =[]
        //   subcategories.sort((a,b)=>+a.code- +b.code)
        //   console.log(subcategories)
          subcategories.sort((a,b)=>+a.code- +b.code).forEach(async subcategory=>{
            const subcategoryCreated = await Subcategory.create({...subcategory}); 
            subcategoryCreated.addProduct(subcategory.ProductId)
            subcategoriesResponse.push(subcategoryCreated)
          });
          res.send({
              message: 'Las nuevas subcategorías han sido añadidas.'
          })    
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar añadir las nuevas subcategorías.'
            })
        }           
    },
    async put(req, res) { // NO cambia los productos que tiene. (Solo cambia los campos de la subcategoría)
        try{
            const subcategory = await Subcategory.update({...req.body}, 
                {
                    where: {
                        id: req.params.id  
                    }
                })
            res.send({message:'La subcategoría ha sido modificada.', subcategory})
        } catch{(error=> {
                    console.log(error);
                     res.status(500).send({
                        message: 'Ha habido un error al intentar modificar la subcategoría.'
                    })
                })          
        }
    },     
    delete(req,res){   
        Subcategory.destroy({
            where:{
                id:req.params.id 
            }  
        }) 
        .then(()=>{
            res.status(200).send({
            message: "La subcategoría ha sido eliminada."
        })
    })
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar eliminar la subcategoría.'
            })
        })
    },
    deleteMany(req,res){  
        Subcategory.destroy({
            where:{
                id:{
                    [Op.in]:req.body.id
                }
            }  
        })
        .then(()=>{
            res.status(200).send({
                message: "Las subcategorías han sido eliminadas."
        })
    }) 
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar eliminar las subcategorías.'
            })
        })
    }    
}
module.exports = SubcategoryController; 