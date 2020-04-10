const router = require('express').Router(); 
const OrderController = require('../controllers/OrderController.js'); 
const {authentication, isAdmin} = require('../middleware/authentication.js');

router.get('/',authentication, isAdmin, OrderController.getAll);
// router.get('/code/:code',OrderController.getOneByCode); // En pedidos solo habrá busqueda por id porque no tiene code ni name
// router.get('/name/:name',OrderController.getAllByName);
router.get('/:id',authentication, isAdmin, OrderController.getOne); 
router.post('/',authentication, OrderController.insert);
// router.post('/many',authentication, isAdmin, OrderController.insertMany);
// router.delete('/many',OrderController.deleteMany) // no se borran los pedidos
// router.delete('/:id',OrderController.delete)
router.put('/:id',authentication, isAdmin, OrderController.put);


module.exports = router;