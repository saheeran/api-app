const express = require("express");
const app = express();
const mysql = require('mysql');
var bodyParser = require('body-parser');

const connection = mysql.createConnection({
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
app.post('/loginBycustomer',(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    connection.query(`SELECT * FROM cus_table WHERE cus_pass = ? AND cus_id = ?`,
    [password,username],((err, result)=>{
                if (err) {
                    console.log(err);
                } else {
                    console.log(result); 
                    if (result.length > 0) {
                        res.send(result)
                    } else {
                        res.send({msg:'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'})
                    }
                   
                }
            }))
})

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

app.get('/getEmployeeData',(req,res)=>{
    connection.query(`SELECT emp_id, emp_name, emp_email, emp_tel, emp_pic FROM emp_table WHERE emp_id`,((err, result)=>{
                if (err) {
                    console.log(err);
                } else {
                    res.send(result)
                }
            }))
  })
app.get('/getService',(req,res)=>{
    console.log('test');
    connection.query(`SELECT id, ser_name, ser_pic, ser_price FROM ser_table WHERE id`,((err, result)=>{
                if (err) {
                    console.log(err);
                } else {
                    res.send(result)
                }
            }))
  })
app.post('/insertBooking',(req,res)=>{

    const id = req.body.id
    const id_customer = req.body.id_customer
    const  getService = req.body.getService
    const  price = req.body.price
    const  id_employee = req.body.id_employee
    const  getTypeService = req.body.getTypeService
    const  date = req.body.date
    const  status = req.body.status

    connection.query(`INSERT INTO book_table (book_id,cus_id, emp_id, book_type, book_allprice, book_status, book_time) 
         VALUES (?,?,?,?,?,?,?)`,[id,id_customer,id_employee,getTypeService,price,status,date,],((err, result)=>{
                if (err) {
                    console.log(err);
                } else {
                    getService.map((data)=> {
                        connection.query(`INSERT INTO dtbook_table (book_id, ser_id, dtbook_price) 
                        VALUES (?,?,?)`,[id,data.id,data.ser_price])
                    })
                
                    res.send({msg:'บันทึกเรียบร้อย'})
                }
            }))
  })

  // Booking End