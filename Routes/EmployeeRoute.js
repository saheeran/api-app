const express = require("express");
const EmployeeRoute = express.Router();
const EmployeeController = require("../Controller/EmployeeController");

EmployeeRoute.get('/getEmployeeData', (req, res) => {
    EmployeeController.get(req, res)
})

module.exports = EmployeeRoute