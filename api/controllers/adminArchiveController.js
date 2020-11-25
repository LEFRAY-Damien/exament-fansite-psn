// Import du model Archive de la base de donnée
const Archive = require("../../database/models/Archive"); // Model database
const path = require('path') // utile uniquement pour path.resolve plus bas
sharp = require('sharp') // modul pour redimenssionner les images
const { link } = require("fs");
fs = require('fs') // fs require effacer un fichier

// Controllers
module.exports = {

    // POST................................
    postArchive: async (req, res) => {
        const file = req.file; // cree constante file pour cree l'image en webp

        const cover = {
            name: file.filename,
            originalName: file.originalname,
            createAt: Date.now(),
        }

        Archive.create({       // On cree l'article sur le model Article DB
            cover: cover,       // On enregistre le nom la provenance et la date de l'image
            ...req.body,       // suivant le req.body
            imageArchive: `/assets/imagesArchives/${req.file.filename}`, // Ici on viens formater le chemin de notre image qui sera stocker dans notre DB
        }, (err, post) => {
            // Et on redirige sur la page /
            res.redirect('/admin')

        })

    },

    // Edition Archive
    editArchive: async (req, res) => {

        const archiveID = await Archive.findById(req.params.id)
        query = { _id: req.params.id };

        // pathImg sera le chemin de notre fichier à supprimer
        pathImg = path.resolve("public/imagesArchives/" + archiveID.cover.name)

        // condition si il n'y a pas d'image dans le formulaire alors tu update sans image
        if (!req.file) {

            Archive.updateOne(query, {

                ...req.body,

            }, (err) => {
                res.redirect('/admin')
            })
        } else {

            const file = req.file; // cree constante file pour cree l'image

            // On cree le nom de l'image et son chemin
            const cover = {
                name: file.filename,
                originalName: file.originalname,
                createAt: Date.now(),
            }

            Archive.updateOne(query, {       // On cree l'article sur le model Article DB

                cover: cover,       // On enregistre le nom la provenance et la date de l'image

                ...req.body,       // suivant le req.body

                // Ici on viens formater le chemin de notre image qui sera stocker dans notre DB
                imageArchive: `/assets/imagesArchives/${req.file.filename}`,

            }, (err) => {

                if (err) console.log(err)

                // Si notre callback nous donne pas d'erreur alors note fonction de suppression de l'image de lance avec un callback d'err
                fs.unlink(pathImg, (err) => {
                    if (err) console.log(err)
                    //  Ici notre ancienne image viens d'etre supprimer
                    else res.redirect('/admin')

                })

            })
        }

    },

    // Delete Archive et Links populate
    deleteOne: async (req, res) => {

        // Ici on déclare la récupération de notre archiveID grace à notre req.params.id
        const dbArchive = await Archive.findById(req.params.id),
            // Ici on déclare le chemin de l'image qui devra etre supprimer
            pathImg = path.resolve("public/imagesArchives/" + dbArchive.cover.name)

        // Fonction de suppression d une Archive rechercher par son _id
        Archive.deleteOne({
            // On va venir chercher parmis tout les _id celui égale à notre req.params (id recupéré dans l'URL)
            _id: req.params.id
            // ici nous avons un callback err
        }, (err) => {
            // Si nous avons pas d'erreur alors on Continu
            if (err) console.log(err)

            else {
                // Ici est notre fonction de suppression du fichier (image) avec son callback
                fs.unlink(pathImg, (err) => {
                    if (err) console.log(err)
                    else res.redirect('/admin')

                })
            }
        })
    }

}

