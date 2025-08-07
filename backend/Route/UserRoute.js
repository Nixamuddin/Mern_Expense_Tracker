import express from 'express';
import { UserController } from '../Controllers/UserController.js';
import { Protected } from '../Middleware/AuthMiddleWare.js';
const UserRoute = express.Router();
UserRoute.post("/create", UserController.register)
UserRoute.post("/login", UserController.login)
UserRoute.post("/profile", Protected, UserController.updateProfile)
UserRoute.post("/password",Protected, UserController.changePassword)


export default UserRoute;