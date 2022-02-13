const EmployeeService = require("../Service/EmployeeService");

module.exports = {
    get: (req, res) => {
        console.log('em');

        EmployeeService.getEmployee(req, res)
    }
}