import express from 'express';
import { Categories } from '../Controllers/CategoryController.js';
import { Protected } from '../Middleware/AuthMiddleWare.js';
const categoryRoute = express.Router();
categoryRoute.get('/get',Protected, Categories.getAll);
categoryRoute.post('/create',Protected, Categories.Create);
categoryRoute.put('/get/:categoryId',Protected, Categories.updates);
categoryRoute.delete('/delete/:categoryId',Protected, Categories.deletes);

export default categoryRoute;