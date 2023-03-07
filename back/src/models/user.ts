import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    enum: { type: String, enum: ['admin', 'user'] }

});

export default model('User', userSchema);