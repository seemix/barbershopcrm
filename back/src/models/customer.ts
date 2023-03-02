import { Schema, model } from 'mongoose';

const customerSchema = new Schema ({
    name: { type: String, trim: true, required: true },
   // surname: { type: String, trim: true },
    phone: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    tag: { type: String, trim: true }
});

export default model('Customer', customerSchema);