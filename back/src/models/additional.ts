import { Schema, model } from 'mongoose';

const additionalSchema = new Schema({
    name: { type: String, required: true },
    order: { type: Number }
});

export default model('Additional', additionalSchema);