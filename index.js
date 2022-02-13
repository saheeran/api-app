const express = require("express");
require('dotenv').config()
const app = express();
const mysql = require('mysql');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { authenticateToken, generateAccessToken } = require("./Auth/AuthService");
const UsersRoute = require('./Routes/UsersRoute');
const BookRoute = require('./Routes/BookRoute');
const ServiceRoute = require("./Routes/ServiceRoute");
const EmployeeRoute = require("./Routes/EmployeeRoute");



connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'store1'
});

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
});

const PORT = 5000;
app.listen(PORT, () => console.log("Server running on port: http://localhost:${PORT}"));

//---------------------------------------Authication----------------------------------
app.post('/register', async(req, res) => {
    const salt = await bcrypt.genSalt(10);
    const {username,password,name,email,tel,role_id} = req.body
    const hashPasswor = await bcrypt.hash(password,salt)
    connection.query(`INSERT INTO users (username,password,name,email,tel,role_id) VALUES(?,?,?,?,?,?)`,
    [username,hashPasswor,name,email,tel,role_id],(err) =>{
        if (err) {
            res.send(err)
        } else {
            res.send({message:'สมัครเรียบร้อย'})
        }
    })
})

let refreshTokens = []
app.post('/login', (req, res) => {
    const { password, username } = req.body
    connection.query(`SELECT * FROM users 
    INNER JOIN role_table ON role_table.role_id = users.role_id
    WHERE users.username = ?`,
        [username], ((err, result) => {
            if (err) {
                res.send({ err: err })
            } else {
                if (result.length > 0) {
                    bcrypt.compare(password,result[0].password).then(async(match) => {
                        if (!match) {
                            res.status(400).json({ error: 'Wrong password and username combination' })
                        }else{    
                            const accessToken = generateAccessToken(result[0].username)
                            const refreshToken = jwt.sign({username:result[0].username}, process.env.REFRESH_TOKEN_SECRET, { expiresIn:"7d"})
                            refreshTokens.push(refreshToken)
                            res.send({ accessToken: accessToken, userInfo: result[0], refreshToken: refreshToken })
                        }
                    })
                } else {
                    res.send({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' })
                }
            }
        }))
})

app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (refreshToken.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, username) => {
        if (err) return res.sendStatus(403)
        const acceessToken = generateAccessToken({username:username})
        res.send({acceessToken:acceessToken})
    })
})
app.use('/user', authenticateToken, UsersRoute)
app.use('/book', authenticateToken, BookRoute)
app.use('/service', authenticateToken, ServiceRoute)
app.use('/employee', authenticateToken, EmployeeRoute)

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
