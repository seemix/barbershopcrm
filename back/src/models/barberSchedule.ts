import { Schema, model } from 'mongoose';

const barberSchedule = new Schema({
    barber: { type: Schema.Types.ObjectId },
    startDay: { type: String, required: true },
    endDay: { type: String, required: true },
    startLunch: { type: String, required: true },
    endLunch: { type: String, required: true },
    holidays: [{ type: Number }]
});

export default model('Schedule', barberSchedule);