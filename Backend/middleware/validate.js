const Joi = require('joi');

/**
 * Validation des données utilisateur
 */


// Lors de la création d'un nouvel utilisateur
const newUserSchema = Joi.object({
  username: Joi.string().trim().min(3).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(8).required()
});
exports.newUser = (req, res, next) => {
  const {error, value} = newUserSchema.validate(req.body);
  if (error) {
    if (error.details[0].path == "email") {
      res.status(422).json({ error: "Email incorrect !" });
    }
    if (error.details[0].path == "username") {
      res.status(422).json({ error: "Nom d'utilisateur incorrect !" });
    }
    if (error.details[0].path == "password") {
      res.status(422).json({ error: "Mot de passe doit avoir 8 caractères minimum !" });
    }
     
  }
  else {
    next();
  }
};

// lors du login utilisateur
const loginSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(8).required()
});
exports.login = (req, res, next) => {
  const {error, value} = loginSchema.validate(req.body);
  if (error) {
    if (error.details[0].path == "email") {
      res.status(422).json({ error: "Email incorrect !" });
    }
    if (error.details[0].path == "password") {
      res.status(422).json({ error: "Mot de passe incorrect !" });
    }
  } else {
    next();
  }
};

// Vérification d'un id
const idSchema = Joi.number().integer().positive().required();
exports.id = (req, res, next) => {
  const {error, value} = idSchema.validate(req.params.id);
  if (error) {
      res.status(422).json({ error: "id invalide" });
  } else {
      next();
  } 
}

// Vérification de la description d'un utilisateur
const bioSchema = Joi.string().trim().required();
exports.outline = (req, res, next) => {
  const {error, value} = bioSchema.validate(req.body.bio);
  if (error) {
      res.status(422).json({ error: "Description invalide" });
  } else {
      next();
  }
}

// Lors du changement de mot de passe
const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().trim().min(8).required(),
  newPassword: Joi.string().trim().min(8).required()
});
exports.changePassword = (req, res, next) => {
  const {error, value} = changePasswordSchema.validate(req.body);
  if (error) {
    res.status(422).json({ error: "Données saisies invalides" });
  } else {
    next();
  }
};

// Lors de l'attribution/retrait du droit utilisateur
const adminCredentialSchema = Joi.valid(0, 1).required();
exports.adminCredential = (req, res, next) => {
  const {error, value} = adminCredentialSchema.validate(req.body.isadmin);
  if (error) {
      res.status(422).json({ error: "Données saisies invalides" });
  } else {
      next();
  }
}

// Lors de la publication d'un post
const postContentSchema = Joi.string().trim();
exports.postContent = (req, res, next) => {
  // SI le content est défini : validation du content
  if (req.body.content) {
    const {error, value} = postContentSchema.validate(req.body.content);
    if (error) {
      res.status(422).json({ error: "Données saisies invalides" });
    } else {
      next();
    }
  
  // SI ni la photo, ni le content est défini : requête rejettée
  } else if (!req.body.content && !req.file) {
    res.status(422).json({ error: "Envoyer au moins une image ou un texte !" });
  
  // SI le content n'est pas défini, et l'image est définie : validation déjà effectuée par multer!
  } else {
    next();
  }
};

// Lors de la récupération d'une partie des publications
const getPostsSchema = Joi.object({
  limit: Joi.number().integer().positive().required(),
  offset: Joi.number().integer().min(0).required()
});
exports.getSomePosts = (req, res, next) => {
  const {error, value} = getPostsSchema.validate(req.params);
  if (error) {
    res.status(422).json({ error: "Données saisies invalides" });
  } else {
    next();
  }
};

// Lors de la publication d'un commentaire
const commentSchema = Joi.object({
  post_id: Joi.number().integer().positive().required(),
  user_id: Joi.number().integer().positive().required(),
  content: Joi.string().trim().required(),
  user_name: Joi.string().trim().required()
});
exports.comment = (req, res, next) => {
  const {error, value} = commentSchema.validate(req.body);
  if (error) {
    res.status(422).json({ error: "Commentaire invalide" });
  } else {
    next();
  }
};

// Lors de la récupération des commentaires d'un post
const postIdSchema = Joi.number().integer().positive().required();
exports.postId = (req, res, next) => {
  const {error, value} = postIdSchema.validate(req.body.postId);
  if (error) {
      res.status(422).json({ error: "id de la publication invalide" });
  } else {
      next();
  }
};