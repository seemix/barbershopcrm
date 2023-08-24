export interface ISchedule {
    event_id?: string;
    start: string | null;
    end: string | null;
    barber: string | null;
}

export interface IScheduleCreate extends ISchedule {
    count: number | 1;
}

export interface IScheduleUpdate extends ISchedule {
    id: string | number;
}