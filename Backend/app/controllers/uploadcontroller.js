"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UploadController {
    upload(){
        // On fige les extensions possible pour les images
    const MIME_TYPES = {
        'image/jpg': 'jpg',
        'image/jpeg': 'jpg',
        'image/png': 'png'
      };
      
  // on construit l'upload de fichier
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, './images');
    },
    filename: (req, file, callback) => {
      const name = file.originalname.split(' ').join('_');
      const extension = MIME_TYPES[file.mimetype];
      callback(null, name + Date.now() + '.' + extension);
    }
  });
  
  exports.Multer = multer({storage: storage}).single('imageUrl');
    }

}
exports.uploadController = new UploadController();
exports.default = UploadController;