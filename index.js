const express = require("express");
require('dotenv').config()
const app = express();
const mysql = require('mysql');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { authenticateToken } = require("./Auth/AuthService");
const UsersRoute = require('./Routes/UsersRoute');
const BookRoute = require('./Routes/BookRoute');
const ServiceRoute = require("./Routes/ServiceRoute");
const EmployeeRoute = require("./Routes/EmployeeRoute");



connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'store1'
});

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

connection.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL Server!');
});

const PORT = 5000;
app.listen(PORT, () =>console.log("Server running on port: http://localhost:${PORT}"));

//---------------------------------------Authication----------------------------------
app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    connection.query(`SELECT * FROM users WHERE password = ? AND username = ?`,
    [password,username],((err, result)=>{
        if (err) {
            console.log("err", err);
            res.send({err:err.message})
        } else {           
            if (result.length > 0) {
                bcrypt.compare(result[0].password, password).then((match) => {
                    if (!match) {
                        res.status(400).json({error:'Wrong password or username combination'})
                    }
                    res.json('Logged in!')
                })
                const acceessToken = jwt.sign(result[0].username,process.env.ACCESS_TOKEN_SECRET,{
                    expiresIn:"2h"      
                })
                res.send({acceessToken:acceessToken,userInfo:result})
            } else {
                res.send({message:'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'})
            }   
        }
    }))
})
app.use('/user',authenticateToken, UsersRoute)
app.use('/book',authenticateToken, BookRoute)
app.use('/service',authenticateToken, ServiceRoute)
app.use('/employee',authenticateToken, EmployeeRoute)

//------------------------------------------------------------------------------------
//Booking Start

/* app.get('/barber',(req,res)=>{
  connection.query(`SELECT * FROM ser_table`,((err, result)=>{
              if (err) {
                  console.log(err);
              } else {
                  res.send(result)
              }
          }))
}) */

  // Booking End
