require('dotenv').config();
const database = require('../utils/database');
/**
 * Ajout d'un nouveau commentaire
 */
exports.newComment = (req, res, next) => {
  const connection = database.connect();

  const newComment = {
    user_id: req.body.user_id,
    post_id: req.body.post_id,
    content: req.body.content,
    CreatAt: new Date()
  }

  connection.query("INSERT INTO Comments SET ?", [newComment], (error, results, fields) => {
    if (error) {
      res.status(500).json({ "error": error.sqlMessage });
    } else {
      res.status(201).json({ message: 'Commentaire ajoutée' });
    }
  });
}

/**
 * Récupérer tous les commentaires d'un post particulier
 */
exports.getCommentsofPost = (req, res, next) => {
  const connection = database.connect();
  const id = req.params.id;
  connection.query("SELECT * FROM Comments WHERE post_id=?", [id], (error, comments, fields) => {
    if (error) {
      res.status(500).json({ "error": error.sqlMessage });
    } else {
      res.status(200).json(comments);
    }
  });

  connection.end();
}

/**
 * Suppression d'un commentaire
 */
exports.deleteComment = (req, res, next) => {
  const connection = database.connect();
  const commentId = parseInt(req.params.id, 10);
  connection.query("DELETE FROM Comments WHERE id=?", [commentId], (error, results, fields) => {
    if (error) {
      res.status(500).json({ "error": error.sqlMessage });
    } else {
      res.status(201).json({ message: 'Commentaire supprimée' });
    }
  });
}