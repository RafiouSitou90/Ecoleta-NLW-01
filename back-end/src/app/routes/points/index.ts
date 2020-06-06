import express from 'express';
import PointsController from "../../controller/points/PointsController";

const pointsRoutes = express.Router();
const pointsController = new PointsController();

pointsRoutes.post('/', pointsController.create);
pointsRoutes.get('/:id', pointsController.show);
pointsRoutes.get('/', pointsController.index);

export default pointsRoutes;
