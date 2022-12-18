import { model, Schema } from 'mongoose';

export const Order = model('Order', new Schema({
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    products: {
        required: true,
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'Product',
            },
            quantity: {
                type: Number,
                default: 1,
                required: true,
            },
        }]
    },
}));
