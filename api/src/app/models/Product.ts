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
    shirtSize: {
        type: String,
        enum: ['BABY_LOCK', 'P', 'M', 'G', 'GG'],
        default: 'M',
        required: false,
    },
    quantity: {
        type: Number,
        default: 1,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
}));
