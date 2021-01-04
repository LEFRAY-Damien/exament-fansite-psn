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
    authController = require('./controllers/authController'),
    nodemailerController = require('./controllers/nodemailerController')

// Middleware Admin
const AdminMiddleware = require('./middleware/isAdmin')

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

// Session Enregistrement
router.route('/register')
    .post(authController.register)

// Session Login
router.route('/login')
    .post(authController.login) 
    
// Session Logout
router.route('/logout')
    .get(authController.logout)

// Admin message
router.route('/admin/message/:id')
    .delete(AdminMiddleware, adminMessageController.deleteOne)
    .post(AdminMiddleware, adminMessageController.loadMessage)

// Admin article ID
router.route('/admin')
    .get(AdminMiddleware, adminController.get)
    .post(AdminMiddleware, upload.single('imageCard'), adminController.postArticleId)

// Admin Acceuil POST
router.route('/admin/acceuil')
    .post(AdminMiddleware, adminAcceuilController.postAcceuil)

// Admin Acceuil Carousel
router.route('/admin/acceuil/carousel')
    .post(AdminMiddleware, uploadAcceuil.array('inputArticleArray', 6), adminAcceuilCarouselController.postArrayAcceuil)

// Admin Acceuil Carousel Effacer une image
router.route('/admin/acceuil/carousel/:id')
    .put(AdminMiddleware, uploadAcceuil.array('inputArticleArray', 6), adminAcceuilCarouselController.putArrayAcceuil)

// Admin Acceuil MAJ message d'acceuil
router.route('/admin/acceuil/:id')
    .put(AdminMiddleware, adminAcceuilController.putAcceuil) //MAJ message acceuil

// Admin Archive
router.route('/admin/archive')
    .post(AdminMiddleware, uploadArchive.single('imageArchive'), adminArchiveController.postArchive)

// Admin Archive Delete et MAJ
router.route('/admin/archive/:id')
    .put(AdminMiddleware, uploadArchive.single('imageArchive'), adminArchiveController.editArchive)
    .delete(AdminMiddleware, adminArchiveController.deleteOne)

// Route Admin chargement archive
router.route('/admin/loadArchive')
    .post(AdminMiddleware, adminController.loadArchive)

// Route Admin chargement article
router.route('/admin/loadArticle')
    .post(AdminMiddleware, adminArticleController.loadArticle)

// Route Admin Article MAJ
router.route('/admin/Article/:id')
    .put(AdminMiddleware, upload.single('imageCard'), adminArticleController.majArticle)
    .delete(AdminMiddleware, adminArticleController.deleteOne)

// Admin Article Carrousel ID
router.route('/admin/CarrouselArticle/:id')
    .post(AdminMiddleware, uploadArticle.array('inputArticleArray', 6), adminArticleCarouselController.postArrayArticle)
    .put(AdminMiddleware, uploadArticle.array('inputArticleArray', 6), adminArticleCarouselController.putArrayArticle)

// Admin Contact POST
router.route('/admin/contact')
    .post(AdminMiddleware, adminContactController.postContact)

// Admin Contact PUT
router.route('/admin/contact/:id')
    .put(AdminMiddleware, adminContactController.putContact) // MAJ page contact


module.exports = router;