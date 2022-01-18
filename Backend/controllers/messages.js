require('dotenv').config();
const { date } = require('joi');
const database = require('../utils/database');

const connection = database.connect();


/**
 * Ajout d'une nouvelle publication
 */
exports.newMessages = (req, res, next) => {
  let originalname = req.body.imageUrl;

  let ext = originalname.split('.').pop();
  let filename = originalname.split('.').slice(0, -1).join('.');
  const newMessage = {
    userId: req.body.userId,
    imageurl: filename + '-' + Date.now()+'.'+ext,
    content: req.body.content,
    title: req.body.title,
    username: req.body.username,
  }

  connection.query("INSERT INTO messages SET ?", [newMessage], (error, results, fields) => {
    if (error) {
      res.status(500).json({ "error": error.sqlMessage });
    } else {
      res.status(200).json({ message: 'Publication ajoutée' });
    }
  });
}

exports.getMessages = (req, res, next) => {
  connection.query("SELECT * FROM messages", (err, rows, fields) => {
    if(!err)
    res.send(rows);
    else
    console.log(err)
    })
  }

exports.deleteMessage = (req, res, next) => {
  connection.query('DELETE FROM messages WHERE id= ?', [req.params.id], (err, rows, fields) => {
    if(!err)
    res.send('Supprimé avec succès !');
    else
    console.log(err)
    })
  }

exports.getOneMessages = (req, res, next) => {
  connection.query('SELECT * FROM messages WHERE id= ?', [req.params.id], (err, rows, fields) => {
    if(!err)
    res.send(rows);
    else
    console.log(err)
    })
  }

exports.updateMessages = (req, res, next) => {
    const newMessage = {
      userId: req.body.userId,
      imageurl: req.body.ImageUrl,
      content: req.body.content,
      title: req.body.title,
      username: req.body.username
    }
  
    connection.query('UPDATE INTO messages SET ? WHERE id= ?', [newMessage], [req.params.id], (error, results, fields) => {
      if (error) {
        res.status(500).json({ "error": error.sqlMessage });
      } else {
        res.status(200).json({ message: 'Publication mise à jour' });
      }
    });
    connection.end();
  }


   

