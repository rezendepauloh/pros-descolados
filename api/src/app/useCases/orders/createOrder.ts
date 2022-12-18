import { Request, Response } from 'express';
import { io } from '../../../index';

import { Order } from '../../models/Order';

export async function createOrder(req: Request, res: Response) {
    try {

        const { products } = req.body;

        //Precisa verificar se tem estoque, se tiver, continuar
        //Se não, bloquear e cancelar

        //Tem que ver como iremos retirar, se for camisa, o sizeShirt certo

        const order = await Order.create({ products });
        const orderDetails = await order.populate('products.product');

        //Abre o canal de emissão do websocket
        io.emit('orders@new', orderDetails);

        //o status 201 é "tudo certo" com a adição que seu recurso foi criado (usado para criação)
        res.status(201).json(order);

    } catch (error) {

        console.log(error);
        res.sendStatus(500);

    }
}
