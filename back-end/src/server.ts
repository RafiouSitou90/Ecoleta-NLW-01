import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';

import config from './app/config/environment'
import routes from "./app/routes";

const app = express();

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes.homeRoutes);
app.use('/items', routes.itemsRoutes);
app.use('/points', routes.pointsRoutes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(config.APP_PORT, () => {
    console.log('App is running and listening on %s:%d', config.APP_SERVER, config.APP_PORT)
})