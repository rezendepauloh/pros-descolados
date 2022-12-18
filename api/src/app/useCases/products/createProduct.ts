import { Request, Response } from 'express';
import { Product } from '../../models/Product';
import { io } from '../../../index';

export async function createProduct(req: Request, res: Response) {
    try {

        console.log(req.file);
        console.log(req.body);

        //Um ? no req.file por causa do TypeScript, se vier, ele será do tipo File
        const imagePath = req.file?.filename;
        const { name, description, price, category, types, createdAt } = req.body;

        //tratamento da requisição enviada
        if (!name) {
            return res.status(400).json({
                error: 'Name is required'
            });
        }

        if (!price) {
            return res.status(400).json({
                error: 'Price is required'
            });
        }

        if (!category) {
            return res.status(400).json({
                error: 'Category is required'
            });
        }

        if (!types) {
            return res.status(400).json({
                error: 'Types is required'
            });
        }

        if (!createdAt) {
            return res.status(400).json({
                error: 'CreatedAt is required'
            });
        }

        //Cria o const do product
        const product = await Product.create({
            name,
            description,
            imagePath,
            price: Number(price),
            category,
            types,
            createdAt,
        });
        const typeDetails = await product.populate('types.type');

        //Abre o canal de emissão do websocket
        io.emit('type@new', typeDetails);

        //o status 201 é "tudo certo" com a adição que seu recurso foi criado (usado para criação)
        res.status(201).json(product);

    } catch (error) {

        console.log(error);
        res.sendStatus(500);

    }
}
