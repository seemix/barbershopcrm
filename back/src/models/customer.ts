import { Schema, model } from 'mongoose';

const customerSchema = new Schema ({
    name: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, required: true },
    email: { type: String, trim: true },
    tag: { type: String, trim: true }
});

export default model('Customer', customerSchema);