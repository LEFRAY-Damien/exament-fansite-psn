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
     post: async (req, res) => {


        console.log('Controller create Article (Admin)')
        console.log(req.files);
        console.log(req.body);

        const details = {  // Const cree pour faire un model de l'obj
            genre: req.body.genre,
            editeur: req.body.editeur,
            dateDeSortie: req.body.dateDeSortie,
            taille: req.body.taille
        }

        Article.create({       // On cree l'article sur le model Article DB
            ...req.body,       // suivant le req.body
            details: details   // On ce sert de la const details pour cree un model
        }, (err, post) => {

            // Et on redirige sur la page /
            res.redirect('/')
        })

    },

}

// // Method POST
// post: async (req, res) => {

//     // Condition pour verifier si aucun fichier est envoyer dans le formulaire
//     if (!req.file) res.redirect('/')
//     // Si Le fichier est bien présent alors on execute ça
//     else {
//       // On récupère le modele (constructor) de mongoose
//       Article.create({
//         // On stock toute les infos de notre req.body
//         ...req.body,
//         // Ici on viens formater le chemin de notre image qui sera stocker dans notre DB
//         imgArticle: `/assets/images/${req.file.originalname}`,
//         // On stock aussi le nom de l'image
//         name: req.file.originalname
//       // Le callback d'error
//       }, (err, post) => {
//         if (err) console.log(err)
//         res.redirect('/article')
//       })
//     }

//   },

