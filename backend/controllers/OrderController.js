const { Order, Product, User, OrderProduct, Sequelize } = require('../models/index.js') 
const { Op } = Sequelize;                    // Importo Order para llamarlo después en el resto del archivo.
const OrderController = {                   // Importo Product, porque necesito incluir los productos en cada pedido
    getAll(req,res){                        // Importo OrderProduct porque le tengo que añadir el "OrderId", EL "ProductId" y el "productUnits" con el bulkCreate, en el insert
        Order.findAll({                     // Importo el Sequelize tambien para poder desestructurarlo luego y poder utilizar los operadores de Sequelize
            include:[Product],   // Aquí le digo que cuando me busque la información del pedido, me incluya también la información de la tabla de productos, ya que ambas tablas están relacionadas. 
            order: [
                ['deliveryDate', 'ASC']
            ]
        })
        .then(orders=>res.status(200).send(orders))  
        .catch(error=>{
            console.log(error);
            res.status(500).send({message: 'Ha surgido un error al intentar tramitar la petición.', error})
        })
    },
    getOne(req, res) { 
        Order.findByPk(req.params.id, {
                include: [Product]
            })
            .then(order => res.send(order))
            .catch(error=>{
                console.log(error);
                res.status(500).send({message: 'Ha surgido un error al intentar tramitar la petición.', error})
            })
    },
    // EN PEDIDOS NO TENEMOS CODIGO NI NOMBRE. SOLO BUSCARÍAMOS POR ID

    // getOneByCode(req, res) {   // Los pedidos no tienen numero de codigo por ahora
    //     Order.findOne({  
    //          where:{
    //             code:req.params.code
    //         },
    //         include: [Product]
    //     })
    //     .then(order => res.send(order))
    // },
    // getAllByName(req, res) {  // Los pedidos no tienen nombre
    //     Order.findAll({  
    //             where: { 
    //                 name: {
    //                     [Op.like]: `%${req.params.name}%` 
    //                 }  
    //             },
    //             include: [Product]
    //         })
    //         .then(order => res.send(order))
    // },

    insert(req,res){ 
        Order.create({  
            UserId: req.user.id, // Le digo que inserte una propiedad llamada UserId que tendrá dentro el UserId del cuerpo de la petición.
            deliveryDate:req.body.deliveryDate,  // Le digo que inserte una propiedad llamada deliveryDate que tendrá dentro lo que el usuario haya introducido como deliveryDate en el body de la petición
            status:"pending" // Le digo que inserte una propiedad status que irá por defecto con valor de "pending"
        })
        .then(order => { // Recorro los productos que hay en el pedido y meto en la tabla intermedia tanto el id del producto en la columna ProductId, como su cantidad en la columna productUnits utlizando el argumento options "through"
            for (let product of req.body.products){
                order.addProduct(product.id,{through: {productUnits:product.ammount}})
            }  // ESTO ES SUGERENCIA DE DAVID PARA MONICA
            res.status(201).send({
                message: "El pedido ha sido añadido.", order
            })
        })
        // .then(order=> {  // ESTA ES LA FORMA ANTIGUA EN QUE LO HACÍA ANTES DE LA SUGERENCIA DE DAVID
        //     const products = req.body.products.map(product=>({ // Aquí para cada pedido, le estoy diciendo que me haga una transformación con el map en el body de la peticion de productos, y le pido que me busque, mediante el spread "...", de entre todos los productos que hay en la tabla productos, el producto cuyo id coincide con el id de mi pedido
        //         ...product,OrderId:order.id,
        //     }));
        //     OrderProduct.bulkCreate(products);   // Después creo de golpe con el metodo "bulkCreate", todos los OrderId, que he guardado en la variable products y los meto en la tabla de cruce "OrderProduct"
        //     res.status(201).send({
        //         message: "El pedido ha sido añadido.", order
        //     })
        // })
        .catch(error=> {
            console.log(error);
            res.status(500).send({
                message: 'Ha habido un error al intentar añadir el pedido.'
            })
        })
    },

    // async insertMany(req,res){ 
    //     try {
    //     const orders =req.body;
    //     orders.forEach(async order=>{
    //         const orderCreated = await Order.create({
    //             UserId: order.UserId, 
    //             deliveryDate:order.deliveryDate,  
    //             status:"pending" 
    //         })
    //         const products = order.products.map(product=>({ 
    //             ...product,OrderId:orderCreated.id,
    //         }));
    //        await OrderProduct.bulkCreate(products); 
    //     }) 
    //     res.status(201).send({
    //         message:'Los pedidos han sido añadidos.', orders
    //     })
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).send({
    //             message: 'Ha habido un error al intentar añadir los pedidos.'
    //         })
    //     }
    // },
    async put(req, res) { 
        try{
            const order = await Order.update({...req.body}, 
                {
                    where: {
                        id: req.params.id  
                    }
                })
            await OrderProduct.destroy({ 
                    where: {
                        OrderId: req.params.id 
                    }    
            })
            req.body.products.forEach(product =>{  
                OrderProduct.create({  
                    OrderId: req.params.id,
                    ProductId: product.ProductId, // Aquí utilizo product.productId, para indicarle que me tiene que coger id en el objeto - Aquí, al hacer la peticion, tendré que decirle: "products": [{ProductId": 1},{"productUnits": 10}] para que me coja los ids de los productos y las unidades que quiera meter
                    productUnits: product.productUnits  // y aquí lo mismo.

                })    
            })
            res.send({message:'El pedido ha sido modificado.', order})
            
        } catch{(error=> {
                    console.log(error);
                     res.status(500).send({
                        message: 'Ha habido un error al intentar modificar el pedido.'
                    })
                })          

        }
    },     
      
    // LOS PEDIDOS NO SE BORRAN - EN TODO CASO SE CAMBIA EL STATUS    
   
    // delete(req,res){  
    //     Order.destroy({
    //         where:{
    //             id:req.params.id 
    //         }  
    //     }) 
    //     .then(()=>{
    //         OrderProduct.destroy({
    //             where:{
    //                 OrderId:req.params.id 
    //             }  
    //         }) 
    //         res.status(200).send({
    //         message: "El pedido ha sido eliminado."
    //     })
    // })
    //     .catch(error=> {
    //         console.log(error);
    //         res.status(500).send({
    //             message: 'Ha habido un error al intentar eliminar el pedido.'
    //         })
    //     })
    // },
    // deleteMany(req,res){  
    //     Order.destroy({
    //         where:{
    //             id:{
    //                 [Op.in]:req.body.id
    //             }
    //         }  
    //     })
    //     .then(()=>{
    //         OrderProduct.destroy({
    //             where:{
    //                 OrderId:{
    //                     [Op.in]:req.body.id
    //                 }
    //             }  
    //         }) 
    //         res.status(200).send({
    //         message: "Los pedidos han sido eliminados."
    //     })
    // }) 
    //     .catch(error=> {
    //         console.log(error);
    //         res.status(500).send({
    //             message: 'Ha habido un error al intentar eliminar los pedidos.'
    //         })
    //     })
    // }    
}
module.exports = OrderController; 

