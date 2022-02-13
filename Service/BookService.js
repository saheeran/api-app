module.exports = {
    inserBookService: () => {
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
                            res.send({err:err})
                        } else {
                            getService.forEach((data)=> {
                                connection.query(`INSERT INTO dtbook_table (book_id, ser_id, dtbook_price) 
                                VALUES (?,?,?)`,[id,data.id,data.ser_price])
                            })                      
                            res.send({message:'บันทึกเรียบร้อย'})
                        }
                    })   
            )    
    },
    getBookInfo: (req, res) => {
        connection.query(`SELECT id, ser_name, ser_pic, ser_price FROM ser_table`,((err, result)=>{
                if (err) {
                    res.send({err:err})
                } else {
                    res.send(result)
                }
            })
        )
    }
}