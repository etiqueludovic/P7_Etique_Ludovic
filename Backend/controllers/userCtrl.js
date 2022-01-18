require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../utils/database');
const { getCommentsOfEachPosts } = require('./messages');
const salt = bcrypt.genSalt(10);
const connection = db.connect();
/**
 * Ajout d'un nouvel utilisateur
 */
exports.newuser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {

      // Cryptage et échappement SQL des données utilisateurs
      const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: hash
      }
          
          // Envoi de la requete et réponse au frontend en fonction des erreurs SQL
          connection.query('INSERT INTO user SET ?', [newUser], (error, results, fields) => {
            if (error) {
              if (error.errno === 1062) { // ERREUR : email déjà utilisé dans la base
                res.status(403).json({ "error": "L'email est déjà utilisé !" });
              } else { // Autre erreur SQL
                res.status(500).json({ "error": error.sqlMessage });
              }
            } else { // Pas d'erreur : utilisateur ajouté
              res.status(201).json({ message: 'Utilisateur créé !' });
            }
          });
        
      })
    
    .catch(error => res.status(500).json({ error }));
}

/**
 * Login d'un utilisateur
 */
exports.login = (req, res, next) => {

  const researchedEmail = req.body.email;
  // requête préparée de mysql2
  connection.query("SELECT * FROM user WHERE email= ?", [researchedEmail], (error, results, fields) => {
    // SI : erreur SQL
    if (error) {
      res.status(500).json({ "error": error.sqlMessage });
    
    // SI : Utilisateur non trouvé
    } else if (results.length == 0) {
      res.status(401).json({ error: 'Cet utilisateur n\'existe pas' });

    // SI : Utilisateur trouvé
    } else {
      const matchingHash = results[0].password;

      bcrypt.compare(req.body.password, matchingHash)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect!' });
          }

          const newToken = jwt.sign(
            { userId: results[0].id },
            process.env.JWT_KEY,
            { expiresIn: '24h' }
          );

          res.status(200).json({
            message: 'Utilisateur logué',
            userId: results[0].id,
            username: results[0].username,
            profil_image: results[0].profil_image,
            bio: results[0].bio,
            token: newToken
          });
        })
        .catch(error => res.status(500).json({ error })); 
    }
  });
}

/**
 * Renvoie les infos d'un utilisateur, en fonction de l'Id utilisateur
 */
exports.getProfil = (req, res, next) => {
  const id = req.params.userId;
  connection.query("SELECT * FROM user WHERE id = ?", [id], (error, results, fields) => {
    // SI : erreur SQL
    if (error) {
      res.status(500).json({ "error": error.sqlMessage });

    // SI : Utilisateur non trouvé
    } else if (results.length === 0) {
      res.status(401).json({ error: 'Cet utilisateur n\'existe pas' });

    // SI : Utilisateur trouvé
    } else {
      res.status(200).json({
        userId: results[0].id,
        username: results[0].username,
        email: results[0].email,
        profil_image: results[0].profil_image,
        bio: results[0].bio
      });
    }
  });
}

/**
 * Récupération de tous les utilisateurs
 */
exports.getAllUsers = (req, res, next) => {
  connection.query("SELECT id, username, profil_image FROM user", (error, users, fields) => {
    if (error) {
      res.status(500).json({ "error": error.sqlMessage });
    } else {
      res.status(200).json({ users });
    }
  });
}

/**
 * Récupération d'1 seul utilisateur
 */
exports.getOneUser = (req, res, next) => {
  const searchId = req.params.id;
  const sqlParams = [searchId];
  connection.execute("SELECT * FROM user WHERE id=?", sqlParams, (error, results, fields) => {
    // SI : erreur SQL
    if (error) {
      res.status(500).json({ "error": error.sqlMessage });

    // SI : Utilisateur non trouvé
    } else if (results.length === 0) {
      res.status(401).json({ error: 'Cet utilisateur n\'existe pas' });

    // SI : Utilisateur trouvé
    } else {
      res.status(200).json({
        id: results[0].id,
        name: results[0].name,
        email: results[0].email,
        profil_image: results[0].profil_image
      });
    }
  });
}

/**
 * Changer le mot de passe utilisateur
 */
