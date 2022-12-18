import { model, Schema } from 'mongoose';

export const Product = model('Product', new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    imagePath: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Category',
    },
    types: {
        required: true,
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'Type',
            },
        }]
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
}));
