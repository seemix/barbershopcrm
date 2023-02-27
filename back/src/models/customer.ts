import { Schema, model } from 'mongoose';

const customerSchema = new Schema ({
    name: { type: String, trim: true, required: true },
   // surname: { type: String, trim: true },
    phone: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
});

export default model('Customer', customerSchema);