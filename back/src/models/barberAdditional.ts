import { Schema, model } from 'mongoose';

const barberAdditionalSchema = new Schema({
    barber: { type: Schema.Types.ObjectId, ref: 'Barber' },
    additional: { type: Schema.Types.ObjectId, ref: 'Additional' },
    services: [{ type: Schema.Types.ObjectId, ref: 'Service'}],
    price: { type: Number },
    duration: { type: Number }
});

export default model('BarberAdditional', barberAdditionalSchema);