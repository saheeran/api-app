const express = require("express");
const UserRouter = express.Router();
const UsersController = require("../Controller/UsersController");

UserRouter.get('/', UsersController.get)

module.exports = UserRouter;