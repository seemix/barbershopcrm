import { Schema, model } from 'mongoose';

const barberSchema = new Schema({
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true },
    rating: { type: Number },
    picture: { type: String },
    email: { type: String, trim: true, required: true, lowercase: true, unique: true },
    phone: { type: String, trim: true, required: true, unique: true },
   // password: { type: String },
    order: { type: Number },
    isActive: { type: Boolean, default: false },
    //role: { type: String, enum: ['admin', 'user'] }
});

export default model('Barber', barberSchema);