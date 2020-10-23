// Import du model Article de la base de donnée
const Archive = require("../../database/models/Archive"); // Model database
const Acceuil = require("../../database/models/Acceuil");
const Article = require("../../database/models/Article"); // Model database
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
        const cardeArchive = await Archive.find({}).populate('links').exec()
        const titleNoExist = (titreAcceuil < 1)

        if(titleNoExist) {
            res.render('admin', {
                layout: 'adminLayout',
                messageAcceuil,
                titleNoExist
            })
        } else {
            res.render('admin', {
                layout: 'adminLayout',
                messageAcceuil,
                cardeArchive
            })
        }
    },

    //  // POST................................
    postArticleId: (req, res) => {

        console.log("1 log files ");
        console.log(req.file);

        console.log("2 log body");
        console.log(req.body);

        const file = req.file; // cree constante file pour cree l'image en webp


        // SHARP ............................................................................
        // sharp(file.path)
        //     .resize(200)  // taille de la redimenssion
        //     .webp({ quality: 80 })
        //     // toFile ->  endrois ou stocker l'image
        //     .toFile('./public/webp' + file.originalname.split('.').slice(0, -1).join('.') + ".webp", (err, info) => { });
        // SHARP .............................................................................


        // Multer array....................................................................................................
        // // Définition d'un tableau que l'on va agrémenté avec nos data pour l'inscrire dans la DB
        // arrayFiles = []

        // // Boucle parcours notre req.files afin de récupéré les datas que l'on veux avant d'inscrire
        // // nos objets dans le tableaux
        // for (let i = 0; i < file.length; i++) {
        //     if (file) {
        //         console.log("3 log files1");
        //         console.log(file)
        //         // C'est grace à la method push que nous inscrivont nos data dans nos Objets
        //         // Et nos objets dans le tableau
        //         arrayFiles.push({
        //             name: file[i].filename,
        //             filename: `/../assets/imagesArticles/${file[i].filename}`,
        //             orifginalname: file[i].originalname
        //         })
        //     }
        // }

        // Cree un boucle pour cover

        // console.log("4 log arrayfiles");
        // console.log(arrayFiles);
        // MULTER ARRAY ...........................................................................................................



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
            taille: req.body.taille
        }

        Article.create({       // On cree l'article sur le model Article DB

            details: details,  // On ce sert de la const details pour cree un model

            cover: cover,       // On enregistre le nom la provenance et la date de l'image

            ...req.body,       // suivant le req.body

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


