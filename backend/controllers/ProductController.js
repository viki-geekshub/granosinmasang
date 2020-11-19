const { Product, Recipe, Category, Subcategory, Store, Order, ProductCategory, RecipeProduct, StoreProduct, Sequelize, sequelize } = require('../models/index.js') // Aquí importo todos los modelos que voy a utilizar después:
// Estoy importando el archivo index.js que esta en la carpeta models porque de ahi puedo sacar todos los modelos que necesite
// y lo desestructuro para que solo me de las claves y los valores del producto y de la categoria. 
// Importo Product, porque necesito el modelo product para funcionar en OrderProduct (lo vamos a llamar muchas veces y si no se importa no lo encuentra.
// Importo Category Subcategory, Recipe, Store y Order porque necesito incluir todos ellos en cada producto
// También importo sus tablas intermedias por lo mismo.
// También importo el Sequelize para que me permita utilizar los operadores de Sequelize que me harán falta después en funciones posteriores
// Aquí quise importar también el "sequelize" para que me admitiese código sql puro pero como al final no lo tuve que utilizar, se puede borrar, porque ya no me hace falta importarlo.
const { Op } = Sequelize; // Desestruturo los operadores de sequelize aquí para poderlos utilizar luego

const ProductController = { // Creo la función controladora que tiene dentro varias funciones o metodos para hacer diferentes cosas
    getAll(req,res){  // Función para traerme todos los productos de la base de datos. 
        Product.findAll({
            include:[Category, Subcategory, Recipe, Store, Order],  // Aquí le digo que cuando me busque la información del producto, me incluya también la información de la tabla de categorías, y la de las recetas, ya que ambas tablas están relacionadas con la tabla products. 
            order: [
                ['id', 'ASC']
            ]
        })
        .then(products=>res.status(200).send(products)) // Aquí envío lo obtenido con el .findAll en la respuesta
        .catch(error=>{
            console.log(error);
            res.status(500).send({message: 'Ha surgido un error al intentar tramitar la petición.', error})
        })
    },
    getOne(req, res) { // Función para buscar un solo producto por su id
        Product.findByPk(req.params.id, {
                include: [Category, Subcategory, Recipe, Store, Order]
            })
            .then(product => res.send(product))
            .catch(error=>{
                console.log(error);
                res.status(500).send({message: 'Ha surgido un error al intentar tramitar la petición.', error})
            })
    },
    getOneByCode(req, res) { // Función para buscar un producto por su code
        Product.findOne({  
            where:{
                code:req.params.code
            },
            include: [Category, Subcategory, Recipe, Store, Order],
            order: [
                ['code', 'ASC']
            ]
        })
        .then(product => res.send(product))
        .catch(error=>{
            console.log(error);
            res.status(500).send({message: 'Ha surgido un error al intentar tramitar la petición.', error})
        })
    },
    getAllByName(req, res) {  // Función para buscar un producto por su nombre
        Product.findAll({  // Esto es como decirle: sequelize.query(`SELECT * FROM products WHERE name LIKE '%${req.params.name}%'`)
                where: {  
                    name: {
                        [Op.like]: `%${req.params.name}%` // Aquí le estoy diciendo que debe incluir el valor de lo que se introduzca en name en algún punto del name
                    }  // Uso el operador like para ello
                },
                include: [Category, Subcategory, Recipe, Store, Order],
                order: [
                    ['name', 'ASC']
                ]
            })
            .then(product => res.send(product))
            .catch(error=>{
                console.log(error);
                res.status(500).send({message: 'Ha surgido un error al intentar tramitar la petición.', error})
            })
    },
    insert(req,res){ // Función para insertar un producto 
        Product.create({...req.body,}) // Aquí le digo que me cree cada producto con sus propiedades dentro, las que nos vengan en el body de la petición
        .then(product=>{
            product.addCategory(req.body.CategoryId)  // Aquí creo una fila (row) en la tabla intermedia para meter el "CategoryId"
            product.addRecipe(req.body.RecipeId) // Aquí creo una fila (row) en la tabla intermedia para meter el "RecipeId"
            return product;
        })
        .then(product=> {  
            const stores = req.body.stores.map(store=>({ 
                ...store,ProductId:product.id,
            }));
            StoreProduct.bulkCreate(stores);
            res.status(201).send({
                message: "El producto ha sido añadido correctamente.", product
            })
        })
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar añadir el producto.'
            })
        })
    },
    async insertMany(req, res) { // Función para insertar varios productos a la vez como un array de objetos con sus propiedades en el body
        try {
            const products = req.body; // Guardo en products el cuerpo de la petición
            const productsResponse = [] // Creo un array vacío
            products.sort((a,b)=>a.id-b.id).forEach(async product => { // Ordeno los productos de mayor a menor según su el campo "id" y lo recorro con un forEach
                const productCreated = await Product.create({...product }); // En cada iteración nos crea cada producto con sus propiedades
                productCreated.addCategory(product.CategoryId);  // Le añado a la Tabla Category el CategoryId del producto
                productCreated.addRecipe(product.RecipeId); // Le añado a la Tabla Recipe el RecipeId del producto
                productsResponse.push(productCreated);  // Añado al array que estaba vacía el producto que he creado 
                product.stores.forEach(async store => { // Recorro cada Store para coger todos sus valores
                    const storeCreated = await StoreProduct.create({...store, ProductId: productCreated.id }); // y crear cada store con esos sus valores correspondientes y le digo que el ProductId será el id del producto creado
                    productsResponse.push(storeCreated);  // Añado al array el store que he creado también
                })
            })
            res.send({
                message: 'Los productos han sido añadidos.',
                products
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar añadir los productos.'
            })
        }
    },
    async put(req, res) { // Función para cambiar los datos de un producto y sus datos relacionados de las tablas intermedias
        try{
            const product = await Product.update({...req.body}, // Primero modifico los datos de la tabla Products
                {
                    where: {
                        id: req.params.id  // diciendole que modifique solo el del id que corresponda
                    }
                })
            await ProductCategory.destroy({ // Despues le digo que me borre los datos de la tabla intermedia ProductCategory
                    where: {
                        ProductId: req.params.id // donde el id sea el que corresponda
                    }    
                })
            await RecipeProduct.destroy({ // También le digo que me borre los datos de la tabla intermedia RecipeProduct
                    where: {
                        ProductId: req.params.id // donde el id sea el que corresponda
                    }    
                }) 
            await StoreProduct.destroy({ // También le digo que me borre los datos de la tabla intermedia StoreProduct
                    where: {
                        ProductId: req.params.id // donde el id sea el que corresponda
                    }    
                })   
            req.body.CategoryId.forEach(category =>{  // Luego recorro la tabla categories y para cada categoria, 
                ProductCategory.create({  //le digo que me cree, en la tabla intermedia ProductCategory, los siguientes campos:
                    ProductId: req.params.id, // El id del producto lo coge de los parametros de la url
                    CategoryId: category  // y el id de las categorias lo coge de categories, el cual ha sido recorrido con el forEach para darnos sus valores.
                })    // aquí utilizo solo category (sin indicarle que me coja el id, porque ya viene el id directamente en el objeto) - Aquí, al hacer la peticion, bastará con decirle: "categories": [1,2] para que me coja los ids de las categorías que quiera meter
             })
             req.body.RecipeId.forEach(recipe =>{ 
                RecipeProduct.create({  
                    ProductId: req.params.id,
                    RecipeId: recipe
                })
             })
             req.body.stores.forEach(store =>{ 
                StoreProduct.create({  
                    ProductId: req.params.id,
                    StoreId: store.StoreId,
                    ammount: store.ammount,
                    stockMin: store.stockMin,
                    stockMax: store.stockMax
                })
             })
            res.send({message:'El producto ha sido modificado.', product})
            
        } catch{(error=> {
                    console.log(error);
                     res.status(500).send({
                        message: 'Ha habido un error al intentar modificar el producto.'
                    })
                })          
        }
    },     
    delete(req,res){   // Función para borrar un producto
        Product.destroy({  // Aquí borra los datos de la tabla Productos
            where:{
                id:req.params.id 
            }  
        }) 
        .then(()=>{ // y aquí los datos de la tabla intermedia ProductCategory
            ProductCategory.destroy({
                where:{
                    ProductId:req.params.id 
                }  
            }) 
        })
        .then(()=>{ // y aquí los datos de la tabla intermedia RecipeProduct
            RecipeProduct.destroy({
                where:{
                    ProductId:req.params.id 
                }  
            }) 
        })
        .then(()=>{ // y aquí los datos de la tabla intermedia StoreProduct
            StoreProduct.destroy({
                where:{
                    ProductId:req.params.id 
                }  
            }) 
            res.status(200).send({
            message: "El producto ha sido eliminado."
            })
        })
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar eliminar el producto.'
            })
        })
    },
    deleteMany(req,res){  // Función para borrar varios productos a la vez
        Product.destroy({
            where:{
                id:{
                    [Op.in]:req.body.id  // Con esto cogemos el id de varios productos a la vez utilizando el operador "in" de sequelize. 
                }       // para poder utilizar el Op. in hemos tenido que importar previamente en la parte superior el Sequelize, el cual hemos desestructurado { Op }
            }  
        })
        .then(()=>{
            ProductCategory.destroy({
                where:{
                    ProductId:{
                        [Op.in]:req.body.id
                    }
                }  
            }) 
        }) 
        .then(()=>{
            RecipeProduct.destroy({
                where:{
                    ProductId:{
                        [Op.in]:req.body.id
                    }
                }  
            }) 
        }) 
        .then(()=>{
            StoreProduct.destroy({
                where:{
                    ProductId:{
                        [Op.in]:req.body.id
                    }
                }  
            }) 
            res.status(200).send({
                message: "Los productos han sido eliminados."
            })
        }) 
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar eliminar los productos.'
            })
        })
    }    
}
module.exports = ProductController;  // Aquí exporto la función ProductController.


