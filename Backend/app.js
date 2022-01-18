const express = require('express');
require('dotenv').config({ path: 'config/.env' });
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const helmet = require('helmet');
const mysql = require('mysql');
const cors = require('cors');

const userRoutes = require('./routes/userRoute');
const postRoutes = require('./routes/messageRoute');
const commentRoutes = require('./routes/commentaireRoute');

// Lancement de Express
const app = express();

// Conexion à la BD
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_BASE,
});

pool.getConnection((err, connection) => {
  if (err) throw err; // not connected
  console.log('Connected!');
});

/**
 * MIDDLEWARES
 */
// Configuration cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Cross-Origin-Resource-Policy', '*');
  next();
});
// Parse le body des requetes en json
app.use(express.json());
// Sécurisation des headers
app.use(helmet());
// Log toutes les requêtes passées au serveur
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));


/**
 * ROUTES
 */
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/users', userRoutes);
app.use('/api/messages', postRoutes);
app.use('/api/comment', commentRoutes);

var multer  = require('multer')
// var upload = multer({ dest: 'uploads/' })


app.use(express.static('app'));
app.use(cors())

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/')
  },
  filename: function (req, file, cb) {
    let originalname = file.originalname;

    let ext = originalname.split('.').pop();
    let filename = originalname.split('.').slice(0, -1).join('.');

    cb(null, filename + '-' + Date.now()+'.'+ext)
  }
})
 
var upload = multer({ storage: storage })

app.post('/images',upload.single('file'),  (req, res) => {
  res.send({"status": "success"})
})

module.exports = app;