const ServiceService = require("../Service/ServiceService")

module.exports = {
    getService: (req,res) => {
        ServiceService.getService(req,res)
    }
}