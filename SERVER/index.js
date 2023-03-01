const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const mysql = require('mysql');

const app = express();

// Set up Multer middleware to handle file uploads
const upload = multer({ dest: 'uploads/' });

// Set up MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'excell'
});

// Define a route to handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  // Use XLSX library to parse the uploaded file
  const workbook = xlsx.readFile(req.file.path);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet);

  // Use MySQL library to insert data into the database
  const sql = 'INSERT INTO excelsheett (Emailid) VALUES (?)';
  pool.getConnection((err, connection) => {
    if (err) throw err;
    data.forEach(row => {
      const values = [row.Emailid];
      connection.query(sql, values, (err, result) => {
        if (err) throw err;
      });
    });
    connection.release();
    console.log('data inserted into mysql');
    res.sendFile(__dirname = '/DUPLICATES FINDER/CLIENT/verification.html')
  });
});

//set up route to serve html page
app.get('/',function(req,res){
    res.sendFile(__dirname='/DUPLICATES FINDER/CLIENT/homepage.html')
  });

  
app.get('/fetch', (req, res) => {
    pool.query('select Emailid from excelsheett group by Emailid having count(Emailid) > 1;', (error, results, fields) => {
      if (error) throw error;
      res.send(results);
    });
  });
  
  

app.listen(4000, () => console.log('Server started on port 4000'));
