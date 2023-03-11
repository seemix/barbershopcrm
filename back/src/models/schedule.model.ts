import { Schema, model } from 'mongoose';

const scheduleSchema = new Schema({
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    barber: { type: Schema.Types.ObjectId, ref: 'Barber' }
});

export default model('Timetable', scheduleSchema);