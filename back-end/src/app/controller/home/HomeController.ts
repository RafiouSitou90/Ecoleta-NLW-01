import { Request, Response } from 'express';

class HomeController {
    index (req: Request, res: Response) {
        return res.status(200).send({
            status: 200,
            statusText: 'Ok',
            message: 'Welcome to Ecoleta-NLW-#01 API from Node JS with Typescript and SQLite.'
        });
    };
}

export default HomeController;
