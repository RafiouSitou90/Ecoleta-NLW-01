import { Request, Response } from 'express'
import DBConnection from '../../config/connection'


class ItemsController {
    async index (req: Request, res: Response) {
        const items = await DBConnection.table('items').select('*').orderBy('title');

        let serializeItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://192.168.0.10:3333/uploads/${item.image}`
            };
        });

        return res.status(200).json({
            status: 200,
            statusText: 'Ok',
            message: 'Items loaded successfully',
            items: serializeItems
        })
    }
}

export default ItemsController;
