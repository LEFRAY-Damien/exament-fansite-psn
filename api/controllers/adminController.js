// Import du model Article de la base de donnée
const Archive = require("../../database/models/Archive"); // Model database
const Acceuil = require("../../database/models/Acceuil");
const Message = require("../../database/models/Message"); // Model database
const Contact = require("../../database/models/Contact"); // Model database
const Article = require("../../database/models/Article"); // Model database
const CarouselAcceuil = require("../../database/models/CarouselAcceuil"); // Model database
const path = require('path') // utile uniquement pour path.resolve plus bas
sharp = require('sharp') // modul pour redimenssionner les images
fs = require('fs')
const { link } = require("fs");

// Controllers
module.exports = {

    // GET .................................
    get: async (req, res) => {

        const messageAcceuil = await Acceuil.findOne({})
        const titreAcceuil = await Acceuil.find({})

        const dbCarouselAcceuil = await CarouselAcceuil.find({})
        const CarouselAcceuilVide = (dbCarouselAcceuil <1)
        
        const messageContact = await Contact.findOne({})
        const apropos = await Contact.find()

        // liste de tt les article pour cree une boucle pour pouvoir charger
        const listearticles = await Article.find({})

        // Liste de tout les messages
        const listeMessage = await Message.find()

        const cardeArchive = await Archive.find()

        const titleNoExist = (titreAcceuil < 1)
        const aproposNoExist = (apropos < 1)

        switch (titleNoExist && aproposNoExist) {
            case titleNoExist && aproposNoExist:
                res.render('admin', {
                    layout: 'adminLayout',
                    messageAcceuil,
                    messageContact,
                    listearticles,
                    titleNoExist,
                    aproposNoExist,
                    dbCarouselAcceuil,
                    CarouselAcceuilVide,
                    cardeArchive,
                    listeMessage
                });
                break;
            default:

                if (titleNoExist) {
                    res.render('admin', {
                        layout: 'adminLayout',
                        messageAcceuil,
                        messageContact,
                        listearticles,
                        titleNoExist,
                        dbCarouselAcceuil,
                        CarouselAcceuilVide,
                        cardeArchive,
                        listeMessage
                    })

                } else if (aproposNoExist) {
                    res.render('admin', {
                        layout: 'adminLayout',
                        messageAcceuil,
                        messageContact,
                        listearticles,
                        aproposNoExist,
                        dbCarouselAcceuil,
                        CarouselAcceuilVide,
                        cardeArchive,
                        listeMessage
                    })
                } else {
                    res.render('admin', {
                        layout: 'adminLayout',
                        messageAcceuil,
                        messageContact,
                        listearticles,
                        dbCarouselAcceuil,
                        CarouselAcceuilVide,
                        cardeArchive,
                        listeMessage
                    })
                }
        }
    },

    // Method Get ID Archive
    loadArchive: async (req, res) => {
        // Import const
        const cardeArchive = await Archive.find({})

        // Ici query est égale à l'id envoyer via l'URL /article/:id
        const query = req.body.id // boby = formulaire
        // Ici on recherche l'article ayant comme id le query de notre URL   
        dbArchiveID = await Archive.findById(query)

        const LoadArchive = dbArchiveID

        if (LoadArchive) {
            res.render('admin', {
                layout: 'adminLayout',
                LoadArchive,
                cardeArchive,
                ArchiveID: dbArchiveID
            })
        } else {
            res.render('admin', {
                layout: 'adminLayout',
            })
        }
    },

    //  // POST................................
    postArticleId: async (req, res) => {

        const file = req.file; // cree constante file pour enregistrer l image
        
        const cover = {
            name: file.filename,
            originalName: file.originalname,
            //path: file.path.replace("public", "imageswebp"),
            //urlSharp: '/public/imageswebp/' + file.originalname.split('.').slice(0, -1).join('.') + ".webp",
            createAt: Date.now(),
        }

        // Const cree pour faire un model de l'obj
        const details = {
            genre: req.body.genre,
            editeur: req.body.editeur,
            dateDeSortie: req.body.dateDeSortie,
            multijoueurs: req.body.multijoueurs,
        }

        Article.create({       // On cree l'article sur le model Article DB

            details: details,  // On ce sert de la const details pour cree un model

            cover: cover,       // On enregistre le nom la provenance et la date de l'image

            ...req.body,       // suivant le req.body

            // carouselArticle: arrayFiles,

            // Ici on viens formater le chemin de notre image qui sera stocker dans notre DB
            imageCard: `/assets/imagesArticles/${req.file.filename}`,

            // On stock aussi le nom de l'image
            // name: req.file.originalname

        }, (err, post) => {

            // Et on redirige sur la page /
            res.redirect('/admin')
        })

    },
}


