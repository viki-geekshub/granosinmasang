const router = require('express').Router(); 
const CategoryController = require('../controllers/CategoryController.js'); 
const {authentication, isAdmin} = require('../middleware/authentication.js');

router.get('/',CategoryController.getAll);
router.get('/code/:code',authentication, isAdmin, CategoryController.getOneByCode);
router.get('/name/:name',CategoryController.getAllByName);
router.get('/:id',CategoryController.getOne);
router.post('/',authentication, isAdmin, CategoryController.insert);
router.post('/many',authentication, isAdmin, CategoryController.insertMany);
router.delete('/many',authentication, isAdmin, CategoryController.deleteMany);
router.delete('/:id',authentication, isAdmin, CategoryController.delete);
router.put('/:id',authentication, isAdmin, CategoryController.put);

module.exports = router; 