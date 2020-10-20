// Import
const express = require('express'),
    router = express.Router(),
    path = require('path'),
    upload = require('./config/multer')

// Controller
const homeController = require('./controllers/homeController'),
    contactController = require('./controllers/contactController'),
    archivesController = require('./controllers/archivesController'),
    article_idController = require('./controllers/article_idController'),
    loginController = require('./controllers/loginController'),
    freetoplayController = require('./controllers/freetoplayController'),
    modalController = require('./controllers/modalController'),
    gameController = require('./controllers/gameController'),
    monthController = require('./controllers/monthController'),
    adminController = require('./controllers/adminController'),
    adminAcceuilController = require('./controllers/adminAcceuilController')

// Home
router.route('/')
    .get(homeController.get)

// Contact
router.route('/contact')
    .get(contactController.get)

// Archives
router.route('/archives')
    .get(archivesController.get)

// Article ID
router.route('/article_id')
    .get(article_idController.get)

// Login
router.route('/login')
    .get(loginController.get)

// Free To Play
router.route('/freetoplay')
    .get(freetoplayController.get)

// modal
router.route('/modal')
    .get(modalController.get)

// admin article ID
router.route('/admin')
    .get(adminController.get)
    .post(upload.single('imageCard'), adminController.postArticleId)

// Admin Acceuil
router.route('/admin/acceuil')
    .get(adminAcceuilController.getAcceuil)
    .post(adminAcceuilController.postAcceuil)

// voir archives
router.route('/game')
    .get(gameController.getGame)
    .post(gameController.createGame)

// voir archives
router.route('/month')
    .get(monthController.getMonth)
    .post(monthController.createMonth)

module.exports = router;