import { Request, Response } from 'express'
import DBConnection from '../../config/connection'

class PointsController {
    async index (req: Request, res: Response) {
        const { city, state, items } = req.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points  = await DBConnection.table('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('state', String(state))
            .distinct()
            .select('points.*');

        const serializePoints = points.map(point => {
            return {
                ...point,
                image_url:
                    `${process.env.APP_SERVER}:${process.env.APP_PORT}/${process.env.APP_UPLOADS_DIR}/${point.image}`
            };
        });

        return res.status(200).json({
            status: 200,
            statusText: 'Ok',
            message: 'Points loaded successfully',
            points: serializePoints
        })
    }

    async create (req: Request, res: Response) {
        const {
            name, email, whatsapp, latitude, longitude, city, state, items
        } = req.body;

        const trx = await DBConnection.transaction();

        const point = {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            state,
            image: req.file.filename
        }

        const [id] = await trx('points').insert(point);

        const pointItems = await items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) => {
            return {
                point_id: id,
                item_id,
            }
        });

        await trx('point_items').insert(pointItems);

        await trx.commit();

        if (!trx.isCompleted()) {
            return res.status(400).json({
                status: 400,
                statusText: 'Bad request',
                message: 'Something is wrong in your request'
            })
        }

        return res.status(201).json({
            status: 201,
            statusText: 'Created',
            message: 'New point created',
            point: {
                id,
                ...point
            }
        })
    }

    async show (req: Request, res: Response) {
        const { id } = req.params;

        const point = await DBConnection.table('points').where('id', id).first();

        if (!point) {
            return res.status(404).json({
                status: 404,
                statusText: 'Not found',
                message: 'Point not found'
            })
        }

        const serializePoint = {
            ...point,
            image_url: `${process.env.APP_SERVER}:${process.env.APP_PORT}/${process.env.APP_UPLOADS_DIR}/${point.image}`
        };

        const items = await DBConnection.table('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id).select('items.title')

        return res.status(200).json({
            status: 200,
            statusText: 'Ok',
            message: 'Point loaded successfully',
            point: serializePoint,
            items
        })
    }
}

export default PointsController
