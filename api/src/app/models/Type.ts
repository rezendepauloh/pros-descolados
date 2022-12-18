import { model, Schema } from 'mongoose';

export const Type = model('Type', new Schema({
    type: {
        type: String,
        enum: ['CAMISA', 'ACTION_FIGURE', 'CHAPEU', 'QUADRO', 'BRINCO', 'ANEL'],
        default: 'CAMISA',
        required: true,
    },
    shirtSize: {
        type: String,
        enum: ['BABY_LOCK', 'P', 'M', 'G', 'GG', 'XG'],
        default: '',
        required: false,
    },
    quantity: {
        type: Number,
        default: 1,
        required: true,
    },
}));
