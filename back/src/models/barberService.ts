import { Schema, model } from 'mongoose';

const barberService = new Schema({
    barber: { type: Schema.Types.ObjectId, ref: 'Barber' },
    service: { type: Schema.Types.ObjectId, ref: 'Service' },
    price: { type: Number },
    duration: { type: Number }
});

export default model('BarberService', barberService);