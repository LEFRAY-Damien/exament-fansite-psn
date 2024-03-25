/*
 * App.js
 ******************************/

// Modul pour cacher les mot de pass et autre
require('dotenv').config()

// Import de module
const
    express = require('express'),
    cookieParser = require('cookie-parser'),
    app = express(),
    hbs = require('express-handlebars'),
    methodOverride = require('method-override'),
    mongoose = require('mongoose'), // Passerel pour communiquer avec la base de donnée MongoDB
    session = require('express-session'), // Permet de gere les session utilisateur du site
    bodyParser = require('body-parser'), // Modul pour traiter les formulaires
    morgan = require('morgan'), // Module pour debuger
    sharp = require('sharp'), // modul pour redimenssionner les images
    MongoStore = require('connect-mongo'),
    expressSession = require('express-session'),
    // helpers = require('handlebars-helpers')(), // modul pour limiter le nombre dans un array
    port = 3000;

// Cookie-Parser
app.use(cookieParser())

app.use(methodOverride('_method'))

app.disable('x-powered-by');

// Test Swagger
const swaggerUi = require('swagger-ui-express')
// expressOasGenerator = require('express-oas-generator')
// expressOasGenerator.init(app, {});
// const swagger à decommenter quand json ok
// const swaggerDocument = require('./api/config/swagger.json')
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Base de donnée ...............................................
// pour mongodb cloud   

// Mongoose -- 4 -- Base de donnée
mongoose.connect('mongodb://localhost:27017/NodeJs-ps+', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
// .............................................................

// register-helper ...... limite le nombre de post 
// Handlebars.registerHelper('limit', function (arr, limit) {
//     if (!Array.isArray(arr)) { return []; }
//     return arr.slice(0, limit);
// });
//.......................................................

// modul morgan debuggeur http    
app.use(morgan('dev'));

// Handlebars
const { limit, striptag } = require('./helpers/hbs')
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    helpers: {
        limit: limit,
        striptag: striptag
    },
    extname: 'hbs',
    defaultLayout: 'main',
    adminLayout: 'adminLayout'
}));

// Express static permet de diriger un chemin sur un dossier en particulier
app.use('/assets', express.static('public'));

// Body parser permet de parser les data d'une page à l'autre en passant par les controllers, ... 
// Parser = https://fr.wiktionary.org/wiki/parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true // -> A VOIR EN FALSE
}));

// save session avec MongoDB 
const mongoStore = MongoStore(expressSession)

// Express-session -- Crée des session utilisateur ou admin
app.use(expressSession({
    secret:'securite' ,
    name: 'cookie-sess',
    saveUninitialized: true,
    resave: false,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
  }));

// Notre router permettra de diriger des chemins 'URL' sur les actions 'Controller' qui distriburont nos pages, ... 
// CRUD = GET / POST / PUT / DELETE
const ROUTER = require('./api/router');
app.use('/', ROUTER)

// app.use((req, res) => {
//     res.render('err404')
// })

// Ensuite nous demandons a express (app) de run notre projet.
app.listen(port, () => {
    console.log("le serveur tourne sur le prt: " + port, "lancé à:" + new Date().toLocaleString());
});

module.exports = app
