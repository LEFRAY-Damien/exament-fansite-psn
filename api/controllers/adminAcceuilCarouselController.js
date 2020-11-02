// Controller adminAcceuilCarousel

// Import du model Acceuil de la base de donnée
const CarouselAcceuil = require("../../database/models/CarouselAcceuil"); // Model database
const path = require('path') // utile uniquement pour path.resolve plus bas
fs = require('fs') // fs require effacer un fichier


module.exports = {
  // Method Post (nous créons un article avec ses image)
  postArrayAcceuil: async (req, res, next) => {
      // tableau du req.files
      const files = req.files,
      // Définition d'un tableau que l'on va agrémenté avec nos data pour l'inscrire dans la DB
      arrayFiles = []

    console.log('2')
    console.log(req.files)

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
          filename: `/assets/imagesAcceuil/${files[i].filename}`,
          orifginalname: files[i].originalname
        })
      }
    }

    console.log('3')
    console.log(arrayFiles)

      // On push nos data dans la DB grace Mongoose
      CarouselAcceuil.create({
        // imgArticle: `/assets/images/${req.file.originalname}`,
        galleryImg: arrayFiles
      },
        // CallBack de la function Mongoose
        (error, post) => {
          res.redirect('/admin')
        })
    
  }
}