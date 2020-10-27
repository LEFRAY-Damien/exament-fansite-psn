// Import
const express = require('express'),
    router = express.Router(),
    path = require('path'),
    upload = require('./config/multer'),
    uploadArchive = require('./config/multerArchive')

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
    adminArticleController = require('./controllers/adminArticleController')

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

// Admin article ID
router.route('/admin')
    .get(adminController.get)
    .post(upload.single('imageCard'), adminController.postArticleId)

// Admin Acceuil POST
router.route('/admin/acceuil')
    .post(adminAcceuilController.postAcceuil)

// Admin Acceuil PUT
router.route('/admin/acceuil/:id')
    .put(adminAcceuilController.putAcceuil) //MAJ message acceuil

// Admin Archive
router.route('/admin/archive')
    .post(uploadArchive.single('imageArchive'), adminArchiveController.postArchive)

router.route('/admin/archive/:id')
    .delete(adminArchiveController.deleteOne)
    .put(uploadArchive.single('imageArchive'), adminArchiveController.editArchive)

// Route Admin chargement archive
router.route('/admin/loadArchive')
    .post(adminController.loadArchive)

// Route Admin chargement article
router.route('/admin/loadArticle')
    .post(adminArticleController.loadArticle)


// Admin Contact POST
router.route('/admin/contact')
    .post(adminContactController.postContact)

// Admin Contact PUT
router.route('/admin/contact/:id')
    .put(adminContactController.putContact) // MAJ page contact


module.exports = router;