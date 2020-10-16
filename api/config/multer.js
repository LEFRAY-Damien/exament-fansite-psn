// Import de Multer
const multer = require('multer')

// Ici nous définissons la config de stockage de multer
const storage = multer.diskStorage({
  // Ici la destination (ou seront stocker nos fichiers par default)
  destination: (req, file, cb) => {
    cb(null, './public/imagesArticles')
  },
  // Ici est définit le format du nom de l'image à stocker
  filename: (req, file, cb) => {
    const ext = file.originalname,
      date = Date.now()

    cb(null, date + '-' + file.originalname) // enregistre l'image sous ce nom la date + '-' + le nom de 'limage
    // cb(null, ext)
  }
})

// Ici seront initialiser les parametre de la config de multer
const upload = multer({
  // Ici nous renseignons le stockage definit au dessu
  storage: storage,
  // Ici seront renseigner les limits des fichiers (taile, proportion, ...)
  limits: {
    fileSize: 1 * 4098 * 4098,
    files: 6
  },
  // Ici nous avons un filtre qui va nous permetre de configurer les extensions accepter par notre middleware ou autre
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/gif" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true)
    } else {
      cb(null, false)
      cb(new Error('Le fichier doit être au format png, jpg, jpeg ou gif.'))
    }
  }
})

// Ici nous exportons upload afin de pouvoir l'appeler dans notre router
module.exports = upload