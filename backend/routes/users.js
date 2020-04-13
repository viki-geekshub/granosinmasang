const router = require('express').Router(); 
const UserController = require('../controllers/UserController.js'); 
const {authentication, isAdmin, isSuperAdmin} = require('../middleware/authentication.js'); // importo desestructurados losmiddleware de la authenticación y el isAdmin
const { User } = require('../models/index.js');  // importo el index.js de la carpeta models

router.get('/',authentication, isAdmin, UserController.getAll);
router.get('/name/:name',authentication, isAdmin, UserController.getAllByName);
router.get('/email/:email',authentication, isAdmin, UserController.getOneByemail);
router.get('/info',authentication, isAdmin, UserController.getInfo);  // Creo la ruta para conseguir información según el token a la función getInfo. Le metemos tres parametros, el de la autenticación, el isAdmin y el del UserController para la búsqueda de información.
router.get('/:id',authentication, isAdmin, UserController.getOne);

router.get('/confirm/:emailToken',UserController.confirm);  // Creo la ruta para enviar el mail de confirmación de registro
router.post('/register',UserController.register); // Creo la ruta para registrar un usuario (REGISTRO)
router.post('/login',UserController.login); // Creo la ruta para logear un usuario (REGISTRO)
        // El login lo ponemos post, aunque debería ser get, por seguridad, para que no se vea en la url al hacer el envío de la petición
router.delete('/:id',authentication, isAdmin, UserController.delete);

router.put('/role/:id',authentication, isSuperAdmin, UserController.putRole);  // Creo la ruta para cambiar solo el role
router.put('/:id',authentication, isAdmin, UserController.put); 

module.exports = router;