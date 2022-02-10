const express = require("express");
const EmployeeService = require("../Service/EmployeeService");
const EmployeeRoute = express.Router();

EmployeeRoute.get('/getEmployeeData', (req,res) => {
    EmployeeService.getEmployee(req,res)
})

module.exports = EmployeeRoute