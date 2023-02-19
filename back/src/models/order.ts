import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
    barber: { type: Schema.Types.ObjectId },
    customer: { type: Schema.Types.ObjectId, required: false },
    service: { type: Schema.Types.ObjectId },
    additional: [{ type: Schema.Types.ObjectId }],
    startTime: { type: Date },
    endTime: { type: Date },
    status: { type: String, default: 'new' },
    purchased: { type: Number, default: 0 }
}, { timestamps: true });

export default model('Order', orderSchema);