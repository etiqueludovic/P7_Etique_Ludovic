require('dotenv').config();
const database = require('../utils/database');
/**
 * Ajout d'un nouveau commentaire
 */
exports.newComment = (req, res, next) => {
  const connection = database.connect();

  const newComment = {
    userId: req.body.userId,
    postId: req.body.postId,
    content: req.body.content
  }

  connection.execute("INSERT INTO Comments SET ?", [newComment], (error, results, fields) => {
    if (error) {
      res.status(500).json({ "error": error.sqlMessage });
    } else {
      comment.addComment(userId, postId)
        .then(data => {
          res.status(201).json({ message: 'Commentaire ajoutée' });
        })
        .catch(err => {
          res.status(500).json({ "error": err });
        })
    }
  });
  connection.end();
}

/**
 * Récupérer tous les commentaires d'un post particulier
 */
exports.getCommentsofPost = (req, res, next) => {
  const connection = database.connect();

  const postId = req.body.postId;

  connection.execute("SELECT * FROM Comments INNER JOIN user ON Comments.user_id = user.id WHERE Comments.post_id = ?", [postId], (error, comments, fields) => {
    if (error) {
      res.status(500).json({ "error": error.sqlMessage });
    } else {
      res.status(200).json({ comments });
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
  connection.execute("DELETE FROM Comments WHERE id=?", [commentId], (error, results, fields) => {
    if (error) {
      res.status(500).json({ "error": error.sqlMessage });
    } else {
      res.status(201).json({ message: 'Commentaire supprimée' });
    }
  });
  connection.end();
}