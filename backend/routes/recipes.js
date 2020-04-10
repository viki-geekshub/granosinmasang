const router = require('express').Router(); 
const RecipeController = require('../controllers/RecipeController.js'); 
const {authentication, isAdmin} = require('../middleware/authentication.js');

router.get('/',RecipeController.getAll);
router.get('/name/:name',RecipeController.getAllByName);
router.get('/:id',RecipeController.getOne);
router.post('/',authentication, isAdmin, RecipeController.insert);
router.post('/many',authentication, isAdmin, RecipeController.insertMany);
router.delete('/many',authentication, isAdmin, RecipeController.deleteMany);
router.delete('/:id',authentication, isAdmin, RecipeController.delete);
router.put('/:id',authentication, isAdmin, RecipeController.put);

module.exports = router; 