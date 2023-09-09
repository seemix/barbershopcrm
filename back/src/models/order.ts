import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
    barber: { type: Schema.Types.ObjectId, ref: 'Barber' },
    customer: { type: Schema.Types.ObjectId, required: true, ref: 'Customer' },
    service: { type: Schema.Types.ObjectId, ref: 'Service' },
    additional: [{ type: Schema.Types.ObjectId, ref: 'Additional' }],
    startTime: { type: Date },
    endTime: { type: Date },
    completed: { type: Boolean, default: false },
    price: { type: Number, default: 0 },
    payed: { type: Number },
    color: { type: String, default: '' },
    // createdBy: {type: String, enum: ['site', 'barber', 'admin'], default: 'site'},
    comment: { type: String }
}, { timestamps: true });

export default model('Order', orderSchema);