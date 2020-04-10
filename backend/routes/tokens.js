const router = require('express').Router(); 
const TokenController = require('../controllers/TokenController.js'); 
const {authentication, isAdmin} = require('../middleware/authentication.js');

router.get('/',authentication, isAdmin, TokenController.getAll);
router.get('/:id',authentication, isAdmin, TokenController.getOneByUserId);
router.delete('/:id',authentication, isAdmin, TokenController.delete);

module.exports = router; 