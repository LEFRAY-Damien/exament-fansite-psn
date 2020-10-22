// Import du model Archive de la base de donnée
const Archive = require("../../database/models/Archive"); // Model database
const path = require('path') // utile uniquement pour path.resolve plus bas
sharp = require('sharp') // modul pour redimenssionner les images

// Controllers
module.exports = {

    //  // POST................................
    postArchive: (req, res) => {

        const file = req.file; // cree constante file pour cree l'image en webp

        const cover = {
            name: file.filename,
            originalName: file.originalname,
            //path: file.path.replace("public", "imageswebp"),
            //urlSharp: '/public/imageswebp/' + file.originalname.split('.').slice(0, -1).join('.') + ".webp",
            createAt: Date.now(),
        }

        Archive.create({       // On cree l'article sur le model Article DB

            cover: cover,       // On enregistre le nom la provenance et la date de l'image

            ...req.body,       // suivant le req.body

            // Ici on viens formater le chemin de notre image qui sera stocker dans notre DB
            imageArchive: `/assets/imagesArchives/${req.file.filename}`,

        }, (err, post) => {

            // Et on redirige sur la page /
            res.redirect('/admin')
        })

    }

}

