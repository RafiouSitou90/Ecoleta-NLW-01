import express from 'express';
import HomeController from "../../controller/home/HomeController";

const homeRoutes = express.Router();
const homeController = new HomeController();

homeRoutes.get('/', homeController.index)

export default homeRoutes;
