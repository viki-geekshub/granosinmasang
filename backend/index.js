const express = require('express'); // importo la dependencia express
const morgan = require('morgan'); // importo el morgan
const app = express();  // creo el servidor con express
const PORT = process.env.PORT || 3000; // levanto el puerto 3000 y le añado la posibilidad de cambiar a otro puerto cuando queramos exportandolo si fuese necesario con los comandos: "export PORT=3001" + "nodemon index.js"

const productsRouter = require('./routes/products.js'); // importo el archivo products de las rutas
const categoriesRouter = require('./routes/categories.js');
const ordersRouter = require('./routes/orders.js');
const usersRouter = require('./routes/users.js'); // importo el archivo users de las rutas (REGISTRO)
const tokensRouter = require('./routes/tokens.js'); // importo el archivo tokens de las rutas (TOKENS)
const storesRouter = require('./routes/stores.js'); // importo el archivo stores de las rutas
const recipesRouter = require('./routes/recipes.js');  // importo el archivo recipes de las rutas

app.use(morgan('dev'));  // Le digo al servidor "app" que use el morgan con su propiedad 'dev' que nos dará la información en colores.
app.use(express.json()); // para evitar que req.body sea undefined. Parseo a json lo que nos llega de la petición

app.use(function(req, res, next) {  // Añado el CORS para que nos permita hacer peticiones 
    res.header("Access-Control-Allow-Origin", "*");  // el * es para decirle que nos permita hacer peticiones desde todos los dominios
    res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"); // He añadido aquí el Authorization, X-API-KEY, Access-Control-Allow-Request-Method
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS"); // añado los diferentes metodos que queremos que nos permita implementar
    next();
  });
  
app.use(express.urlencoded({extended:false})); // para parsear a json un tipo de body que nos llega de la petición

app.use('/products',productsRouter); // Añado las rutas de products
app.use('/categories',categoriesRouter); 
app.use('/orders',ordersRouter); 
app.use('/users',usersRouter); // Añado la ruta de users // users es el prefix (REGISTRO)
app.use('/tokens',tokensRouter);   // Añado la ruta de tokens (TOKENS)
app.use('/stores',storesRouter);   // Añado la ruta de stores
app.use('/recipes',recipesRouter);  // Añado la ruta de recipes

app.listen(PORT, ()=>console.log('server running on ' + PORT));  // Pongo al puerto a escuchar peticiones
