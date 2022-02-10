module.exports = {
    getService: (req, res) => {
        connection.query(`SELECT id, ser_name, ser_pic, ser_price FROM ser_table WHERE id`,((err, result)=>{
                if (err) {
                    res.send({err:err})
                } else {
                    res.send(result)
                }
            })
        )
    }
}