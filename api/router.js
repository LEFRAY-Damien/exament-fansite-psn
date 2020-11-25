// Import
const express = require('express'),
    router = express.Router(),
    path = require('path'),
    upload = require('./config/multer'),
    uploadArchive = require('./config/multerArchive'),
    uploadAcceuil = require('./config/multerAcceuil'),
    uploadArticle = require('./config/multerArticle')
// uploadArrayID = require('./config/multerArrayID')

// Controller
const homeController = require('./controllers/homeController'),
    contactController = require('./controllers/contactController'),
    archivesController = require('./controllers/archivesController'),
    article_idController = require('./controllers/article_idController'),
    loginController = require('./controllers/loginController'),
    freetoplayController = require('./controllers/freetoplayController'),
    modalController = require('./controllers/modalController'),
    adminController = require('./controllers/adminController'),
    adminAcceuilController = require('./controllers/adminAcceuilController'),
    adminArchiveController = require('./controllers/adminArchiveController'),
    adminContactController = require('./controllers/adminContactController'),
    adminArticleController = require('./controllers/adminArticleController'),
    adminAcceuilCarouselController = require('./controllers/adminAcceuilCarouselController'),
    adminArticleCarouselController = require('./controllers/adminArticleCarouselController'),
    adminMessageController = require('./controllers/adminMessageController'),
    nodemailerController = require('./controllers/nodemailerController')

// Nodemailer
// Envoie Mail
router.route('/nodemailerTest')
    .post(nodemailerController.test)

// Home
router.route('/')
    .get(homeController.get)

// Contact
router.route('/contact')
    .get(contactController.get)
    .post(contactController.postMessage)

// Archives
router.route('/archives')
    .get(archivesController.get)

// Article ID
router.route('/article/:id')
    .get(article_idController.getID)

// Login
router.route('/login')
    .get(loginController.get)

// Free To Play
router.route('/freetoplay')
    .get(freetoplayController.get)

// modal
router.route('/modal')
    .get(modalController.get)

// Admin message
router.route('/admin/message/:id')
    .delete(adminMessageController.deleteOne)
    .post(adminMessageController.loadMessage)

// Admin article ID
router.route('/admin')
    .get(adminController.get)
    .post(upload.single('imageCard'), adminController.postArticleId)

// Admin Acceuil POST
router.route('/admin/acceuil')
    .post(adminAcceuilController.postAcceuil)

// Admin Acceuil Carousel
router.route('/admin/acceuil/carousel')
    .post(uploadAcceuil.array('inputArticleArray', 6), adminAcceuilCarouselController.postArrayAcceuil)

// Admin Acceuil Carousel Effacer une image
router.route('/admin/acceuil/carousel/:id')
    .put(uploadAcceuil.array('inputArticleArray', 6), adminAcceuilCarouselController.putArrayAcceuil)

// Admin Acceuil MAJ message d'acceuil
router.route('/admin/acceuil/:id')
    .put(adminAcceuilController.putAcceuil) //MAJ message acceuil

// Admin Archive
router.route('/admin/archive')
    .post(uploadArchive.single('imageArchive'), adminArchiveController.postArchive)

// Admin Archive Delete et MAJ
router.route('/admin/archive/:id')
    .put(uploadArchive.single('imageArchive'), adminArchiveController.editArchive)
    .delete(adminArchiveController.deleteOne)

// Route Admin chargement archive
router.route('/admin/loadArchive')
    .post(adminController.loadArchive)

// Route Admin chargement article
router.route('/admin/loadArticle')
    .post(adminArticleController.loadArticle)

// Route Admin Article MAJ
router.route('/admin/Article/:id')
    .put(upload.single('imageCard'), adminArticleController.majArticle)
    .delete(adminArticleController.deleteOne)

// Admin Article Carrousel ID
router.route('/admin/CarrouselArticle/:id')
    .post(uploadArticle.array('inputArticleArray', 6), adminArticleCarouselController.postArrayArticle)
    .put(uploadArticle.array('inputArticleArray', 6), adminArticleCarouselController.putArrayArticle)

// Admin Contact POST
router.route('/admin/contact')
    .post(adminContactController.postContact)

// Admin Contact PUT
router.route('/admin/contact/:id')
    .put(adminContactController.putContact) // MAJ page contact


module.exports = router;