const express = require("express");
const ServiceController = require("../Controller/ServiceController");
const ServiceRoute = express.Router();

ServiceRoute.get('/', (req,res) => {
    ServiceController.getService(req,res)
})

module.exports = ServiceRoute