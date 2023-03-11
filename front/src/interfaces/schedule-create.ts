export interface ISchedule {
    start: string | null;
    end: string | null;
    barber: string | null;
}

export interface IScheduleCreate {
    schedule: ISchedule[];
    count: number | 1;
}


