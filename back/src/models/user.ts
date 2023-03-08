import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: [process.env.ADMIN_ROLE, process.env.USER_ROLE] },
    barber: { type: Schema.Types.ObjectId, ref: 'Barber' }

});

export default model('User', userSchema);