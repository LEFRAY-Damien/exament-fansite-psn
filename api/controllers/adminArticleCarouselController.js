// Controller adminArticleCarousel

// Import du model Article de la base de donnée
const CarouselArticle = require("../../database/models/CarouselArticle"); // Model database
const Article = require("../../database/models/Article"); // Model database
const path = require('path') // utile uniquement pour path.resolve plus bas
fs = require('fs') // fs require effacer un fichier


module.exports = {
    // Method Post (nous créons un article avec ses image)
    postArrayArticle: async (req, res, next) => {

        // On définit query comme un objet acceuillant notre req.params.id
        const query = {
            _id: req.params.id
        }

        // On définit nos Objet en relation avec notre carousel
        // Attention a bien utilisé un nom d'autheur définit dans la db pendant la creation des articles
        const article = await Article.findById(query)

        // tableau du req.files
        const files = req.files,
            // Définition d'un tableau que l'on va agrémenté avec nos data pour l'inscrire dans la DB
            arrayFiles = []

        // Boucle parcours notre req.files afin de récupéré les datas que l'on veux avant d'inscrire
        // nos objets dans le tableaux
        for (let i = 0; i < files.length; i++) {
            const dbFilename = files[i].filename
            if (files) {
                console.log(files[i].filename)
                // C'est grace à la method push que nous inscrivont nos data dans nos Objets
                // Et nos objets dans le tableau
                arrayFiles.push({
                    name: files[i].filename,
                    filename: `/assets/imagesCarouselID/${files[i].filename}`,
                    orifginalname: files[i].originalname
                })
            }
        }

        const carouselArticle = new CarouselArticle({

            galleryImg: arrayFiles,
            articleID: article._id

        })

        // Ici on incrémente notre carousel dans nos model en relation
        article.carouselArticle.push(carouselArticle._id)

        // On sauvegarde nous modification
        carouselArticle.save((err) => {
            if (err) return handleError(err)
        })
        article.save((err) => {
            if (err) return handleError(err)
        })

        res.redirect('/admin')
    },

    // Methode PUT MAJ Carousel Article
    putArrayArticle: async (req, res) => {
        const dbCarouselArticle = await CarouselArticle.findById(req.params.id),

            // Query est l'id passé dans le formulaire de req post
            query = { _id: req.params.id }

        if (req.body.addImg === '') {

            /*
       *  Ajouter Une Image
       **********************/
            const dbCarouselArticle = await CarouselArticle.findById(req.params.id),
                query = { _id: req.params.id },
                // Gallery Existante
                dbFiles = dbCarouselArticle.galleryImg,
                // req.files
                files = req.files,
                // Definition d'un tableau qui va acceuillir
                arrayFiles = []

            // Boucle pour chercher les files existant dans la DB et les ajouter au tableau arrayFiles
            for (let i = 0; i < dbFiles.length; i++) {
                const dbFilename = dbFiles[i].filename
                if (dbFiles) {
                    console.log(dbFiles[i].filename)
                    // On push les data existante dans arrayFiles
                    arrayFiles.push({
                        name: dbFiles[i].name,
                        filename: dbFiles[i].filename,
                        orifginalname: dbFiles[i].name
                    })
                }
            }

            // Boucle pour chercher les req.files et les ajouter au tableau arrayFiles
            for (let i = 0; i < files.length; i++) {
                const dbFilename = files[i].filename
                if (files) {
                    console.log(files[i].filename)
                    // On push les data de notre req.files dans arrayFiles
                    arrayFiles.push({
                        name: files[i].filename,
                        filename: `/assets/imagesCarouselID/${files[i].filename}`,
                        orifginalname: files[i].originalname
                    })
                }
            }

            // Fonction update Mongoose
            CarouselArticle.updateOne(query, {
                ...req.body,
                galleryImg: arrayFiles
            },
                // CallBack de la function Mongoose
                (err) => {
                    if (!err) {
                        res.redirect('/admin')
                    } else {
                        return res.send(err)
                    }
                })

        } else if (req.body.deleteImg) {
            /*
             *  Supprimer Une Image
             **********************/
            const dbCarouselArticle = await CarouselArticle.findById(req.params.id),
                files = dbCarouselArticle.galleryImg,
                arrayFiles = []

            // boucle de selection de l'objet à supprimer
            for (let i = 0; i < files.length; i++) {
                const dbFilename = files[i].name
                // on ajoute la condition pour que l'élément égale a notre req.body ne sois pas
                // re-pusher dans notre tableau que l'on va ensuite inscrir dans la DB
                if (dbFilename !== req.body.deleteImg) {
                    console.log(dbFilename)
                    // On push les data de notre req.files dans arrayFiles
                    arrayFiles.push({
                        name: files[i].name,
                        filename: files[i].filename,
                        originalname: files[i].name
                    })
                }
            }

            console.log('?? arrayfiles')
            console.log(arrayFiles)

            // Fonction update Mongoose
            CarouselArticle.updateOne(query, {
                ...req.body,
                galleryImg: arrayFiles
            },
                // CallBack de la function Mongoose
                (err) => {
                    if (!err) {
                        // unlink suprimera l'élément égale a notre req.body
                        // voir le input dans la view html
                        fs.unlink(path.resolve('public/imagesCarouselID/' + req.body.deleteImg),
                            // CallBack de la function unlink
                            (err) => {
                                if (err) throw err
                            })
                        res.redirect('/admin')
                    } else {
                        return res.send(err)
                    }
                })
        }

    }
}
