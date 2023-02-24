import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
    barber: { type: Schema.Types.ObjectId, ref: 'Barber' },
    customer: { type: Schema.Types.ObjectId, required: true, ref: 'Customer' },
    service: { type: Schema.Types.ObjectId, ref: 'Service' },
    additional: [{ type: Schema.Types.ObjectId, ref: 'Additional' }],
    startTime: { type: Date },
    endTime: { type: Date },
    status: { type: String, default: 'new' },
    purchased: { type: Number, default: 0 }
}, { timestamps: true });

export default model('Order', orderSchema);