exports.changePassword = (req, res, next) => {
  // Vérification que l'ancien mot de passe soit correct
  const searchId = req.params.id;
  const sqlParams = [searchId];
  connection.execute("SELECT password FROM user WHERE id=?", sqlParams, (error, results, fields) => {
    if (error) {
      res.status(500).json({ "error": error.sqlMessage });
      connection.end();
    } else {
      const DBPasswordHash = bcrypt.hash(results[0].password);
      bcrypt.compare(req.body.oldPassword, DBPasswordHash)
        .then(valid => {
          if (!valid) {
            connection.end();
            return res.status(401).json({ error: 'Ancien mot de passe incorrect!' });
          }
          // L'ancien mot de passe est correct, donc mise à jour du mot de passe :
          bcrypt.hash(req.body.newPassword, 10)
            .then(hash => {
              const newPassword = bcrypt.hash(password, salt);
              const sqlParams2 = [newPassword, searchId];
              connection.execute(`UPDATE user SET password=? WHERE id=?`, sqlParams2, (error, results, fields) => {
                if (error) {
                  connection.end();
                  res.status(500).json({ "error": error.sqlMessage });
                } else {
                  connection.end();
                  res.status(201).json({ message: 'Mot de passe modifié' });
                }
              })
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    }
  });
}

/**
 * Changer la photo de profil d'un utilisateur
 */
exports.changeProfilePicture = (req, res, next) => {
  let originalname = req.body.profil_image;

  let ext = originalname.split('.').pop();
  let filename = originalname.split('.').slice(0, -1).join('.');

  const profil_image = `${req.protocol}://${req.get('host')}/images/${filename + '-' + Date.now()+'.'+ext}`;
  const userId = req.body.userId;
  const sql = `UPDATE user SET profil_image=? WHERE id=?`;
  const sqlParams = [profil_image, userId];
  connection.query(sql, sqlParams, (error, results, fields) => {
    if (error) {
      res.status(500).json({ "error": error.sqlMessage });
    } else {
      res.status(201).json({ message: 'Photo de profil modifiée' });
    }
  });
}

/**
 * Changer la description ("bio"..) de l'utilisateur
 */
exports.changebio = (req, res, next) => {
  const bio = req.body.bio;
  const userId = req.body.userId;
  connection.query(`UPDATE user SET bio=? WHERE id=?`,  [bio, userId], (error, results, fields) => {
    if (error) {
      res.status(500).json({ "error": error.sqlMessage });
    } else {
      res.status(201).json({ message: 'Description du profil modifiée' });
    }
  });
}

/**
 * Changer le nom d'utilisateur
 */
 exports.changeusername = (req, res, next) => {
  const username = req.body.username;
  const id = req.body.userId;
  
  connection.query("UPDATE user SET username=? WHERE id=? ", [username, id], (error, results, fields) => {
    if (error) {
      res.status(500).json({ "error": error.sqlMessage });
    } else {
      console.log("ici la réponse de l'update")
      console.log([username, id])
      console.log(res)
      res.status(201).json({ message: 'Username du profil modifiée' });
    }
  });
}

/**
 * Donner/enlever les droits d'admin à un utilisateur
 */
exports.changeAdmin = (req, res, next) => {
  const isadmin = req.body.isadmin;
  const userId = req.params.id;
  const sql = "UPDATE user SET isadmin=? WHERE id=?";
  const sqlParams = [isadmin, userId];
  connection.query(sql, sqlParams, (error, results, fields) => {
    if (error) {
      res.status(500).json({ "error": error.sqlMessage });
    } else {
      res.status(201).json({ message: 'Droits d\'administrateur modifiée' });
    }
  });
}

/**
 * Supprimer son compte utilisateur
 */
exports.deleteAccount = (req, res, next) => {
  const userId = req.params.id;
  const sql = "DELETE FROM user WHERE id=?";
  const sqlParams = [userId];
  connection.execute(sql, sqlParams, (error, results, fields) => {
    if (error) {
      res.status(500).json({ "error": error.sqlMessage });
    } else {
      res.status(201).json({ message: 'Utilisateur supprimé' });
    }
  });
}


/**
 * Récupérer toutes les publications d’un utilisateur en particulier
 */
exports.getAllPostsOfUser = (req, res, next) => {
  // 1: récupération de tous les posts
  const userId = req.params.id;
  const sql = "SELECT Posts.id AS postId, Posts.publication_date AS postDate, Posts.imageurl AS postImage, Posts.content as postContent, Users.id AS userId, Users.name AS userName, Users.profil_image AS userPicture\
  FROM Posts\
  INNER JOIN Users ON Posts.user_id = Users.id\
  WHERE Posts.user_id = ?\
  ORDER BY postDate DESC;";
  const sqlParams = [userId];
  connection.execute(sql, sqlParams, (error, rawPosts, fields) => {
    if (error) {
      connection.end();
      res.status(500).json({ "error": error.sqlMessage });
    } else {
      // 2: Pour chaque post, on va chercher tous les commentaires du post
      getCommentsOfEachPosts(rawPosts, connection)
            .then(posts => {
              res.status(200).json({ posts });
            })
            .catch(err => {
              res.status(500).json({ "error": "Un problème est survenu" });
            })
        .catch(err => {
          res.status(500).json({ "error": "Un problème est survenu" });
        })
      }
    })
}