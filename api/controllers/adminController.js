// Import du model Article de la base de donnée
const Archive = require("../../database/models/Archive"); // Model database
const Acceuil = require("../../database/models/Acceuil");
const Contact = require("../../database/models/Contact"); // Model database
const Article = require("../../database/models/Article"); // Model database
const Links = require('../../database/models/Links');
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

        const messageContact = await Contact.findOne({})
        const apropos = await Contact.find()

        // liste de tt les article pour cree une boucle pour pouvoir charger
        const listearticles = await Article.find({})

        const cardeArchive = await Archive.find({}).populate('links').exec()

        const titleNoExist = (titreAcceuil < 1)
        const aproposNoExist = (apropos < 1)

        console.log("LOG 2 ACCEUIL CAROUSEL");
        console.log(dbCarouselAcceuil);

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
                    cardeArchive
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
                        cardeArchive
                    })

                } else if (aproposNoExist) {
                    res.render('admin', {
                        layout: 'adminLayout',
                        messageAcceuil,
                        messageContact,
                        listearticles,
                        aproposNoExist,
                        dbCarouselAcceuil,
                        cardeArchive
                    })
                } else {
                    res.render('admin', {
                        layout: 'adminLayout',
                        messageAcceuil,
                        messageContact,
                        listearticles,
                        dbCarouselAcceuil,
                        cardeArchive
                    })
                }
        }
    },

    // Method Get ID Archive
    loadArchive: async (req, res) => {
        // Import const
        const cardeArchive = await Archive.find({}).populate('links').exec()

        // Ici query est égale à l'id envoyer via l'URL /article/:id
        const query = req.body.id // boby = formulaire
        // Ici on recherche l'article ayant comme id le query de notre URL   
        dbArchiveID = await Archive.findById(query).populate('links').exec()

        console.log("log id");
        console.log(dbArchiveID);

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
 
        // Multer array....................................................................................................
        // Définition d'un tableau que l'on va agrémenté avec nos data pour l'inscrire dans la DB
        // const files = req.files, // Files avec un S pour ARRAY
        // arrayFiles = []

        // // Boucle parcours notre req.files afin de récupéré les datas que l'on veux avant d'inscrire
        // // nos objets dans le tableaux
        // for (let i = 0; i < files.length; i++) {
        //     if (files) {
        //         console.log("3 log files1");
        //         console.log(files)
        //         // C'est grace à la method push que nous inscrivont nos data dans nos Objets
        //         // Et nos objets dans le tableau
        //         arrayFiles.push({
        //             name: files[i].filename,
        //             filename: `/../assets/imagesArticles/${files[i].filename}`,
        //             orifginalname: files[i].originalname
        //         })
        //     }
        // }


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
            multijoueurs: req.body.multijoueurs
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


