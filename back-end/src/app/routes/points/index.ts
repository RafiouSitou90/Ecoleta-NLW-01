import express from 'express';
import multer from 'multer';

import multerConfig from '../../config/multer';
import PointsController from "../../controller/points/PointsController";

const pointsRoutes = express.Router();
const pointsController = new PointsController();
const upload = multer(multerConfig);

pointsRoutes.post('/', upload.single('image'), pointsController.create);
pointsRoutes.get('/:id', pointsController.show);
pointsRoutes.get('/', pointsController.index);

export default pointsRoutes;
