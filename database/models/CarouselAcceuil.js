// Model du carousel de l'acceuil sauvgarder dans la base de donnée

const mongoose = require('mongoose') // Appel de la constante mongoose 

// Shema enregistrer dans la base de données
const CarouselAcceuilSchema = new mongoose.Schema({

    galleryImg: [] // tableau 

})

// Cree une constante article selon le shema ci dessus
const CarouselAcceuil = mongoose.model('CarouselAcceuil', CarouselAcceuilSchema)
   
// Exporte le contenue d'un article sur d'autre page sous le nom Article
module.exports = CarouselAcceuil