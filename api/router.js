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
    adminController = require('./controllers/adminController')

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

// admin
router.route('/admin')
    .get(adminController.get)
    .post(upload.single('imageCard'), adminController.postArticleId)
    //.post(upload.fields([{ name: 'imageCard', maxCount: 1 }, { name: 'imagesCarouselId', maxCount: 6 }]), adminController.postArticleId)

// voir archives
router.route('/game')
    .get(gameController.getGame)
    .post(gameController.createGame)

// voir archives
router.route('/month')
    .get(monthController.getMonth)
    .post(monthController.createMonth)

module.exports = router;