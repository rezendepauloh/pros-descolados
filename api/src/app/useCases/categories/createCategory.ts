import { Request, Response } from 'express';
import { Category } from '../../models/Category';

export async function createCategory(req: Request, res: Response) {
    try {

        const { name, icon } = req.body;

        //tratamento da requisição enviada
        if (!name) {
            return res.status(400).json({
                error: 'Name is required'
            });
        }

        if (!icon) {
            return res.status(400).json({
                error: 'Icon is required'
            });
        }

        const category = await Category.create({ name, icon });

        //o status 201 é "tudo certo" com a adição que seu recurso foi criado (usado para criação)
        res.status(201).json(category);

    } catch (error) {

        console.log(error);
        res.sendStatus(500);

    }
}
