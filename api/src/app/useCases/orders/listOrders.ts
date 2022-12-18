import { Request, Response } from 'express';
import { Order } from '../../models/Order';

export async function listOrders(req: Request, res: Response) {
    try {

        //O populate traz tudo do product, não apenas o id dele
        //o sort: 1 é ordem crescente e -1, decrescente
        const orders = await Order.find()
            .sort({ createdAt: 1 })
            .populate('products.product');

        res.json(orders);

    } catch (error) {

        console.log(error);
        res.sendStatus(500);

    }
}
