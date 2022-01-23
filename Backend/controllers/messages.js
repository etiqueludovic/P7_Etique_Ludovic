require('dotenv').config();
const database = require('../utils/database');

const connection = database.connect();


/**
 * Ajout d'une nouvelle publication
 */
exports.newMessages = (req, res, next) => {
  let originalname = req.body.ImageUrl;
  console.log("ici le nom original"+originalname)
  let ext = originalname?.split('.').pop();
  let filename = originalname?.split('.').slice(0, -1).join('.');
  let date = Math.floor(Date.now() /1000);
  
  const newMessage = {
    userId: req.body.userId,
    imageurl: filename + '-' + date +'.'+ext,
    content: req.body.content,
    title: req.body.title,
    username: req.body.username,
    profil_image: req.body.profil_image,
    CreatAt: new Date()
  }

  connection.query("INSERT INTO messages SET ?", [newMessage], (error, results, fields) => {
    if (error) {
      res.status(500).json({ "error": error.sqlMessage, message: newMessage });
    } else {
      res.status(200).json({ message: 'Publication ajoutée' });
    }
  });
}

// récupére les informations dans mySql de toutes les publications dans l'ordre inverse
exports.getMessages = (req, res, next) => {
  connection.query("SELECT * FROM messages ORDER BY id DESC", (err, rows, fields) => {
    if(!err)
    res.send(rows);
    else
    console.log(err)
    })
  }

  // Supprime une publication dans mySql grâce à l'id
exports.deleteMessage = (req, res, next) => {
  const postId = req.params.id;
  connection.query('DELETE FROM messages WHERE id = ?', [postId], (err, rows, fields) => {
    if(!err)
    res.send('Supprimer avec succès !');
    else
    console.log(err)
    })
  }

  // Récupére une publication dans mySql et renvoie toutes ces informations au frontend
exports.getOneMessages = (req, res, next) => {
  connection.query('SELECT * FROM messages WHERE id= ?', [req.params.id], (err, rows, fields) => {
    if(!err)
    res.send(rows);
    else
    console.log(err)
    })
  }

// met à jour le titre de la publication dans mySql
exports.updateTitleMessages = (req, res, next) => {
      const id = req.body.postId;
      const title = req.body.title;
    connection.query('UPDATE messages SET title=? WHERE id= ?', [title, id], (error, results, fields) => {
      if (error) {
        res.status(500).json({ "error": error.sqlMessage });
      } else {
        res.status(200).json({ message: 'Titre mis à jour' });
      }
    });
  }

// met à jour le message dans mySql
  exports.updateContentMessages = (req, res, next) => {
    const id = req.body.postId;
    const content = req.body.content;
    connection.query('UPDATE messages SET content=? WHERE id= ?', [content, id], (error, results, fields) => {
      if (error) {
        res.status(500).json({ "error": error.sqlMessage });
      } else {
        res.status(200).json({ message: 'Message mis à jour' });
      }
    });
  }

  // met à jour l'image dans mySql
  exports.updateFileMessages = (req, res, next) => {
    const id = req.body.postId;
    const imageUrl = req.body.imageUrl;
    connection.query('UPDATE messages SET imageUrl=? WHERE id= ?', [imageUrl, id], (error, results, fields) => {
      if (error) {
        res.status(500).json({ "error": error.sqlMessage });
      } else {
        res.status(200).json({ message: 'Image mise à jour' });
      }
    });
  }


   

