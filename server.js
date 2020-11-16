/*
 * App.js
 ******************************/

// Modul pour cacher les mot de pass et autre
require('dotenv').config()

// Import de module
const
    express = require('express'),
    app = express(),
    hbs = require('express-handlebars'),
    methodOverride = require('method-override'),
    mongoose = require('mongoose'), // Passerel pour communiquer avec la base de donnée MongoDB
    session = require('express-session'), // Permet de gere les session utilisateur du site
    bodyParser = require('body-parser'), // Modul pour traiter les formulaires
    morgan = require('morgan'), // Module pour debuger
    sharp = require('sharp'), // modul pour redimenssionner les images
    // helpers = require('handlebars-helpers')(), // modul pour limiter le nombre dans un array
    port = process.env.PORT;

app.use(methodOverride('_method'))

// Test Swagger
const swaggerUi = require('swagger-ui-express')
    // expressOasGenerator = require('express-oas-generator')
    // expressOasGenerator.init(app, {});
// const swagger à decommenter quand json ok
// const swaggerDocument = require('./api/config/swagger.json')
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Base de donnée ...............................................
// pour mongodb cloud   // mongoose.connect('mongodb+srv://blog:<password>@cluster0.uurc9.mongodb.net/<dbname>?retryWrites=true&w=majority'     
// blog le nom de la collection et <password> le mot de passe collection

// mongoose.connect(process.env.PORTMDBCLOUD, {
mongoose.connect(process.env.PORTMDB, {
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