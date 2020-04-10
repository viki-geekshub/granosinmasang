const router = require('express').Router(); 
const StoreController = require('../controllers/StoreController.js'); 
const {authentication, isAdmin} = require('../middleware/authentication.js');

router.get('/',authentication, isAdmin, StoreController.getAll);
router.get('/name/:name',authentication, isAdmin, StoreController.getAllByName);
router.get('/:id',authentication, isAdmin, StoreController.getOne);
router.post('/',authentication, isAdmin, StoreController.insert);
router.delete('/:id',authentication, isAdmin, StoreController.delete);
router.put('/:id',authentication, isAdmin, StoreController.put);

module.exports = router; 