const router = require('express').Router(); 
const SubcategoryController = require('../controllers/SubcategoryController.js'); 
const {authentication, isAdmin} = require('../middleware/authentication.js');

router.get('/',SubcategoryController.getAll);
router.get('/code/:code',authentication, isAdmin, SubcategoryController.getOneByCode);
router.get('/name/:name',SubcategoryController.getAllByName);
router.get('/:id',SubcategoryController.getOne);
router.post('/',authentication, isAdmin, SubcategoryController.insert);
router.post('/many',authentication, isAdmin, SubcategoryController.insertMany);
router.delete('/many',authentication, isAdmin, SubcategoryController.deleteMany);
router.delete('/:id',authentication, isAdmin, SubcategoryController.delete);
router.put('/:id',authentication, isAdmin, SubcategoryController.put);

module.exports = router; 