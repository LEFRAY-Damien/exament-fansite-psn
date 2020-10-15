// Import du model Article de la base de donnée
const Article = require("../../database/models/Article"); // Model database
const path = require('path') // utile uniquement pour path.resolve plus bas
fs = require('fs')

// Controllers
module.exports = {

    // GET .................................
    get: (req, res) => {
        res.render('admin', {
            layout: 'adminLayout'
        })
    },

    //  // POST................................
    postArticleId: (req, res) => {

        console.log(req.file);
        console.log(req.body);


        const file = req.file; // cree constante file pour cree l'image en webp

        sharp(file.path)
            .resize(200)  // taille de la redimenssion
            .webp({ quality: 80 })
            // toFile ->  endrois ou stocker l'image
            .toFile('./public/webp' + file.originalname.split('.').slice(0, -1).join('.') + ".webp", (err, info) => { });

        // if (file) {
        //     newProduct.cover = {
        //         name: file.filename,
        //         originalName: file.originalname,
        //         path: file.path.replace("public", ""),
        //         urlSharp: '/uploads/web/' + file.originalname.split('.').slice(0, -1).join('.') + ".webp",
        //         createAt: Date.now(),
        //     }
        // }

        // Const cree pour faire un model de l'obj
        const details = {  
            genre: req.body.genre,
            editeur: req.body.editeur,
            dateDeSortie: req.body.dateDeSortie,
            taille: req.body.taille
        }


        Article.create({       // On cree l'article sur le model Article DB

            details: details,  // On ce sert de la const details pour cree un model

            ...req.body,       // suivant le req.body

            // Ici on viens formater le chemin de notre image qui sera stocker dans notre DB
            imageCard: `/assets/imagesArticles/${req.file.originalname}`,

            // On stock aussi le nom de l'image
            name: req.file.originalname

        }, (err, post) => {

            // Et on redirige sur la page /
            res.redirect('/admin')
        })

    },

}


