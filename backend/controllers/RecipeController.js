const { Recipe, Product, RecipeProduct, Sequelize } = require('../models/index.js') ;
const { Op } = Sequelize;
const RecipeController = { 
    getAll(req,res){  
        Recipe.findAll({
            include:[Product],
            order: [
                ['name', 'ASC']
            ] 
        })
        .then(recipes=>res.status(200).send(recipes))
        .catch(error=>{
            console.log(error);
            res.status(500).send({message: 'Ha surgido un error al intentar tramitar la petición.', error})
        })
    },
    getOne(req, res) { 
        Recipe.findByPk(req.params.id, {
                include: [Product]
            })
            .then(recipe => res.send(recipe))
            .catch(error=>{
                console.log(error);
                res.status(500).send({message: 'Ha surgido un error al intentar tramitar la petición.', error})
            })
    },
    getAllByName(req, res) { 
        Recipe.findAll({  
                where: {  
                    name: {
                        [Op.like]: `%${req.params.name}%` 
                    }  
                },
                include: [Product],
                order: [
                    ['name', 'ASC']
                ]
            })
            .then(recipe => res.send(recipe))
            .catch(error=>{
                console.log(error);
                res.status(500).send({message: 'Ha surgido un error al intentar tramitar la petición.', error})
            })
    },
    insert(req,res){ 
        Recipe.create({...req.body}) 
        .then(recipe=>{
            recipe.addProduct(req.body.ProductId) 
            res.status(201).send({
                message: "La nueva receta ha sido añadida correctamente.", recipe
            }) 
        })
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar añadir la nueva receta.'
            })
        })
    },
    async insertMany(req,res){  
        try {
          const recipes =req.body;
          const recipesResponse =[]
          recipes.sort((a,b)=>a.code-b.code).forEach(async recipe=>{
            const recipeCreated = await Recipe.create({...recipe}); 
            recipeCreated.addProduct(recipe.ProductId);
            recipesResponse.push(recipeCreated)
          });
          res.send({
              message: 'Las nuevas recetas han sido añadidas.', recipes
          })    
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar añadir las nuevas recetas.'
            })
        }           
    },
    async put(req, res) { 
        try{
            const recipe = await Recipe.update({...req.body}, 
                {
                    where: {
                        id: req.params.id  
                    }
                })
            await RecipeProduct.destroy({ 
                    where: {
                        RecipeId: req.params.id 
                    }    
            })
            req.body.products.forEach(product =>{  
                RecipeProduct.create({  
                    RecipeId: req.params.id,
                    ProductId: product
                })    
            })
            res.send({message:'Los datos de la receta han sido modificados.', recipe})
            
        } catch{(error=> {
                    console.log(error);
                     res.status(500).send({
                        message: 'Ha habido un error al intentar modificar los datos de la receta.'
                    })
                })          
        }
    },     
    delete(req,res){   
        Recipe.destroy({
            where:{
                id:req.params.id 
            }  
        }) 
        .then(()=>{
            RecipeProduct.destroy({
                where:{
                    RecipeId:req.params.id 
                }  
            }) 
            res.status(200).send({
            message: "La receta ha sido eliminada."
        })
    })
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar eliminar la receta.'
            })
        })
    },
    deleteMany(req,res){  
        Recipe.destroy({
            where:{
                id:{
                    [Op.in]:req.body.id
                }
            }  
        })
        .then(()=>{
            RecipeProduct.destroy({
                where:{
                    RecipeId:{
                        [Op.in]:req.body.id
                    }
                }  
            }) 
            res.status(200).send({
                message: "Las recetas han sido eliminadas."
        })
    }) 
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar eliminar las recetas.'
            })
        })
    }    
}
module.exports = RecipeController; 