import { Request, Response } from 'express';
import { Product } from '../../models/Product';

export async function listProductsByCategory(req: Request, res: Response) {
    try {

        //Os params que vem da url, desestruturamos e capturamos aqui
        const { categoryId } = req.params;

        //Where para dizer qual é a pesquisa e equals seria o equivalente a o que, no caso, o categoryId
        const products = await Product.find().where('category').equals(categoryId);

        res.json(products);

    } catch (error) {

        console.log(error);
        res.sendStatus(500);

    }
}
