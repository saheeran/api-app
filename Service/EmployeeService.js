module.exports = {
    getEmployee: (req, res) => {
        connection.query(`SELECT emp_id, emp_name, emp_email, emp_tel, emp_pic FROM emp_table WHERE emp_id`, ((err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log('result', result);
                res.send(result)
            }
        }))
    }
}