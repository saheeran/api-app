const UserService = require("../Service/UserService")
module.exports = {
    get: (req, res, next ) => {
    const test = service.getEmployee(req.res)
        res.send(test)
    },
    login: (req, res, next) => {
    const login = service.login(req.res)
        res.send(login)
    },
    post: (req, res, next) => {
        res.send({message:'hello post'})
    },
    put: (req, res, next) => {
        res.send({message:'hello put'})
    },
    delete: (req, res, next) => {
        res.send({message:'hello delete'})
    }
}