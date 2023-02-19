import { Schema, model } from 'mongoose';

const serviceSchema = new Schema({
    name: { type: String, trim: true, required: true },
    description: { type: String },
    order: { type: Number }
});

export default model('Service', serviceSchema);