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

        return res.status(200).json({
            status: 200,
            statusText: 'Ok',
            message: 'Points loaded successfully',
            points
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
            image: 'https://images.unsplash.com/photo-1548148870-adbf75452257?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        }

        const [id] = await trx('points').insert(point);

        const pointItems = await items.map((item_id: number) => {
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

        const items = await DBConnection.table('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id).select('items.title')

        return res.status(200).json({
            status: 200,
            statusText: 'Ok',
            message: 'Point loaded successfully',
            point, items
        })
    }
}

export default PointsController
