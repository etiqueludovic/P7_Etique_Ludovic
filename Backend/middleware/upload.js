module.exports = (req, res) => {
    let sampleFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // name of the input is sampleFile
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/uploads/' + sampleFile.name;
  
    console.log(sampleFile);
  
    // Use mv() to place file on the server
    sampleFile.mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err);
  
      pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log('Connected!');
  
        connection.query('UPDATE user SET profile_image = ? WHERE id ="1"', [sampleFile.name], (err, rows) => {
          // Once done, release connection
          connection.release();
  
          if (!err) {
            res.redirect('/');
          } else {
            console.log(err);
          }
  
        });
      });
  
      // res.send('File uploaded!');
    });
  }