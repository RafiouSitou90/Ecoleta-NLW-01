import express from 'express';
import ItemsController from "../../controller/items/ItemsController";

const itemsRoutes = express.Router();
const itemsController = new ItemsController();

itemsRoutes.get('/', itemsController.index);

export default itemsRoutes;
