const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');
const app = express();


//creating a mysql connection

const db = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'password',
  database : 'excel'

});

//connecting to mysql
db.connect(function(err){
  if(err) {
    throw err;
  }
  console.log('connected to Mysql database');
});


//set up middleware to parse request bodies
app.use(bodyparser.urlencoded({ extended: true}));


//set up route handeler for form submission
app.post('/submit',(req,res) => {
const{emailid} = req.body;


//insert the datas in to mysql
const sqlinsert = 'INSERT INTO excelsheet (emailid) VALUES(?)';
db.query(sqlinsert,[emailid],(err,result) => {
  if(err){
    throw err;
  }
  console.log('data inserted into mysql');
  res.sendFile(__dirname = '/DF/CLIENT/verification.html')
});
});

//set up route handeler for form submission
app.post('/upload',(req,res) => {
const{Email_id_have} = req.body;


//insert the datas in to mysql
const sqlinsert = 'INSERT INTO excelsheet (Email_id_have) VALUES(?)';
db.query(sqlinsert,[Email_id_have],(err,result) => {
  if(err){
    throw err;
  }
  console.log('champign data inserted into mysql');
  res.sendFile(__dirname = '/DF/CLIENT/verification.html')
});
});


app.get('/fetch', (req, res) => {
  db.query('SELECT * FROM excelsheet', (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
});



//set up route to serve html page
app.get('/',function(req,res){
  res.sendFile(__dirname='/DF/CLIENT/homepage.html')
});




//to start server at port no 5000
app.listen(5000, () => {
  console.log('Server started on port 5000');
});
